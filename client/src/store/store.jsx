import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice'
import adminSlice from '../reducers/adminSlice'
import staffSlice from '../reducers/staffSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin:adminSlice,
        staff:staffSlice
    }
}
)

export default store