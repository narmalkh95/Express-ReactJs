import {useCallback, useEffect, useMemo, useState} from "react";
import * as auth from "../../helpers/auth";
import {SERVER_HOST_IP} from "../../constants/config";
import React from 'react';
import { Button, Calendar, Select, Form } from 'antd';
import {attendanceStatus, attendanceStatusTranslate, toHumanWeekDay, toMomentWeekDays} from "../../constants/utils";
import './index.css';
import StatusChangeModal from "./StatusChangeModal";
import {getRoles} from "../../helpers/auth";
import UserRoles from "../../constants/userRoles";
import dayjs from "dayjs";
import moment from "moment";

const weeksToBeCalculated = {
	32: {
		1: 10,
		2: 9,
		3: 9,
		4: 8,
		5: 7,
		6: 7,
		7: 6,
		8: 5,
		9: 5,
		10: 4,
		11: 4,
		12: 3,
		13: 2,
		14: 2,
		15: 1
	},
	64: {
		'0-3': 10,
		'4-6': 9,
		'7-10': 8,
		'11-12': 7,
		'13-15': 6,
		'16-19': 5,
		'20-22': 4,
		'23-25': 3,
		'26-28': 2,
		'29-32': 1,
	}
};

const presentStatusList = [attendanceStatus.inTime, attendanceStatus.acceptable];

