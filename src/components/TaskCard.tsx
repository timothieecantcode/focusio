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
  const today = new Date().toLocaleDateString('en-CA')
  const isOverdue = task.dueDate && task.dueDate < today && !task.completed

  function formatDueDate(dateStr: string) {
    const date = new Date(dateStr)
    const day = date.toLocaleDateString('en-AU', { weekday: 'short' })

    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yy = String(date.getFullYear()).slice(-2)

    return `${dd}/${mm}/${yy} - ${day}`
  }

  return (
    <Card
      className={`relative font-sm px-0 py-2 ${task.completed ? 'bg-gray-200' : isOverdue ? 'bg-red-200' : ''}`}
    >
      <CardContent className="flex items-center justify-between gap-5 ">
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
              Due: {formatDueDate(task.dueDate)}
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
