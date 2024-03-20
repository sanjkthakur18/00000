import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const signup = createAsyncThunk('admin/signup', async (formData, thunkAPI) => {
    try{
        const response = await axios.post('http://127.0.0.1:4000/api/admin/createAdmin', formData)
        console.log(response.data)
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const signin = createAsyncThunk('admin/signin', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('http://127.0.0.1:4000/api/admin/loginAdmin', formData)
        console.log(response);
        console.log('Loggedin user:', response.data)
        if(response){
            localStorage.setItem('username', response.data.name)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('userid', response.data._id)
        }
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const initialState = {
    admin:null,
    isLoading:false,
    isLoggedin:false,
    error: {
        email:'',
        password:''
    },
    message:null
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.error = {
                email:'',
                password:''
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
                email:'',
                password:''
            }
        })
        .addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = action.payload.error
            state.message = 'Something went wrong'
        })
    }
})

export const loggedStatus = (state) => state.auth.isLoggedin
export const loadingStatus = (state) => state.auth.isLoading
export const errorStatus = (state) => state.auth.error
export const messageStatus = (state) => state.auth.message

export default adminSlice.reducer