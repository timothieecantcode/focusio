import { useState } from 'react'
import { useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import TaskCard from '@/components/TaskCard'
import type { Task } from '@/types/task'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [open, setOpen] = useState(false)

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

        {/* Add Task Button */}
        <div className="mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Task</Button>
            </DialogTrigger>

            <DialogContent className="bg-white text-black dark:bg-white">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add Task</h3>
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
                <Button
                  onClick={() => {
                    if (!title) return
                    const newTask = {
                      id: Date.now(),
                      title,
                      subject,
                      completed: false,
                    }
                    setTasks([...tasks, newTask])
                    setTitle('')
                    setSubject('')
                    setOpen(false)
                  }}
                >
                  Add
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tasks yet, add one using the 'Add Task' button above!
            </p>
          )}
          {tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
