import styles from './Header.module.css'

export function Header (){
    return(
        <>
            <header className={styles.containerHeader}>
                <h1 className={styles.title}>
                    <img src="src/assets/Logo-main.svg" />
                    Tarefas  
                </h1>
                <form id="form">
                    <input
                        className={styles.inputTask} 
                        type="text" 
                        autoComplete="off"
                        placeholder="Adicione uma nova tarefa" id="inputTask"
                    />
                    <button
                        title="Adicionar Tarefa"
                        className={styles.buttonAddTask}
                    > 
                        <span className={styles.textButton}>Adicionar</span>
                        <img src="src/assets/icon-add.svg" alt="Icon-add" />
                    </button>
                </form> 
            </header>
        </>
    )
}
    
