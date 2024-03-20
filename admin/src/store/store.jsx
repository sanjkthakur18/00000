import { configureStore } from '@reduxjs/toolkit'
import adminSlice from '../reducers/adminSlice'
import staffSlice from '../reducers/staffSlice'

const store = configureStore({
    reducer: {
        admin:adminSlice,
        staff:staffSlice
    }
}
)

export default store