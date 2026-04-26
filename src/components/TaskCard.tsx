import { Card, CardContent } from '@/components/ui/card'
import type { Task } from '@/types/task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faBars } from '@fortawesome/free-solid-svg-icons'

type Props = {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  showDueDate?: boolean
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onEdit,
  showDueDate,
}: Props) {
  return (
    <Card className="py-2 px-0">
      <CardContent className="flex items-center justify-between gap-5">
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onToggle(task.id)
          }}
        >
          <span className="text-lg">{task.completed ? '✓' : 'O'}</span>
        </button>
        <div>
          <p className="text-sm font-medium leading-none">{task.title}</p>
          <p className="text-xs text-muted-foreground leading-tight">
            {task.subject}
          </p>
          {showDueDate && task.dueDate && (
            <p className="text-xs text-muted-foreground leading-tight">
              Due: {task.dueDate}
            </p>
          )}
        </div>

        <div className="ml-auto flex items-center ">
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
