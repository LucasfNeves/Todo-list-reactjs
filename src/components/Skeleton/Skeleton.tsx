import styles from './styles.module.css'

export function Skeleton() {
  return (
    <>
      <header className={styles.containerHeader}>
        <div className={styles.headerContent}>
          <div className={styles.logoutContent}>
            <div></div>
            <div className={styles.title}></div>
            <div title="sair" className={styles.buttonLogout} />
          </div>
          <form>
            <div className={styles.inputTask} />
            <div title="Adicionar Tarefa" className={styles.buttonAddTask} />
          </form>
        </div>
      </header>
      <div className={styles.containerToDoList}>
        <main className={styles.container} />
      </div>
    </>
  )
}
