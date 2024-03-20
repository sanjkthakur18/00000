import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signup = createAsyncThunk('auth/signup', async (formData, thunkAPI) => {
    try {
        const response = await axios.post('http://127.0.0.1:4000/api/user/registerUser', formData)
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const signin = createAsyncThunk('auth/signin', async (formData, thunkAPI) => {
    try {
        const response = await axios.post('http://127.0.0.1:4000/api/user/loginUser', formData)

        console.log('Loggedin user:', response.data)
        console.log('Loggedin user:', response)
        if (response.data) {
            console.log('yughjb');
            localStorage.setItem('username', response.data.name)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('userid', response.data.id)
            localStorage.setItem('role', response.data.role)
        }
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const addStaff = createAsyncThunk('auth/addStaff', async (id, thunkAPI) => {
    try {
        const response = await axios.post(`http://127.0.0.1:4000/api/user/${id}/loginUser`)
        console.log('Added staff:', response.data);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteStaff = createAsyncThunk('auth/deleteStaff', async (staffId, thunkAPI) => {
    try {
        const userId = localStorage.getItem('userid')
        const response = await axios.delete(`http://127.0.0.1:4000/api/user/${userId}/deleteStaff/${staffId}`)
        console.log('Deleted Staff:', response.data);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const initialState = {
    user: null,
    isLoading: false,
    isLoggedin: false,
    error: {
        email: '',
        password: ''
    },
    message: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true
        })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.error = {
                    email: '',
                    password: ''
                }
                state.message = action.payload.message
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.error = action.payload.error
            })
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isLoggedin = true
                state.error = {
                    email: '',
                    password: ''
                }
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.error = action.payload.error
                state.message = 'Something went wrong'
            })
            .addCase(addStaff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(addStaff.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.error = action.payload.error
                state.message = 'Something went wrong'
            })
            .addCase(deleteStaff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(deleteStaff.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.message = 'Something went wrong'
            })
    }
})

export const loggedStatus = (state) => state.auth.isLoggedin
export const loadingStatus = (state) => state.auth.isLoading

export default authSlice.reducer