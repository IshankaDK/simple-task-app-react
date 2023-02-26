import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import CommonButton from './CommonButton'



const TaskSaveCard = ({loadTasks,setAddButtonStatus}) => {

    const [newTask, setNewTask] = useState({ status: "n/a" });

    const handleChage = (event) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value })
    }
    const saveTask = () => {
        axios.post("http://localhost:5000", newTask)
            .then(res => {
                if(res.status === 200){
                    loadTasks();
                    setAddButtonStatus(false);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl space-y-5'>
            <div className='flex justify-between items-center w-full space-x-12'>
                <input type="text" name="title" className='w-1/2 border-2 border-zinc-800 py-2 pl-2 shadow-xl'
                    placeholder='Task Title' onChange={handleChage} />

                <input type="text" name="description" className='w-1/2 border-2 border-zinc-800 py-2 pl-2 shadow-xl'
                    placeholder='Task Description' onChange={handleChage} />
            </div>
            <div className='w-full'>
                <input type="date" name="dueDate" className='w-full border-2 border-zinc-800 py-2 px-2 shadow-xl'
                    placeholder='Due date' onChange={handleChage} />
            </div>
            <div className='flex justify-end items-center'>
                <CommonButton title={"Save Task"} width={"w-48"}
                    bgColor={"bg-blue-700"} bgHoverColor={"bg-blue-800"}
                    borderColor={"border-yellow-600"} hoverBorderColor={"border-yellow-700"}
                    onClick={() => saveTask()} />
            </div>
        </div>
    )
}

export default TaskSaveCard