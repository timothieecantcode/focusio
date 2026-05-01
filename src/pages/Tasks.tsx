import { useState, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import TaskCard from '@/components/TaskCard'
import EditTaskDialog from '@/components/EditTaskDialog'
import type { Task } from '@/types/task'

export default function Tasks() {
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

  // ================= FILTER =================
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'ongoing') return !task.completed
      if (filter === 'done') return task.completed
      return true
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  // ================= UI =================
  return (
    <>
      <div className="flex flex-col h-30">
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
      </div>

      <div className="flex-1 overflow-y-auto">
        <br></br>
        <div className="space-y-3 max-w-md ml-1">
          {filteredTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing here yet 😉</p>
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
          setTasks={setTasks}
        />
      </div>
    </>
  )
}
