import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const PORT = 3000
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Testing')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

//

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.post('/tasks', async (req, res) => {
  const { title, subject, dueDate } = req.body

  if (!title || !subject || !dueDate) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const task = await prisma.task.create({
    data: {
      title,
      subject,
      dueDate: new Date(dueDate),
    },
  })

  res.json(task)
})

app.delete('/tasks/:id', async(req, res) => {
    const id = Number(req.params.id)
    await prisma.task.delete({
        where: { id }
    })
    res.json({ message: 'Deleted' })
})

app.patch('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { dueDate, id: _, ...rest } = req.body

  const updated = await prisma.task.update({
    where: { id },
    data: {
      ...rest,
      ...(dueDate && { dueDate: new Date(dueDate) }),
    },
  })

  res.json(updated)
})