import { Card, CardContent } from '@/components/ui/card'
import type { Task } from '@/types/task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faBars,
  faCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
}

export default function TaskCard({ task, onDelete, onToggle, onEdit }: Props) {
  return (
    <Card className="hover:bg-muted/50 transition" onClick={() => onEdit(task)}>
      <CardContent className="flex items-start justify-between gap-10">
        <div className="ml-3 mt-2 flex">
          <button className="cursor-pointer" onClick={() => onToggle(task.id)}>
            <span className="text-lg">{task.completed ? '✓' : 'O'}</span>
          </button>
        </div>
        <div className="space-y-1">
          <p className="font-medium">{task.title}</p>
          <p className="text-sm text-muted-foreground">{task.subject}</p>
          {/* <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p> */}
        </div>

        <div className="ml-auto mr-3 mt-3 flex items-center gap-10 ">
          {task.completed ? (
            <button
              title="Delete task"
              className="text-sm cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                if (!confirm('Delete this task?')) return
                onDelete(task.id)
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            <button
              title="Edit task"
              className="text-sm cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(task)
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
