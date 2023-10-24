import styles from './Task.module.css';

export function Task() {
 
  return (
    <div className={styles.containerTask}>
       
        <span className={styles.containerChekbox}>
            <input type="checkbox" />
        </span>
        <span className={styles.task}> 
            Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuárioTarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário
        </span>
    </div>
  );
}
