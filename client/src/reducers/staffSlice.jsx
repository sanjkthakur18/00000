import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleStaff = createAsyncThunk('admin/getSingleStaff', async (id, thunkAPI) => {
    try {
        const response = await axios.put(`http://127.0.0.1:4000/api/admin/${id}/getStaff`)
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getAllStaff = createAsyncThunk('admin/getAllStaff', async (thunkAPI) => {
    try {
        const response = await axios.get(`http://127.0.0.1:4000/api/admin/getAllStaff`)
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const initialState = {
    staff: [],
    isLoading: false,
    error: {
        name: '',
        email: '',
        mobile: '',
    },
    message: null
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createStaff.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getSingleStaff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.staff = action.payload
                state.error = {
                    name: '',
                    email: '',
                    mobile: '',
                }
                state.message = action.payload.message

            })
            .addCase(getSingleStaff.rejected, (state, action) => {
                state.isLoading = false
                state.staff = null
                state.error = action.payload.error
            })
            .addCase(getAllStaff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.staff = action.payload
                state.error = {
                    name: '',
                    email: '',
                    mobile: '',
                }
                state.message = action.payload.message

            })
            .addCase(getAllStaff.rejected, (state, action) => {
                state.isLoading = false
                state.staff = null
                state.error = action.payload.error
            })
    }
})

export const loadingStatus = (state) => state.staff.isLoading

export default staffSlice.reducer