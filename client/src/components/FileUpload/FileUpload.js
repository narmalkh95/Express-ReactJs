import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from "../../slice/uploadSlice";
import styles from './UploadForm.module.css'
import { Form, Input, Button, Card } from 'antd';
import { message as messageAntd } from 'antd';
import * as auth from "../../helpers/auth";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { uploading, uploadedFile, error } = useSelector((state) => state.upload);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const onFinish = async () => {
        if (!file || !message) {
            messageAntd.error('Please select a file and enter a message');
            return;
        }
        const token = auth.getToken();
        await dispatch(uploadFile(file, message, token));
        if (!error) {
            messageAntd.success('File uploaded successfully');

            setMessage('');
            setFile(null);
            setFileName('');
            form.resetFields();
        }
    };

    return (
        <Card className={styles.uploadCard}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                    <Input.TextArea value={message} onChange={onMessageChange} rows={4} placeholder="Դեր նամակը" maxLength={6} />
                </Form.Item>
                <Form.Item>
                    <div className="custom-file">
                        <input type='file' className="custom-file-input" id='customFile' onChange={onChange} />
                        <label className="custom-file-label" htmlFor='customFile'>
                            {fileName}
                        </label>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={uploading}>Upload</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UploadForm;
