import { useState, useEffect } from "react";
import {BrowserRouter as BrowserRouter, Route} from "react-router-dom"
import Header from './components/Header'
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])






  const fetchTasks = async (id) => {
    const res = await fetch("https://localhost:7000/tasks/${id}");
    const data = await res.json();

    return data;
  }

  const deletTasks = async (id) => {
    await fetch(`https://localhost:7000/tasks/${id}`,{
      method: 'DELETE',
    })
  }

  const addTask = async (task) => {
    const res = await fetch('https://localhost:7000/tasks', {
      method: "POST",
      header: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(task)
    })
    const data = res.json()
    
  }
}
return (
  <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
      <Route
        path="/"
        exact
        render={(props) => (
          <>
            {showAddTasks && <AddTask onAdd={addTask} />}
        )

        }}
    </div>
  </Router>
function App(){
  return (
  <div className='container'>
    <h1>Hello</h1>
    <Header />
  </div>
  )
}
export default App
