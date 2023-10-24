import styles from './ContainerTask.module.css'

export function ContainerTask() {
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.tasksMetrics}>
                    <span className={styles.tasksMetricsLegend}>
                        Total de Tarefas
                    </span>
                    <span className={styles.tasksMetricsNumber} >
                        00
                    </span>
                </span>
                <span className={styles.tasksMetrics}>
                    <span className={styles.tasksMetricsLegend}>
                        Concluídas
                    </span>
                    <span className={styles.tasksMetricsNumber}>
                        00
                    </span>
                </span>
            </header>
            <section className={styles.containerTask}>
                <div>
                    <img src="src/assets/Clipboard.svg" alt="Clipboard" />
                </div>
                <div className={styles.containerTaskLegend}>
                    <p>Você ainda não tem tarefas cadastradas</p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            </section>
        </div>
    )
}