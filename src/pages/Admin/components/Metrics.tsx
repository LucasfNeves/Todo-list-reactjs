import styles from './metrics.module.css'

interface MetricsProps {
  countTasks: number
  countTaskCompleted: number
}

export function Metrics({ countTasks, countTaskCompleted }: MetricsProps) {
  return (
    <header className={styles.header}>
      <span className={styles.tasksMetrics}>
        <span className={styles.tasksMetricsLegend}>Tarefas</span>
        <span className={styles.tasksMetricsNumber}>{countTasks}</span>
      </span>
      <span className={styles.tasksMetrics}>
        <span className={styles.tasksMetricsLegend}>Concluídas</span>
        <span className={styles.tasksMetricsNumber}>{countTaskCompleted}</span>
      </span>
    </header>
  )
}
