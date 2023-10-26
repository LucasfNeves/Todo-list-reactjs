import { useState } from 'react';
import styles from './Task.module.css';
import { Trash } from 'phosphor-react';

interface TaskPorps {
  content: string;
  onDeleteTask: (content: string) => void;
  updateCountCompletedTask: (isChecked: boolean) => void;
  key: number;
} 

export function Task({content, onDeleteTask, updateCountCompletedTask, key}: TaskPorps) {

  const [isChecked, setIsChecked] = useState(false);


  function handleDeleteTask() {
    console.log("deletar")

    onDeleteTask(content)

    if (isChecked === true) {
      updateCountCompletedTask(isChecked)
    }
  }
    
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    updateCountCompletedTask(isChecked)
  };

  // Adiciona o estilo caso a tarefa seja marcada
  const styleCheckedComment = () => {
      return isChecked ? styles.checkedTask : styles.task;
  }
    
  return (
    <div key={key} className={styles.containerTask}>
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
