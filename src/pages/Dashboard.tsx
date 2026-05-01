import { useState, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import TaskSection from '@/components/TaskSection'
import EditTaskDialog from '@/components/EditTaskDialog'
import type { Task } from '@/types/task'

export default function Dashboard() {
  // ================= STATE =================
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'done'>('all')
  const [editTask, setEditTask] = useState<Task | null>(null)

  // ================= HELPERS =================
  const formatTask = (task: Task): Task => ({
    ...task,
    dueDate: task.dueDate.split('T')[0],
  })

  // ================= FETCH =================
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data.map(formatTask))
      })
  }, [])

  // ================= HANDLERS =================
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleToggle = async (id: number) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const updated = {
      ...task,
      completed: !task.completed,
    }

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
    })

    const data = await res.json()

    setTasks((prev) => prev.map((t) => (t.id === id ? formatTask(data) : t)))
  }

  const handleEdit = (task: Task) => {
    setEditTask(task)
  }

  // ================= DATE LOGIC =================
  const today = new Date().toLocaleDateString('en-CA')

  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = tomorrowDate.toLocaleDateString('en-CA')

  const now = new Date()
  const day = now.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day

  const mondayDate = new Date(now)
  mondayDate.setDate(now.getDate() + diffToMonday)

  const sundayDate = new Date(mondayDate)
  sundayDate.setDate(mondayDate.getDate() + 6)

  const monday = mondayDate.toLocaleDateString('en-CA')
  const sunday = sundayDate.toLocaleDateString('en-CA')

  // ================= FILTER =================
  const filterTask = (list: Task[]) => {
    return list.filter((task) => {
      if (filter === 'ongoing') return !task.completed
      if (filter === 'done') return task.completed
      return true
    })
  }

  const todayTasks = tasks.filter((task) => task.dueDate === today)
  const tomorrowTasks = tasks.filter((task) => task.dueDate === tomorrow)
  const weekTasks = tasks
    .filter((task) => {
      return (
        task.dueDate >= monday &&
        task.dueDate <= sunday &&
        task.dueDate !== today &&
        task.dueDate !== tomorrow
      )
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  const overdueTasks = tasks.filter((task) => {
    return task.dueDate < today && !task.completed
  })

  const filteredTodayTasks = filterTask(todayTasks)
  const filteredTomorrowTasks = filterTask(tomorrowTasks)
  const filteredWeekTasks = filterTask(weekTasks)

  // ================= UI =================
  return (
    <>
      <div className="flex flex-col h-30">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <Topbar
          open={open}
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          subject={subject}
          setSubject={setSubject}
          dueDate={dueDate}
          setDueDate={setDueDate}
          tasks={tasks}
          setTasks={setTasks}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filter !== 'done' && (
          <TaskSection
            title="Overdue"
            tasks={overdueTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
            showDueDate
          />
        )}
        <TaskSection
          title="Today"
          tasks={filteredTodayTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
        <TaskSection
          title="Tomorrow"
          tasks={filteredTomorrowTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
        <TaskSection
          title="This Week"
          tasks={filteredWeekTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
          showDueDate
        />
        <EditTaskDialog
          editTask={editTask}
          setEditTask={setEditTask}
          setTasks={setTasks}
        />
      </div>
    </>
  )
}
