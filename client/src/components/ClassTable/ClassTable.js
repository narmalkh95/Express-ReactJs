import {Button, message, Popconfirm, Spin, Table} from "antd";
import {useCallback, useEffect, useMemo, useState} from "react";
import CreateNewLesson from "./CreateNewLesson";
import {useGetLessonsMutation} from "../../features/classApi";
import {SERVER_HOST_IP} from "../../constants/config";
import * as auth from "../../helpers/auth";
import {setLoading} from "../../slice/authSlice";
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";

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
    const [getLessons, {data, isLoading}] = useGetLessonsMutation();

    useEffect(() => {
        getLessons();
    }, []);

    const handleRemove = useCallback((lessonScheduleId, groupId) => {
        setLoading(true)
        try {
            const token = auth.getToken();
            setTimeout(() => {
                fetch(
                    `${SERVER_HOST_IP}/class/delete`,
                    {
                        method: 'POST',
                        body: JSON.stringify({lessonScheduleId, groupId}),
                        headers: {'Content-Type': 'application/json', Authorization: token}
                    },
                ).then(() => {
                    message.success('Դասաժամը հաջողությամբ հեռացված է:');
                    getLessons();
                })
            }, 1500)
        } catch (e) {
            message.error('Սխալմունք:');
        } finally {
            setLoading(false)
        }
    }, []);

    const renderTableItem = useCallback((i, index) => {
        const weekSeparator = i.onEvenWeek && i.onOddWeek ? '' : i.onOddWeek ? 'I' : 'II'

        return (
            <Popconfirm
                title="Հեռացնել դասաժամը"
                description="Արդյո՞ք ցանկանում եք հեռացնել դասաժամը:"
                onConfirm={() => handleRemove(i.lessonScheduleId, i.groupId)}
                okText="Այո"
                cancelText="Ոչ"
            >
                <p style={{cursor: 'pointer'}}>
                    <span style={{textTransform: 'capitalize'}}>{i.groupName + ' '}</span>
                    <span style={{color: "gray"}}>{i.classType + ' '}</span>
                    <span style={{color: 'red'}}>{i.teacher + ' '}</span>
                    <span style={{color: 'purple'}}>{i.room}</span>
                    {weekSeparator && (
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: 12,
                            fontFamily: 'monospace'
                        }}
                        > - {weekSeparator}</span>
                    )}
                </p>
            </Popconfirm>
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
        <div style={{padding: '20px'}}>
            <div>
                <PermissionWrapper userPermissions={['Admin']}>
                    <Button type="primary" onClick={() => setIsLessonModalOpen(true)}>
                        Ստեղծել նոր դասաժամ
                    </Button>
                </PermissionWrapper>
                <CreateNewLesson
                    isOpen={isLessonModalOpen}
                    onCancel={() => setIsLessonModalOpen(false)}
                    getLessons={getLessons}
                />

                {isLoading ? <Spin/> : (
                    <>
                        <h4>Դասացուցակ</h4>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                        />
                    </>
                )}

            </div>
        </div>
    )
};

export default ClassTable;