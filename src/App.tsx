import './Global.css'
import { BrowserRouter } from 'react-router-dom'
import { RoutesApp } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <RoutesApp />
    </BrowserRouter>
  )
}
