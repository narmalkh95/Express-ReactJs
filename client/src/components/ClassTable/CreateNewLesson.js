import {Button, Form, Modal, Select} from "antd";
import { useCreateLessonMutation, useGetLessonsMutation } from "../../features/classApi";
import {useEffect, useState} from "react";
import {SERVER_HOST_IP} from "../../constants/config";
import * as auth from "../../helpers/auth";

const labelTranslate = {
	group: 'Խումբ',
	teacher: 'Դասախոս',
	room: 'Սենյակ',
	classType: 'Տեսակ',
	timeSlot: 'Ժամ',
	dayOfWeek: 'Օր'
};

const CreateNewLesson = ({isOpen, onCancel, getLessons}) => {
	const [createLesson, {data, isSuccess,isError, isLoading, error}] = useCreateLessonMutation();
	const [params, setParams] = useState(null);

	useEffect(() => {
		const token = auth.getToken();
		fetch(`http://${SERVER_HOST_IP}/class/params`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
			setParams(val)
		})
	}, []);

	const onFinish = async(values) => {
		try {
			await createLesson(values);
			await getLessons();
			onCancel();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<Modal title="Ստեղծել նոր դասաժամ" open={isOpen} onCancel={onCancel} footer={null}>

			{!!params && (
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off"
				>

					{Object.keys(params).map(key => {
						return (
							<Form.Item key={key} name={key} label={labelTranslate[key]} rules={[{ required: true, message: 'Պարտադիտ դաշտ:' }]}>
								<Select
									// placeholder="Պարտադիտ դաշտ:"
									options={params[key]}
								>
								</Select>
							</Form.Item>
						)
					})}

					<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
							style={{marginRight: 10}}
						>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
							style={{marginLeft: 10}}
						>
							<Button type="default" onClick={onCancel}>
								Cancel
							</Button>
						</Form.Item>
					</div>
				</Form>
			)}

			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
		</Modal>
	)
}

export default CreateNewLesson;