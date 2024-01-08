import { Routes, Route } from 'react-router-dom'

import { Admin } from '../pages/Admin'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'

import { Private } from './Private'

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <Private>
            <Admin />
          </Private>
        }
      />
    </Routes>
  )
}
