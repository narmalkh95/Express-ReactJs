import {Button, DatePicker, Form, Input, InputNumber, Modal} from "antd";
import { useCreateLessonMutation, useGetLessonsMutation } from "../../features/classApi";

const { RangePicker } = DatePicker;

const CreateNewLesson = ({isOpen, onCancel, getLessons}) => {
	const [createLesson, {data, isSuccess,isError, isLoading, error}] = useCreateLessonMutation();

	const onFinish = async(values) => {
		try {
			await createLesson({...values, startDate: values.date[0], endDate: values.date[1]});
			await getLessons();
			onCancel();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<Modal title="Create New Lesson" open={isOpen} onCancel={onCancel} footer={null}>

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
				<Form.Item
					label="Lessons Name"
					name="name"
					rules={[
						{
							required: true,
							message: 'Please input lessons name!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Teachers Name"
					name="teacher"
					rules={[
						{
							required: true,
							message: 'Please input teachers name!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Room"
					name={'room'}
					rules={[
						{
							required: true,
							message: 'Please select room!',
						},
					]}
				>
					<InputNumber />
				</Form.Item>

				<Form.Item
					label="Date and time"
					name="date"
					rules={[
						{
							required: true,
							message: 'Please select date!',
						},
					]}
				>
					<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
				</Form.Item>

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

			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
		</Modal>
	)
}

export default CreateNewLesson;