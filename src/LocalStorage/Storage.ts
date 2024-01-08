import { Todo } from '../pages/Admin'

const KEY = 'TODOS'

function save(todos: Todo[]) {
  localStorage.setItem(KEY, JSON.stringify(todos))
}

function get(): Todo[] {
  const todos = localStorage.getItem(KEY)
  return todos ? JSON.parse(todos) : []
}

// function clearAll() {
//   localStorage.removeItem(KEY);
// }

export const TodosStorage = {
  save,
  get,
}
