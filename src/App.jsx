import axios from "axios";
import { useEffect, useState } from "react"
import CommonButton from "./component/CommonButton"
import TaskCard from "./component/TaskCard"
import TaskSaveCard from "./component/TaskSaveCard"

function App() {
  const [addButtonStatus, setAddButtonStatus] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [])

  const loadTasks = () => {
    axios.get("http://localhost:5000")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className="px-32 py-20">
      <div className="flex justify-end">
        <CommonButton title={addButtonStatus ? "Close" : "+ Add Task"} width={"w-48"}
          bgColor={addButtonStatus ? "bg-red-700" : "bg-blue-700"} bgHoverColor={addButtonStatus ? "bg-red-800" : "bg-blue-800"}
          borderColor={"border-yellow-600"} hoverBorderColor={"border-yellow-700"}
          onClick={() => setAddButtonStatus(!addButtonStatus)} />
      </div>
      <div>
        {addButtonStatus && <TaskSaveCard loadTasks={() => loadTasks()}
        setAddButtonStatus={() => setAddButtonStatus()} />}
      </div>
      <div >
        {tasks?.map((value) => (
          <TaskCard key={value._id} id={value._id} title={value.title} description={value.description}
            dueDate={value.dueDate} status={value.status} loadTasks={() => loadTasks()} />
        ))
        }
      </div>
    </div>
  )
}

export default App
