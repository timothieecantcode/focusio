import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { Task } from '@/types/task'

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  title: string
  setTitle: (v: string) => void
  subject: string
  setSubject: (v: string) => void
  dueDate: string
  setDueDate: (v: string) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  filter: 'all' | 'ongoing' | 'done'
  setFilter: (v: 'all' | 'ongoing' | 'done') => void
}

export default function Topbar({
  open,
  setOpen,
  title,
  setTitle,
  subject,
  setSubject,
  dueDate,
  setDueDate,
  tasks,
  setTasks,
  filter,
  setFilter,
}: Props) {
  return (
    <div className="mb-4 space-x-5">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add Task</Button>
        </DialogTrigger>

        <DialogContent className="bg-white text-black dark:bg-white">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">New Task</h3>

            <Input
              placeholder="Title"
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
              onClick={async () => {
                if (!title || !subject || !dueDate) return

                const res = await fetch('http://localhost:3000/tasks', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    title,
                    subject,
                    dueDate,
                  }),
                })

                const data = await res.json()

                setTasks([
                  ...tasks,
                  { ...data, dueDate: data.dueDate.split('T')[0] },
                ])

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

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as 'all' | 'ongoing' | 'done')
        }
        className="h-9 rounded-full border px-3 text-sm font-medium"
      >
        <option value="all">All Tasks</option>
        <option value="ongoing">Ongoing Tasks</option>
        <option value="done">Completed Tasks</option>
      </select>
    </div>
  )
}
