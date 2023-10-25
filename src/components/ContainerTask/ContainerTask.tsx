import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Task } from '../Task/Task'
import styles from './ContainerTask.module.css'
import { Header } from '../HeaderInput/Header'


export function ContainerTask() {

    const [tasks, setTasks] = useState<string[]>([])
    const [newTasks, setNewTasks] = useState('')
    const [countCompletedTask, setCountCompletedTask] = useState(0)

    // Adiciona um novo comentário e matém os comentários existentes
    function handleCreatNewTask (event: FormEvent) {
        event.preventDefault();

        setTasks([...tasks, newTasks])
        setNewTasks('')
    }

    // Monitora as mudanças no Input
    function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("");
        setNewTasks(event.target.value)
        
    }

    // Deletar tarefa 
    function deleteTask (taskToDeleted: string) {
        const tasksWithoutTaskToDelete = tasks.filter(task => {
            return task !== taskToDeleted
        })

        // Faz alterações nas tarefas criadas
        setTasks(tasksWithoutTaskToDelete); 
    }

    function handleNewInvalidTask(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity("Esse campo é obrigatório");
    }

    // Aparecer a mensagem inicial se stiver sem nenhum comentário
    const initialMessageAppears = tasks.length === 0;

    const countTasks = tasks.length

    // Modifica o contador de tarefas concluídas
    function updateCountCompletedTask(isChecked: boolean){
        !isChecked ? setCountCompletedTask(countCompletedTask + 1) : setCountCompletedTask(countCompletedTask - 1)
    }

    return(
        <section className= {styles.sectionToDoList}>
            <Header
                submit = {handleCreatNewTask}
                change= {handleNewCommentChange}
                value= {newTasks}
                onInvalid= {handleNewInvalidTask}
            />
            <div className={styles.container}>
                <header className={styles.header}>
                    <span className={styles.tasksMetrics}>
                        <span className={styles.tasksMetricsLegend}>
                            Tarefas
                        </span>
                        <span className={styles.tasksMetricsNumber} >
                            {countTasks}
                        </span>
                    </span>
                    <span className={styles.tasksMetrics}>
                        <span className={styles.tasksMetricsLegend}>
                            Concluídas
                        </span>
                        <span className={styles.tasksMetricsNumber}>
                            {countCompletedTask}
                        </span>
                    </span>
                </header>
                { initialMessageAppears && (
                    <div className={styles.containerInitialMensagem}>
                    <div>
                        <img src="src/assets/Clipboard.svg" alt="Clipboard" />
                    </div>
                    <div className={styles.InitialMensagemLegend}>
                        <p>Você ainda não tem tarefas cadastradas</p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                </div>
                )}
                <section className={styles.sectionTask}>
                    <div className={styles.containerTask}>
                        {tasks.map(task => {
                            return (
                                <Task
                                    key={task}
                                    content={task}
                                    onDeleteTask = {deleteTask}
                                    updateCountCompletedTask = {updateCountCompletedTask}
                                />
                            )
                        })}
                    </div>
                </section>
            </div>
        </section>
    )
}