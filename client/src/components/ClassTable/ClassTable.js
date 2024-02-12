import {Button, Table} from "antd";
import {useEffect, useState} from "react";
import CreateNewLesson from "./CreateNewLesson";
import {useGetLessonsMutation} from "../../features/classApi";

const columns = [
	{
		title: 'Lesson',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Teacher',
		dataIndex: 'teacher',
		key: 'teacher',
	},
	{
		title: 'Room',
		dataIndex: 'room',
		key: 'room',
	},
	{
		title: 'StartDate',
		dataIndex: 'startDate',
		key: 'startDate',
	},
	{
		title: 'EndDate',
		dataIndex: 'endDate',
		key: 'endDate',
	},
];

const ClassTable = () => {
	const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
	const [getLessons, {data, isSuccess,isError, isLoading, error}] = useGetLessonsMutation();

	useEffect(() => {
		getLessons();
	}, []);

	return (
		<div>
			<div>
				<Button type="primary" onClick={() => setIsLessonModalOpen(true)}>
					Create New Lesson
				</Button>

				<CreateNewLesson isOpen={isLessonModalOpen} onCancel={() => setIsLessonModalOpen(false)} getLessons={getLessons}/>

				<Table dataSource={data} columns={columns} />

			</div>
		</div>
	)
};

export default ClassTable;