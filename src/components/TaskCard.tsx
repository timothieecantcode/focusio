import { Card, CardContent } from '@/components/ui/card'
import type { Task } from '@/types/task'

type Props = {
  task: Task
}

export default function TaskCard({ task }: Props) {
  return (
    <Card className="hover:bg-muted/50 transition">
      <CardContent className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
          <p className="font-medium">{task.title}</p>
          <p className="text-sm text-muted-foreground">{task.subject}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          {task.completed ? 'Done' : 'Ongoing'}
        </p>
      </CardContent>
    </Card>
  )
}
