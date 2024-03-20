import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const createStaff = createAsyncThunk('admin/createStaff', async (staff, thunkAPI) => {
    try {
        const response = await axios.post('http://127.0.0.1:4000/api/admin/createStaff', staff)
        console.log(response.data)
        console.log(response.data.staff._id);
        localStorage.setItem('staffid', response.data.staff._id)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateStaff = createAsyncThunk('admin/updateStaff', async (id, staff, thunkAPI) => {
    try {
        const response = await axios.put(`http://127.0.0.1:4000/api/admin/${id}/updateStaff`, staff)
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteStaff = createAsyncThunk('admin/deleteStaff', async (id, thunkAPI) => {
    console.log(id);
    try {
        const response = await axios.delete(`http://127.0.0.1:4000/api/admin/deleteStaff/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

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
            .addCase(createStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.staff = action.payload
                state.error = {
                    name: '',
                    email: '',
                    mobile: '',
                }
                state.message = action.payload.message

            })
            .addCase(createStaff.rejected, (state, action) => {
                state.isLoading = false
                state.staff = null
                state.error = action.payload.error
            })
            .addCase(updateStaff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.staff = action.payload
                state.error = {
                    name: '',
                    email: '',
                    mobile: '',
                }
                state.message = action.payload.message

            })
            .addCase(updateStaff.rejected, (state, action) => {
                state.isLoading = false
                state.staff = null
                state.error = action.payload.error
            })
            .addCase(deleteStaff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.staff = action.payload
                state.error = {
                    name: '',
                    email: '',
                    mobile: '',
                }
                state.message = action.payload.message

            })
            .addCase(deleteStaff.rejected, (state, action) => {
                state.isLoading = false
                state.staff = null
                state.error = action.payload.error
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