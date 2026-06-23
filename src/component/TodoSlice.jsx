import { createSlice, nanoid } from '@reduxjs/toolkit'
import React, { act } from 'react'

const initialState = {
    data: [{
        id: 1,
        Data: 'Hello'
    }],
}
const TodoSlice =createSlice(
    {
    name : 'Data',
    initialState,
    reducers : {
        AddData : (state, action) =>{
            const id = nanoid();
            const Data = action.payload;
            console.log(Data)
            const todo = {
                id,
                Data,
                Completed : false
            }
            state.data.push(todo);

        },
        DeleteData : (state, action) =>{
            const id = action.payload;
            state.data = state.data.filter((data)=>{return data.id != id});
        },
        UpdateData : (state, action)=>{
            const {id, Data, Completed} = action.payload;
      
            state.data = state.data.map((data)=>{return data.id  == id ? {id,Data,Completed : !Completed} : data })
        },
        CheckBox : (state, action) =>{
            const id  = action.payload;
            state.data = state.data.map((ele)=>{return ele.id == id ? {...ele, Completed : !ele.Completed}: ele})
        }
    }
}
)
export const {AddData, DeleteData, UpdateData, CheckBox} = TodoSlice.actions;

export default TodoSlice.reducer
