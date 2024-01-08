import { useState } from 'react'
import styles from './Task.module.css'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { Todo } from '../../pages/Admin'
import { db } from '../../firebaseConection'
import { doc, deleteDoc } from 'firebase/firestore'

interface TaskPorps {
  task: Todo
  content: string
  onToggleCompleted: (id: string, completed: boolean) => void
  editTaks: (task: Todo) => void
}

export function Task({
  task,
  content,
  onToggleCompleted,
  editTaks,
}: TaskPorps) {
  const [isChecked, setIsChecked] = useState(task.completed)

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked)
    onToggleCompleted(task.id, !isChecked)
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, 'tasks', id)

    try {
      await deleteDoc(docRef)
      console.log('Documento deletado com sucesso!')
      if (isChecked) onToggleCompleted(task.id, !isChecked)
    } catch (error) {
      console.log(error)
    }
  }

  // Adiciona o estilo caso a tarefa seja marcada
  const styleCheckedComment = () => {
    return isChecked ? styles.checkedTask : styles.task
  }

  return (
    <article key={task.id} className={styles.containerTask}>
      <span className={styles.containerChekbox}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxClick}
        />
      </span>
      <span className={styleCheckedComment()}>{content}</span>
      <div className={styles.containerButton}>
        <button
          title="editar"
          type="button"
          className={styles.edit}
          onClick={() => editTaks(task)}
        >
          <PencilSimpleLine size={20} weight="bold" />
        </button>
        <button
          type="button"
          title="excluir"
          className={styles.trasher}
          onClick={() => handleDeleteTask(task.id)}
        >
          <Trash size={20} weight="bold" />
        </button>
      </div>
    </article>
  )
}

/**
 * Português: Funções quando a persistência de dados era feita com o LocalStorage, posteriormente foi substituída pelo Firebase
 * English: Functions when data persistence was done with LocalStorage, later it was replaced by Firebase
 *
 * 

  function handleDeleteTask() {
    console.log('deletar')

    if (isChecked) onToggleCompleted(task.id, !isChecked)

    onDeleteTask(task.id)
  }
 */
