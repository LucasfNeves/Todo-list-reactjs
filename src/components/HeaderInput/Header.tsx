import { ChangeEventHandler, FormEventHandler } from 'react'
import styles from './Header.module.css'
import LogoMain from '../../assets/LogoMain.svg'
import IconAdd from '../../assets/IconAdd.svg'

interface HeaderProps {
  change: ChangeEventHandler<HTMLInputElement>
  value: string
  submit: FormEventHandler<HTMLFormElement>
  onInvalid: FormEventHandler<HTMLInputElement>
}

export function Header({ change, value, submit, onInvalid }: HeaderProps) {
  return (
    <>
      <header className={styles.containerHeader}>
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
            autoComplete="off"
            placeholder="Adicione uma nova tarefa"
            id="inputTask"
            required
          />
          <button title="Adicionar Tarefa" className={styles.buttonAddTask}>
            <span className={styles.textButton}>Adicionar</span>
            <img src={IconAdd} alt="" />
          </button>
        </form>
      </header>
    </>
  )
}
