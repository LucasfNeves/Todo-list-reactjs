import { ChangeEventHandler, FormEventHandler } from 'react'
import styles from './Header.module.css'
import LogoMain from '../../assets/LogoMain.svg'
import { auth } from './../../firebaseConection'
import { signOut } from 'firebase/auth'
import { CheckCircle, PlusCircle, SignOut } from 'phosphor-react'
import { Todo } from '../../pages/Admin'

interface HeaderProps {
  change: ChangeEventHandler<HTMLInputElement>
  value: string
  submit: FormEventHandler<HTMLFormElement>
  onInvalid: FormEventHandler<HTMLInputElement>
  edit: object | Todo
  tasks: Todo[]
}

export function Header({
  change,
  value,
  submit,
  onInvalid,
  edit,
}: HeaderProps) {
  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <header className={styles.containerHeader}>
      <div className={styles.headerContent}>
        <div className={styles.logoutDiv}>
          <button
            title="sair"
            onClick={handleLogout}
            className={styles.buttonLogout}
          >
            Sair
            <SignOut size={20} weight="fill" />
          </button>
        </div>
        <h1 className={styles.title}>
          <img src={LogoMain} alt="" />
          Tarefas
        </h1>

        <form onSubmit={submit}>
          <input
            onInvalid={onInvalid}
            onChange={change}
            value={value}
            className={styles.inputTask}
            type="text"
            placeholder="Adicione uma nova tarefa"
            id="inputTask"
            autoComplete="off"
            required
          />
          {Object.keys(edit).length > 0 ? (
            <button title="Editar Tarefa" className={styles.buttonAddTask}>
              <span className={styles.textButton}>Editar</span>
              <CheckCircle size={20} weight="bold" />
            </button>
          ) : (
            <button title="Adicionar Tarefa" className={styles.buttonAddTask}>
              <span className={styles.textButton}>Adicionar</span>
              <PlusCircle size={20} weight="bold" />
            </button>
          )}
        </form>
      </div>
    </header>
  )
}
