import { useState, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import TaskCard from '@/components/TaskCard'
import EditTaskDialog from '@/components/EditTaskDialog'
import type { Task } from '@/types/task'

export default function Tasks() {
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

  // ================= FILTER =================
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'ongoing') return !task.completed
      if (filter === 'done') return task.completed
      return true
    })
    .sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    })

  // ================= UI =================
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>

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

      <div className="space-y-3 max-w-md ml-5">
        {filteredTasks.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No tasks yet — add one 👀
          </p>
        )}

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
            showDueDate
          />
        ))}
      </div>

      <EditTaskDialog
        editTask={editTask}
        setEditTask={setEditTask}
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  )
}
