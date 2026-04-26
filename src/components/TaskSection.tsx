import TaskCard from '@/components/TaskCard'
import type { Task } from '@/types/task'

type Props = {
  title: string
  tasks: Task[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  showDueDate?: boolean
}

export default function TaskSection({
  title,
  tasks,
  onDelete,
  onToggle,
  onEdit,
  showDueDate,
}: Props) {
  return (
    <>
      <h3 className="mb-5 font-medium">{title}</h3>

      <div className="space-y-3 max-w-sm ml-5 mb-5">
        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground">Nothing here yet 😉</p>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
            showDueDate={showDueDate}
          />
        ))}
      </div>
    </>
  )
}
