import {Button, DatePicker, Form, message, Modal, Select} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import {SERVER_HOST_IP} from "../../constants/config";
import * as auth from "../../helpers/auth";
import moment from "moment";
import {attendanceStatus, attendanceStatusTranslate} from "../../constants/utils";

const StatusChangeModal = ({isOpen, onCancel, onSuccess, students}) => {
	const [selectedStudentId, setSelectedStudentId] = useState('');
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');

	useEffect(() => {
		if (selectedStudentId && selectedDate) {

		}
	}, [selectedStudentId, selectedDate])

	const studentAttendanceSelectOptions = useMemo(() => {
		if (selectedStudentId && selectedDate) {
			const student = students.find(s => s.id === selectedStudentId);
			const filteredAttendanceList = student?.attendanceList?.filter(i => i.date === selectedDate);

			return filteredAttendanceList.map(a => {
				return {value: a['_id'], label: a['timeSlot'] + ' ' + a.classType || ''}
			})
		}

		return []
	}, [selectedStudentId, selectedDate]);

	const onFinish = () => {
		try {
			const obj = {selectedStatus, selectedTimeSlotId, selectedDate, selectedStudentId}
			const token = auth.getToken();

			fetch(`${SERVER_HOST_IP}/students`, {
				method: 'POST',
				body: JSON.stringify(obj),
				headers: {'Content-Type': 'application/json', Authorization: token}
			},).then(() => {
				message.success('Դասաժամը հաջողությամբ թարմացված է:');
				onSuccess(); //Fetch new data
				onCancel(); //Close Modal
			}).catch(() => {
				message.error('Սխալմունք')
			})

		} catch (error) {
			console.error('Login error:', error);
		}
	};

	const studentOptions = useMemo(() => {
		return students.map(s => {
			return {value: s.id, label: s.username, key: s.id}
		})
	}, [students])

	return (<Modal title="Փոխել կարգավիճակը" open={isOpen} onCancel={onCancel} footer={null} destroyOnClose={true}>
			<Form.Item key={'student'} name={'student'} label={'Ուսանող'}
			           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
				<Select
					options={studentOptions}
					onSelect={(e) => {
						setSelectedStudentId(e)
						setSelectedStatus('')
						setSelectedTimeSlotId('')
					}}
				>
				</Select>
			</Form.Item>

			<Form.Item key={'date'} name={'date'} label={'Ժամանակ'}
			           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
				<DatePicker onChange={(date, dateString) => {
					setSelectedDate(moment(dateString, 'YYYY-MM-DD').format('DD-MM-YYYY'))
					setSelectedStatus('')
					setSelectedTimeSlotId('')
				}}/>
			</Form.Item>

			{!!studentAttendanceSelectOptions.length && (<>
					<Form.Item key={'studentAttendance'} name={'studentAttendance'} label={'Դասաժամ'}
					           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
						<Select
							options={studentAttendanceSelectOptions}
							onSelect={(e) => setSelectedTimeSlotId(e)}
						>
						</Select>
					</Form.Item>

					<Form.Item key={'status'} name={'status'} label={'Կարգավիճակ'}
					           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
						<Select
							options={Object.keys(attendanceStatus).map(key => {
								return {
									value: attendanceStatus[key],
									label: attendanceStatusTranslate[attendanceStatus[key]]
								}
							})}
							onSelect={e => setSelectedStatus(e)}
						>
						</Select>
					</Form.Item>
				</>)}

			<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
				<Form.Item
					key={'submit'}
					wrapperCol={{
						offset: 8, span: 16,
					}}
					style={{marginRight: 10}}
				>
					<Button
						type="primary"
						htmlType="submit"
						disabled={!selectedStudentId || !selectedDate || !selectedTimeSlotId || !selectedStatus}
						onClick={onFinish}
					>
						Submit
					</Button>
				</Form.Item>

				<Form.Item
					key={'cancel'}
					wrapperCol={{
						offset: 8, span: 16,
					}}
					style={{marginLeft: 10}}
				>
					<Button type="default" onClick={onCancel}>
						Cancel
					</Button>
				</Form.Item>
			</div>
		</Modal>)
}

export default StatusChangeModal;