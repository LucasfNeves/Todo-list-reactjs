import { useState } from 'react';
import styles from './Task.module.css';
import { Trash } from 'phosphor-react';

interface TaskPorps {
  content: string;
  onDeleteTask: (content: string) => void;
  updateCountCompletedTask: (isChecked: boolean) => void;
} 

export function Task({content, onDeleteTask, updateCountCompletedTask}: TaskPorps) {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);

    // altera a contador de tarefas concluídas quando o checkbox for marcado
    updateCountCompletedTask(isChecked)
  };

  function handleDeleteTask() {

    console.log("deletar")
    onDeleteTask(content)

    // confere se o checkbox está marcado, se estiver ativa função exportada altera o número do contador "concluido" quando a task for deletada
    if (isChecked === true) {
      updateCountCompletedTask(isChecked)
    }

  }

  // Adiciona o estilo caso a tarefa seja marcada
  const styleCheckedComment = () => {
      return isChecked ? styles.checkedTask : styles.task;
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
        <span  className={styleCheckedComment()}> 
            {content}
        </span>
        <button 
          onClick={handleDeleteTask}
          className={styles.trasher}
        >
            <Trash size={24}  />
        </button>
    </div>
  );
}
