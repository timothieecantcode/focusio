import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types/task'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  editTask: Task | null
  setEditTask: Dispatch<SetStateAction<Task | null>>
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export default function EditTaskDialog({
  editTask,
  setEditTask,
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
            onClick={async () => {
              if (!editTask) return

              const res = await fetch(
                `http://localhost:3000/tasks/${editTask.id}`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ...editTask,
                    dueDate: new Date(editTask.dueDate.split('T')[0]),
                  }),
                }
              )

              const updated = await res.json()

              setTasks((prev) =>
                prev.map((task) =>
                  task.id === updated.id
                    ? {
                        ...updated,
                        dueDate: updated.dueDate.split('T')[0],
                      }
                    : task
                )
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
