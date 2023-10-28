import { useState } from 'react'
import styles from './Task.module.css'
import { Trash } from 'phosphor-react'
import { Todo } from '../../@types/types'

interface TaskPorps {
  task: Todo
  content: string
  onDeleteTask: (content: string) => void
  onToggleCompleted: (id: string, completed: boolean) => void
}

export function Task({
  task,
  content,
  onDeleteTask,
  onToggleCompleted,
}: TaskPorps) {
  const [isChecked, setIsChecked] = useState(task.completed)

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked)
    onToggleCompleted(task.id, !isChecked)
  }

  function handleDeleteTask() {
    console.log('deletar')

    if (isChecked) onToggleCompleted(task.id, !isChecked)

    onDeleteTask(task.id)
  }

  // Adiciona o estilo caso a tarefa seja marcada
  const styleCheckedComment = () => {
    return isChecked ? styles.checkedTask : styles.task
  }

  return (
    <div className={styles.containerTask}>
      <span className={styles.containerChekbox}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxClick}
        />
      </span>
      <span className={styleCheckedComment()}>{content}</span>
      <button onClick={handleDeleteTask} className={styles.trasher}>
        <Trash size={24} />
      </button>
    </div>
  )
}
