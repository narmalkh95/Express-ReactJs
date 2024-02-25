import {Button, Table} from "antd";
import {useCallback, useEffect, useMemo, useState} from "react";
import CreateNewLesson from "./CreateNewLesson";
import {useGetLessonsMutation} from "../../features/classApi";

const lessonTimes = [
	'9:30 - 10:50',
	'11:00 - 12:20',
	'12:50 - 14:10',
	'14:20 - 15:40'
]

const weekDays = [['Monday', 'Երկուշաբթի'], ['Tuesday', 'Երեքշաբթի'], ['Wednesday', 'Չորեքշաբթի'], ['Thursday', 'հինգշաբթի'], ['Friday', 'Ուրբաթ']];

const columns = [
	{
		title: 'Դասաժամ',
		dataIndex: 'classTime',
		key: 'classTime',
	},
	...weekDays.map(day => {
		return {
			title: day[1],
			dataIndex: day[0],
			key: day[0]
		}
	})
];

const ClassTable = () => {
	const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
	const [getLessons, {data, isSuccess, isError, isLoading, error}] = useGetLessonsMutation();

	useEffect(() => {
		getLessons();
	}, []);

	const renderTableItem = useCallback((i, index) => {
		return (
			<p key={index}>
				{i.groupName + ' '}
				<span style={{color: 'red'}}>{i.teacher + ' '}</span>
				<span style={{color: 'purple'}}>{i.room}</span>
			</p>
		)
	}, []);

	const dataSource = useMemo(() => {
		if (!data) return [];

		const dataArr = lessonTimes.map(lessonTime => {
			const obj = {
				classTime: lessonTime
			}

			weekDays.map(weekDay => {
				obj[weekDay[0]] = data?.[weekDay[0]]?.[lessonTime]?.map(renderTableItem)
			})

			return obj
		})
		return dataArr
	}, [data]);

	return (
		<div>
			<div>
				<Button type="primary" onClick={() => setIsLessonModalOpen(true)}>
					Create New Lesson
				</Button>

				<CreateNewLesson
					isOpen={isLessonModalOpen}
					onCancel={() => setIsLessonModalOpen(false)}
					getLessons={getLessons}
				/>

				{!isLoading && (
					<Table
						dataSource={dataSource}
						columns={columns}
					/>
				)}

			</div>
		</div>
	)
};

export default ClassTable;