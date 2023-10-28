import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useState,
  useEffect,
} from 'react'
import { Task } from '../../components/Task/Task'
import styles from './ContainerTask.module.css'
import { Header } from '../../components/HeaderInput/Header'
import { TodosStorage } from '../../@storage/Storage'
import { v4 as randomUUID } from 'uuid'
import { Todo } from '../../@types/types'
import Clipboard from '../../assets/Clipboard.svg'

export function ContainerTask() {
  const [tasks, setTasks] = useState<Todo[]>([])
  const [newTasks, setNewTasks] = useState('')

  const initialMessageAppears = tasks.length === 0

  const countTasks = tasks.length
  const countTaskCompleted = tasks.filter((task) => task.completed).length

  // Adiciona um novo comentário e matém os comentários existentes
  function handleCreatNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = { id: randomUUID(), content: newTasks, completed: false }

    const updatedTasks = [...tasks, newTask]
    handleSaveTasks(updatedTasks)
    setTasks(updatedTasks)
    setNewTasks('')
  }

  // Controla o estado de completed da Task
  function handleToggleCompleted(taskToToggle: Todo) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskToToggle.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })

    handleSaveTasks(updatedTasks)
    setTasks(updatedTasks)
  }

  // Monitora as mudanças no Input
  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTasks(event.target.value)
  }

  // Deletar tarefa
  function deleteTask(taskToDeleted: Todo) {
    const tasksWithoutTaskToDelete = tasks.filter((task) => {
      return task.id !== taskToDeleted.id
    })
    // Faz alterações nas tarefas criadas
    setTasks(tasksWithoutTaskToDelete)
    removeTaskFromStorage(taskToDeleted)
  }

  function removeTaskFromStorage(taskToRemove: Todo) {
    const savedTasks = TodosStorage.get()
    const updatedTasks = savedTasks.filter(
      (task) => task.id !== taskToRemove.id,
    )
    TodosStorage.save(updatedTasks)
  }

  function handleNewInvalidTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function handleSaveTasks(updatedTasks: Todo[]) {
    TodosStorage.save(updatedTasks)
  }

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('TODOS') || '[]')

    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks)
    } else {
      setTasks([])
    }
  }, [])

  return (
    <section className={styles.sectionToDoList}>
      <div className={styles.headerPrimary}>
        <Header
          submit={handleCreatNewTask}
          change={handleNewCommentChange}
          value={newTasks}
          onInvalid={handleNewInvalidTask}
        />
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tasksMetrics}>
            <span className={styles.tasksMetricsLegend}>Tarefas</span>
            <span className={styles.tasksMetricsNumber}>{countTasks}</span>
          </span>
          <span className={styles.tasksMetrics}>
            <span className={styles.tasksMetricsLegend}>Concluídas</span>
            <span className={styles.tasksMetricsNumber}>
              {countTaskCompleted}
            </span>
          </span>
        </header>

        {initialMessageAppears && (
          <div className={styles.containerInitialMensagem}>
            <div>
              <img src={Clipboard} alt="Clipboard" />
            </div>
            <div className={styles.InitialMensagemLegend}>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}

        <section className={styles.sectionTask}>
          <div className={styles.containerTask}>
            {tasks.map((task) => {
              return (
                <Task
                  task={task}
                  key={task.id}
                  content={task.content}
                  onDeleteTask={() => deleteTask(task)}
                  onToggleCompleted={() => handleToggleCompleted(task)}
                />
              )
            })}
          </div>
        </section>
      </div>
    </section>
  )
}
