import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import TaskCard from '@/components/TaskCard'
import type { Task } from '@/types/task'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [open, setOpen] = useState(false)

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task: Task) => task.id !== id))
  }

  const handleToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const [filter, setFilter] = useState<'all' | 'ongoing' | 'done'>('all')
  const [dueDate, setDueDate] = useState('')
  const today = new Date().toLocaleDateString('en-CA')

  const todayTasks = tasks.filter((task) => {
    return task.dueDate === today
  })
  const filteredTasks = todayTasks.filter((task) => {
    if (filter === 'ongoing') return !task.completed
    if (filter === 'done') return task.completed
    return true
  })

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4">
        <h1 className="text-xl font-bold">Focusio</h1>

        <div className="mt-6 space-y-2">
          <p className="cursor-pointer">Dashboard</p>
          <p className="cursor-pointer">Tasks</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        {/*Buttons */}
        <div className="mb-4 space-x-5">
          {/* Add Task Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-fit">
                + Add Task
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-white text-black dark:bg-white">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">New Task</h3>
                <Input
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (!title) return
                    if (!subject) return
                    if (!dueDate) return
                    const newTask = {
                      id: Date.now(),
                      title,
                      subject,
                      completed: false,
                      dueDate,
                    }
                    setTasks([...tasks, newTask])
                    setTitle('')
                    setSubject('')
                    setDueDate('')
                    setOpen(false)
                  }}
                >
                  Add
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Filter Button */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'ongoing' | 'done')
            }
            className="mb-4 border rounded px-2 py-1 text-sm"
          >
            <option value="all">All Tasks</option>
            <option value="ongoing">Ongoing Tasks</option>
            <option value="done">Done Tasks</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tasks due today 🎉
            </p>
          )}
          {filteredTasks
            .filter((task) => {
              if (filter === 'ongoing') return !task.completed
              if (filter === 'done') return task.completed
              return true
            })
            .map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default App
