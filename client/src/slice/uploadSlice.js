import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        uploading: false,
        uploadedFile: null,
        error: null,
    },
    reducers: {
        uploadStart: (state) => {
            state.uploading = true;
            state.error = null;
        },
        uploadSuccess: (state, action) => {
            state.uploading = false;
            state.uploadedFile = action.payload;
        },
        uploadFailure: (state, action) => {
            state.uploading = false;
            state.error = action.payload;
        },
    },
});


export const uploadFile = (file) => async (dispatch) => {
    dispatch(uploadStart());
    try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(uploadSuccess(res.data));
    } catch (error) {
        dispatch(uploadFailure(error.message));
    }
};

export const { uploadStart, uploadSuccess, uploadFailure } = uploadSlice.actions;

export default uploadSlice;