const AttendanceTable = () => {
	const [dataList, setDataList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
	const [toggleFetch, setToggleFetch] = useState(false);
	const roles = getRoles();
	const isStudentRole = useMemo(() => roles.includes(UserRoles.student), []);
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [calendarDate, setCalendarDate ] = useState(() => dayjs('2024-01-01'));
	const [scoreObj, setScoreObj] = useState(null);

	useEffect(() => {
		const token = auth.getToken();
		fetch(`${SERVER_HOST_IP}/students`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
			setStudents(val)
		})
	}, [toggleFetch]);

	useEffect(() => {
		if (isStudentRole || (!isStudentRole && !!selectedStudent)) {
			const token = auth.getToken();
			fetch(`${SERVER_HOST_IP}/attendance?studentId=${selectedStudent}`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
				setDataList(val)
				calcWeekScore(val, selectedStudent)
			}).finally(() => {
				setIsLoading(false)
			})
		}
	}, [toggleFetch, selectedStudent]);

	const calcWeekScore = useCallback((data, selectedStudent) => {
		const {attendanceList, groups, userLessonIds} = data;
		const weeklyLessonScheduleByGroupName = {};
		const calcWith32 = ['ՕԿԾ', 'ՔՊ և ԱԻՀ', 'ճյուղի տնտես'];

		for(let group of groups) {
			weeklyLessonScheduleByGroupName[group.shortName] = group.lessonSchedule.filter(lesson => lesson.students.includes(selectedStudent));
		}

		const groupedCountShouldBePresent = {};

		Object.keys(weeklyLessonScheduleByGroupName).forEach(groupName => {
			groupedCountShouldBePresent[groupName] = {
				shouldBePresentCount: 0,
				actualPresentsCount: 0
			}
		});

		attendanceList.forEach(attendance => {
			groupedCountShouldBePresent[attendance.groupName].shouldBePresentCount++;
			if(presentStatusList.includes(attendance.status)) {
				groupedCountShouldBePresent[attendance.groupName].actualPresentsCount++;
			}
		})


		Object.keys(groupedCountShouldBePresent).forEach(group => {
			const absentCount = groupedCountShouldBePresent[group].shouldBePresentCount - groupedCountShouldBePresent[group].actualPresentsCount;
			const doubledAbsentCount = absentCount * 2;
			groupedCountShouldBePresent[group].absentCount = absentCount;
			groupedCountShouldBePresent[group].doubledAbsentCount = doubledAbsentCount;

			if (calcWith32.includes(group)) {
				groupedCountShouldBePresent[group].score = weeksToBeCalculated[32][doubledAbsentCount] || 0;
			} else {
				//Calculate with 64
				Object.keys(weeksToBeCalculated[64]).forEach(key => {
					const [startDay, endDay] = key.split('-');

					if(doubledAbsentCount >= startDay && doubledAbsentCount <= endDay) {
						groupedCountShouldBePresent[group].score = weeksToBeCalculated[64][key];
					}
				})

				if (!groupedCountShouldBePresent[group].score) {
					groupedCountShouldBePresent[group].score = 0
				}
			}
		})

		const lengthOfLessonGroups = Object.keys(weeklyLessonScheduleByGroupName).length;

		setScoreObj({
			count: Math.floor(Object.values(groupedCountShouldBePresent).reduce((prev, current) => prev + current.score, 0) / lengthOfLessonGroups),
			absent: Object.values(groupedCountShouldBePresent).reduce((prev, current) => prev + current.absentCount, 0)
		});
	}, [])

	const dateCellRender = (value) => {
		const weekday = value.weekday();
		const weekdayName = toHumanWeekDay[weekday];
		let currentDay = value.date();
		let currentMonth = calendarDate.month() + 1; // +1 as the jan is 0
		const isOddWeek = weekday % 2 === 1;
		const isEvenWeek = weekday % 2 === 0;

		const exactLessonsForCurrentUser = [];
		dataList.groups.map(group => {
			group.lessonSchedule.map(lesson => {
				// if (!lesson.onOddWeek && isOddWeek) return;
				// if (!lesson.onEvenWeek && isEvenWeek) return;
				//
				// if (`${currentDay}-${currentMonth}-2024` === '9-1-2024') {
				// 	// debugger
				// }
				if (lesson.students.includes(selectedStudent) && lesson.dayOfWeek === weekdayName) {
					lesson.groupName = group.shortName
					exactLessonsForCurrentUser.push(lesson)
				}
			})
		})

		if (currentDay < 10) {
			currentDay = `0${currentDay}`
		}

		if (currentMonth < 10) {
			currentMonth = `0${currentMonth}`
		}

		if(!exactLessonsForCurrentUser.length) return null;

		if(moment().isBefore(`2024-${currentMonth}-${currentDay}`, 'day')) {
			return null
		}

		return (
			<ul className="events">
				{exactLessonsForCurrentUser.map((i, index) => {
					//Find exact attendanceList item with week and lesson id. It should be only one item in a week with the same lesson id.
					const exactAttendanceItem = dataList.attendanceList.find(l => l.date === `${currentDay}-${currentMonth}-2024` && i._id === l.lessonId);
					const status = exactAttendanceItem?.status;

					// if (`${currentDay}-${currentMonth}-2024` === '09-01-2024') {
					// 	debugger
					// }
					// if (!i.onOddWeek && weekday % 2 === 1) return null;
                    // if (!i.onEvenWeek && weekday % 2 === 0) return null;

					if(!exactAttendanceItem) return null;

					return (
						<p style={{fontSize: 8}} key={index}>
							<span style={{textTransform: 'capitalize', fontWeight: "bold"}}>{i.groupName + ' '}</span>
							<span>{i.timeSlot + ' '}</span>
							<span style={{color: "gray"}}>{i.classType.name + ' '}</span>
							<span style={{color: 'red'}}>{i.teacher.username + ' '}</span>
							<span style={{color: 'purple'}}>{i.room.name + ' '}</span>
							<span style={{
								color: status === attendanceStatus.inTime ||
								status === attendanceStatus.acceptable ?
									'green' : status === attendanceStatus.late ?
										'blue' : 'red',
								fontWeight: 'bold'
							}}
							>
								{attendanceStatusTranslate[status] || 'Բացակա'}
							</span>
							{/*<span> Շաբաթ: {forAllWeeks ? 'բոլոր' : isOdd ? '1' : '2'}</span>*/}
						</p>
					)
				})}
			</ul>
		);
	};

	const rendCalendar = () => {
		if (isLoading) return null;
		if (!isStudentRole && !selectedStudent) return null;

		return <Calendar dateCellRender={dateCellRender} style={{padding: 10}} mode={'month'} value={calendarDate} onPanelChange={val => {
			setCalendarDate(val)
		}}/>;
	}

	const studentSelect = useMemo(() => {
		const studentOptions = students.map(s => {
			return {value: s.id, label: s.username, key: s.id}
		})

		return (
			<Form.Item
				key={'student'}
				name={'student'}
				label={'Ուսանող'}
				rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}
				style={{minWidth: 350, marginBottom: 0}}
			>
				<Select
					options={studentOptions}
					onSelect={(e) => {
						setSelectedStudent(e)
					}}
				>
				</Select>
			</Form.Item>
		)
	}, [students])

	return (
		<div>
			<h4>Հաճախումներ</h4>

			<div className={'attendance-header'}>
				{!isStudentRole && studentSelect}
				{!isStudentRole && selectedStudent && (
					<Button type="primary" onClick={() => setIsStatusChangeModalOpen(true)} style={{marginLeft: 20}}>
						Փոխել կարգավիճակը
					</Button>
				)}

				{scoreObj !== null && (
					<div style={{marginLeft: 20}}>
						{/*<p>Հաշվարկն ըստ {scoreObj.week} շաբաթի</p>*/}
						<p>Գործակից - {scoreObj.count}</p>
						<p>Բացակաների հանրագումար - {scoreObj.absent}</p>
					</div>
				)}
			</div>

			{rendCalendar()}

			<StatusChangeModal
				isOpen={isStatusChangeModalOpen}
				onCancel={() => setIsStatusChangeModalOpen(false)}
				onSuccess={() => setToggleFetch(prev => !prev)}
				students={students}
				dataList={dataList}
				selectedStudent={selectedStudent}
			/>
		</div>
	)
}

export default AttendanceTable;