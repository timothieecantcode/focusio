import { Card, CardContent } from '@/components/ui/card'
import type { Task } from '@/types/task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export default function TaskCard({ task, onDelete, onToggle }: Props) {
  return (
    <Card
      className="hover:bg-muted/50 transition"
      onClick={() => onToggle(task.id)}
    >
      <CardContent className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
          <p className="font-medium">{task.title}</p>
          <p className="text-sm text-muted-foreground">{task.subject}</p>
          <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
        </div>

        <div className="ml-auto mt-2 flex items-center gap-10 ">
          <p className="text-sm text-muted-foreground">
            {task.completed ? 'Done' : 'Ongoing'}
          </p>
          <button
            title="Delete task"
            className="text-sm"
            onClick={(e) => {
              e.stopPropagation()
              if (!confirm('Delete this task?')) return
              onDelete(task.id)
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
