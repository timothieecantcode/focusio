import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types/task'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  editTask: Task | null
  setEditTask: Dispatch<SetStateAction<Task | null>>
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

export default function EditTaskDialog({
  editTask,
  setEditTask,
  tasks,
  setTasks,
}: Props) {
  return (
    <Dialog open={!!editTask} onOpenChange={() => setEditTask(null)}>
      <DialogContent className="bg-white text-black dark:bg-white">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Edit Task</h3>

          <Input
            value={editTask?.title || ''}
            onChange={(e) =>
              setEditTask((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
              )
            }
          />

          <Input
            value={editTask?.subject || ''}
            onChange={(e) =>
              setEditTask((prev) =>
                prev ? { ...prev, subject: e.target.value } : prev
              )
            }
          />

          <Input
            type="date"
            value={editTask?.dueDate || ''}
            onChange={(e) =>
              setEditTask((prev) =>
                prev ? { ...prev, dueDate: e.target.value } : prev
              )
            }
          />

          <Button
            onClick={() => {
              if (!editTask) return

              setTasks(
                tasks.map((task) => (task.id === editTask.id ? editTask : task))
              )

              setEditTask(null)
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
