import {useEffect, useRef, useState} from "react";
import * as auth from "../../helpers/auth";
import {SERVER_HOST_IP} from "../../constants/config";
import React from 'react';
import {Button, Calendar, ConfigProvider} from 'antd';
import {attendanceStatus, attendanceStatusTranslate, toMomentWeekDays} from "../../constants/utils";
import './index.css';
import StatusChangeModal from "./StatusChangeModal";

const AttendanceTable = () => {
	const [dataList, setDataList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
	const [toggleFetch, setToggleFetch] = useState(false);

	useEffect(() => {
		const token = auth.getToken();
		fetch(`http://${SERVER_HOST_IP}/attendance`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
			val['lessonSchedule'].map(i => i.weekday = toMomentWeekDays[i.dayOfWeek])
			setDataList(val)
		}).finally(() => {
			setIsLoading(false)
		})
	}, [toggleFetch]);

	const dateCellRender = (value) => {
		const weekday = value.weekday();
		let currentDay = value.date();

		const items = dataList['lessonSchedule'].filter(i => i.weekday === weekday);
		if (!items.length) return null;

		if (currentDay < 10) {
			currentDay = `0${currentDay}`
		}
		const attendanceList = dataList['attendanceList'].filter(i => i.date === `${currentDay}-02-2024`);

		return (
			<ul className="events">
				{items.map((i, index) => {
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

	return (
		<div>
			<h4>Հաճախումներ</h4>

			<Button type="primary" onClick={() => setIsStatusChangeModalOpen(true)}>
				Փոխել կարգավիճակը
			</Button>

			<ConfigProvider
				theme={{
					components: {
						Calendar: {
							// miniContentHeight: 600
						},
					},
				}}
			>
				{!isLoading && <Calendar dateCellRender={dateCellRender} style={{padding: 10}} mode={'month'}/>}
			</ConfigProvider>

			<StatusChangeModal isOpen={isStatusChangeModalOpen} onCancel={() => setIsStatusChangeModalOpen(false)} onSuccess={() => setToggleFetch(prev => !prev)}/>
		</div>
	)
}

export default AttendanceTable;