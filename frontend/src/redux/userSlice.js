import { createSlice } from "@reduxjs/toolkit";
const initialState={
    _id:'',
    firstname: '',
  lastname: '',
  email: '',
  image: '',
  password:'',
}
export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginredux:(state=initialState,action)=>{
            console.log(action.payload.data)
         state._id=action.payload.data._id
         state.firstname=action.payload.data.firstname
         state.lastname=action.payload.data.lastname
         state.email=action.payload.data.email
         state.image=action.payload.data.image
         state.password=action.payload.data.password

        },
        logoutredux:(state=initialState,action)=>{
      
         state._id="";
         state.firstname="";
         state.lastname="";
         state.email="";
         state.image="";
         state.password="";

        },
        
    },

})
export const {logoutredux}=userSlice.actions
export const {loginredux } = userSlice.actions
export default userSlice.reducer