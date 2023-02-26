import React from 'react'
import { TiTickOutline } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'
import { RiCloseCircleLine } from 'react-icons/ri'

import StatusIcon from './StatusIcon'
import CommonButton from './CommonButton'
import moment from 'moment/moment'
import axios from 'axios'
const TaskCard = (props) => {
    const { id, title, description, dueDate, status, loadTasks } = props

    const deleteTask = (id) => {
        if (confirm("Are you sure ?")) {
            axios.delete("http://localhost:5000/" + id)
                .then(res => {
                    if (res.status === 200) {
                        alert("Task deleted!");
                        loadTasks();
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const updateAsDone = () => {
        axios.put("http://localhost:5000",
            {
                _id: id,
                title: title,
                description: description,
                dueDate: dueDate,
                status: "done"
            })
            .then(res => {
                if (res.status === 200) {
                    loadTasks();
                }
            })
            .catch(err => console.log(err))
    }

    const updateAsCancel = () => {
        axios.put("http://localhost:5000",
            {
                _id: id,
                title: title,
                description: description,
                dueDate: dueDate,
                status: "cancel"
            })
            .then(res => {
                if (res.status === 200) {
                    loadTasks();
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='mt-8 relative p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl hover:scale-105 transition delay-75'>
            <div className='absolute top-2 right-2'> <RiCloseCircleLine className='text-4xl cursor-pointer text-red-600' onClick={() => deleteTask(id)} /></div>
            <div className='flex justify-between items-center pt-5'>
                <div className='px-5 space-y-3'>
                    <div className='text-4xl'>
                        <span className='font-normal'>Task : </span>
                        <span className='font-bold'>{title}</span>
                    </div>
                    <div className='text-2xl'>
                        <span className='font-normal'>Description : </span>
                        <span className='font-bold'>{description}</span>
                    </div>
                    <div className='text-2xl'>
                        <span className='font-normal'>Due Date : </span>
                        <span className='font-bold'>{moment(dueDate).format("DD/MM/YYYY")}</span>
                    </div>
                </div>
                <div >
                    {status === "done" ? <StatusIcon icon={<TiTickOutline className='text-5xl text-white' />} bgColor={"bg-green-600"} />
                        : <StatusIcon icon={<IoClose className='text-5xl text-white' />} bgColor={"bg-red-600"} />}
                </div>
            </div>
            <div className='flex justify-evenly items-center pt-4'>
                <CommonButton title={"Mark as done"} width={"w-60"}
                    bgColor={"bg-green-700"} bgHoverColor={"bg-green-800"}
                    borderColor={"border-yellow-600"} hoverBorderColor={"border-yellow-700"} onClick={() => updateAsDone()} />
                <CommonButton title={"Mark as cancel"} width={"w-60"}
                    bgColor={"bg-red-700"} bgHoverColor={"bg-red-800"}
                    borderColor={"border-yellow-600"} hoverBorderColor={"border-yellow-700"} onClick={() => updateAsCancel()} />
            </div>
        </div>
    )
}

export default TaskCard