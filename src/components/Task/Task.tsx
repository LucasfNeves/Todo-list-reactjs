import { useState } from 'react';
import styles from './Task.module.css';
import { Trash } from 'phosphor-react';

export function Task() {

    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckboxClick = () => {
      setIsChecked(!isChecked);
    };

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
        <span className={styleCheckedComment()}> 
            Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuárioTarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário Tarefa do usuário
        </span>
        <button className={styles.trasher}>
            <Trash size={24}  />
        </button>
    </div>
  );
}
