import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
    name:'vendor',
    initialState:{
        token:"",
        vendor:""
    },
    reducers:{
        vendorLogin:(state,action) =>{
            state.token = action.payload.token
            state.vendor = action.payload.vendor
        },
        vendorLogout:(state) => {
            state.vendor = {
                token: "",
                vendor: ""
            }
        }
    }
})
export const {vendorLogin,vendorLogout} = vendorSlice.actions
export default vendorSlice.reducer;