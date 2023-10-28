import './styles/Global.css'
import styles from './styles/App.module.css'
import { ContainerTask } from './pages/ContainerTask/ContainerTask'
export function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <ContainerTask />
      </div>
    </>
  )
}
