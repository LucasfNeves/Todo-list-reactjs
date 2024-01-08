import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useState,
  useEffect,
} from 'react'
import { Task } from '../../components/Task/Task'
import styles from './styles.module.css'
import { Header } from '../../components/HeaderInput/Header'
import Clipboard from '../../assets/Clipboard.svg'
import { Metrics } from './components/Metrics'

import { db } from '../../firebaseConection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore'

export type Todo = {
  content: string
  id: string
  completed: boolean
  userUid: string
}

export function Admin() {
  const [tasks, setTasks] = useState<Todo[]>([])
  const [newTasks, setNewTasks] = useState('')
  const [user, setUser] = useState<{ uid: string } | null>(null)
  const [edit, setEdit] = useState<Todo[] | object>({})

  const initialMessageAppears = tasks.length === 0

  const countTasks = tasks.length
  const countTaskCompleted = tasks.filter((task) => task.completed).length

  useEffect(() => {
    async function loadTasks() {
      const userDatail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDatail || '{}'))

      if (userDatail) {
        const data = JSON.parse(userDatail || '{}')

        const taskRef = collection(db, 'tasks')
        const q = query(
          taskRef,
          where('uid', '==', data.uid), // Filtra as tarefas pelo uid do usuário
          orderBy('createdAt', 'desc'),
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const tasksList: Todo[] = []

          querySnapshot.forEach((doc) => {
            tasksList.push({
              id: doc.id,
              content: doc.data().content,
              completed: doc.data().completed,
              userUid: doc.data().uid,
            })
          })
          setTasks(tasksList)
        })
        return () => unsubscribe()
      }
    }

    loadTasks()
  }, [tasks])

  // Adiciona um novo comentário e matém os comentários existentes
  async function handleCreatNewTask(event: FormEvent) {
    event.preventDefault()

    if (newTasks.trim() === '') {
      alert('Digite sua tarefa')
      return
    }

    if ((edit as Todo)?.id) {
      handleUpdateTask()
      return
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        content: newTasks,
        completed: false,
        uid: user?.uid,
        createdAt: new Date(),
      })

      console.log('Tarefa salva com sucesso')
      setNewTasks('')
    } catch (error) {
      console.log(`Erro ao salvar a tarefa: ${error}`)
    }
  }

  async function editTaks(item: Todo) {
    setNewTasks(item.content)
    setEdit(item)
  }

  async function handleUpdateTask() {
    const docRef = doc(db, 'tasks', (edit as Todo).id)

    await updateDoc(docRef, {
      content: newTasks,
    })
      .then(() => {
        console.log('Documento atualizado com sucesso!')
        setNewTasks('')
        setEdit({})
      })
      .catch((error) => {
        console.log(`Erro ao atualizar o documento: ${error}`)
        setNewTasks('')
        setEdit({})
      })
  }

  // Controla o estado de completed da Task
  async function handleToggleCompleted(taskToToggle: Todo) {
    const docRef = doc(db, 'tasks', taskToToggle.id)

    await updateDoc(docRef, {
      completed: taskToToggle.completed !== true,
    })
      .then(() => {
        console.log('Documento atualizado com sucesso!')
      })
      .catch((error) => {
        console.log(`Erro ao atualizar o documento: ${error}`)
      })
  }

  // Monitora as mudanças no Input
  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTasks(event.target.value)
  }

  function handleNewInvalidTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  return (
    <>
      <Header
        submit={handleCreatNewTask}
        change={handleNewCommentChange}
        value={newTasks}
        onInvalid={handleNewInvalidTask}
        edit={edit}
      />
      <div className={styles.containerToDoList}>
        <main className={styles.container}>
          <Metrics
            countTasks={countTasks}
            countTaskCompleted={countTaskCompleted}
          />

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
                    editTaks={editTaks}
                    task={task}
                    key={task.id}
                    content={task.content}
                    onToggleCompleted={() => handleToggleCompleted(task)}
                  />
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

/**
 * Português: Funções quando a persistência de dados era feita com o LocalStorage, posteriormente foi substituída pelo Firebase
 * English: Functions when data persistence was done with LocalStorage, later it was replaced by Firebase
 *
 * 
  function handleCreatNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = { id: randomUUID(), content: newTasks, completed: false }

    const updatedTasks = [...tasks, newTask]
    handleSaveTasks(updatedTasks)
    setTasks(updatedTasks)
    setNewTasks('')
  }

  function handleSaveTasks(updatedTasks: Todo[]) {
    TodosStorage.save(updatedTasks)
  }

  function removeTaskFromStorage(taskToRemove: Todo) {
    const savedTasks = TodosStorage.get()
    const updatedTasks = savedTasks.filter(
      (task) => task.id !== taskToRemove.id,
    )
    TodosStorage.save(updatedTasks)
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
  


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('TODOS') || '[]')

    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks)
    } else {
      setTasks([])
    }
  }, [])
 */
