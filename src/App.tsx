import './Global.css'
import styles from './App.module.css'
import { ContainerTask } from './components/ContainerTask/ContainerTask'
export function App() {
 
  return (
    <>
      <div className={styles.wrapper}>
        <ContainerTask/>
      </div>
    </>
  )
}


