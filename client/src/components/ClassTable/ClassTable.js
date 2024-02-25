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
			dataIndex: day[1],
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
				<span style={{textTransform: 'capitalize'}}>{i.groupName + ' '}</span>
				<span style={{color: "gray"}}>{i.classType + ' '}</span>
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
				obj[weekDay[1]] = data?.[weekDay[1]]?.[lessonTime]?.map(renderTableItem)
			})

			return obj
		})
		return dataArr
	}, [data]);

	return (
		<div>
			<div>
				<Button type="primary" onClick={() => setIsLessonModalOpen(true)}>
					Ստեղծել նոր դասաժամ
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
						pagination={false}
					/>
				)}

			</div>
		</div>
	)
};

export default ClassTable;