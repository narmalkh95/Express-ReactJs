import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {uploadFile} from "../../slice/uploadSlice";
import styles from './UploadForm.module.css'
import { Form, Input, Button } from 'antd';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const dispatch = useDispatch();
    const {uploading, uploadedFile, error} = useSelector((state) => state.upload);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(uploadFile(file));
    };

    return (
        <Form>
            <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                <Input.TextArea rows={4} placeholder="Դեր նամակը" maxLength={6} />
            </Form.Item>
            <Form.Item>
                <div className="custom-file">
                    <input type='file' className="custom-file-input" id='customFile' onChange={onChange}/>
                    <label className="custom-file-label" htmlFor='customFile'>
                        {fileName}
                    </label>
                </div>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onSubmit={onSubmit} htmlType="submit" >Upload</Button>
            </Form.Item>
        </Form>
    );
};

export default UploadForm;
