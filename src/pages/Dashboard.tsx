import { useState, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import TaskSection from '@/components/TaskSection'
import EditTaskDialog from '@/components/EditTaskDialog'
import type { Task } from '@/types/task'

export default function Dashboard() {
  // ================= STATE =================
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [open, setOpen] = useState(false)

  const [filter, setFilter] = useState<'all' | 'ongoing' | 'done'>('all')

  const [editTask, setEditTask] = useState<Task | null>(null)

  // ================= HANDLERS =================
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
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
      if (!task.dueDate) return false
      return (
        task.dueDate >= monday &&
        task.dueDate <= sunday &&
        task.dueDate !== today &&
        task.dueDate !== tomorrow
      )
    })
    .sort((a, b) => a.dueDate!.localeCompare(b.dueDate!))
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false
    return task.dueDate < today && !task.completed
  })

  const filteredTodayTasks = filterTask(todayTasks)
  const filteredTomorrowTasks = filterTask(tomorrowTasks)
  const filteredWeekTasks = filterTask(weekTasks)

  // ================= UI =================
  return (
    <>
      <div className="flex flex-col h-30">
        {' '}
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
        {' '}
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
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </>
  )
}
