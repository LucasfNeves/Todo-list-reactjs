import './Global.css'
import styles from './App.module.css'
import { Header } from './components/HeaderInput/Header'
import { ContainerTask } from './components/ContainerTask/ContainerTask'
export function App() {
 

  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
        <ContainerTask/>
      </div>
      
    </>
  )
}


