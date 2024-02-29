import {useCallback, useEffect, useMemo, useState} from "react";
import * as auth from "../../helpers/auth";
import {SERVER_HOST_IP} from "../../constants/config";
import React from 'react';
import { Button, Calendar, Select, Form } from 'antd';
import { attendanceStatus, attendanceStatusTranslate, toMomentWeekDays } from "../../constants/utils";
import './index.css';
import StatusChangeModal from "./StatusChangeModal";
import {getRoles} from "../../helpers/auth";
import UserRoles from "../../constants/userRoles";
import dayjs from "dayjs";
import moment from "moment";

const weeksToBeCalculated = {
	16: {
		1: 9,
		2: 8,
		3: 7,
		4: 6,
		5: 4,
		6: 3,
		7: 2
	}
}

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
	const weeksFromStartOfTheYear = moment(new Date()).diff(moment(calendarDate.format('YYYY-MM-DD'), 'YYYY-MM-DD'), 'week');
	const [scoreObj, setScoreObj] = useState(null);

	useEffect(() => {
		const token = auth.getToken();
		fetch(`http://${SERVER_HOST_IP}/students`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
			setStudents(val)
		})
	}, []);

	useEffect(() => {
		if (isStudentRole || (!isStudentRole && !!selectedStudent)) {
			const token = auth.getToken();
			fetch(`http://${SERVER_HOST_IP}/attendance?studentId=${selectedStudent}`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
				val['lessonSchedule'].map(i => i.weekday = toMomentWeekDays[i.dayOfWeek])
				setDataList(val)
				calcWeekScore(val)
			}).finally(() => {
				setIsLoading(false)
			})
		}
	}, [toggleFetch, selectedStudent]);

	const calcWeekScore = useCallback((data) => {
		let weekNumber = weeksFromStartOfTheYear;
		let weekCountObject = weeksToBeCalculated[weekNumber];

		while(!weekCountObject) {
			weekCountObject = weeksToBeCalculated[weekNumber + 1]
			weekNumber++;
		}

		const attendanceList = data['attendanceList'];
		const lessonSchedule = data['lessonSchedule'];

		const numberOfLessonsInWeek = lessonSchedule.length;
		const numberShouldBePresent = numberOfLessonsInWeek * weekNumber;
		const numberOfBeingPresent = attendanceList.length;
		const absentCount = numberShouldBePresent - numberOfBeingPresent;
		const scoreCount = weekCountObject[absentCount] || 0;

		setScoreObj({
			count: scoreCount,
			week: weekNumber,
			absent: absentCount
		});
	}, [])

	const dateCellRender = (value) => {
		const weekday = value.weekday();
		let currentDay = value.date();
		let currentMonth = calendarDate.month() + 1; // +1 as the jan is 0

		const currentLessonSchedule = dataList['lessonSchedule'].filter(i => i.weekday === weekday);
		if (!currentLessonSchedule.length) return null;

		if (currentDay < 10) {
			currentDay = `0${currentDay}`
		}

		if (currentMonth < 10) {
			currentMonth = `0${currentMonth}`
		}

		const attendanceList = dataList['attendanceList'].filter(i => i.date === `${currentDay}-${currentMonth}-2024`);

		if (!attendanceList.length) return null;

		return (
			<ul className="events">
				{currentLessonSchedule.map((i, index) => {
					const status = attendanceList.find(a => a.timeSlot === i.timeSlot)?.status;
					//`Todo handle classTypes check as we can have multiple items with same timeSlot.

					return (
						<p style={{fontSize: 8}} key={index}>
							{/*<span style={{textTransform: 'capitalize'}}>{dataList.group.name + ' '}</span>*/}
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
				style={{minWidth: 350, marginLeft: 20, marginBottom: 0}}
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
				{!isStudentRole && (
					<Button type="primary" onClick={() => setIsStatusChangeModalOpen(true)}>
						Փոխել կարգավիճակը
					</Button>
				)}

				{!isStudentRole && studentSelect}

				{scoreObj !== null && (
					<div style={{marginLeft: 20}}>
						<p>Հաշվարկն ըստ {scoreObj.week} շաբաթի</p>
						<p>Գնահատական - {scoreObj.count}</p>
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
			/>
		</div>
	)
}

export default AttendanceTable;