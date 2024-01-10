import { FormEvent, useState } from 'react'
import styles from './styles.module.css'

import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebaseConection'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Eye, EyeClosed } from 'phosphor-react'
import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    if (email !== '' && password !== '') {
      try {
        await createUserWithEmailAndPassword(auth, email, password)

        navigate('/admin', { replace: true })
        toast.success('Cadastro realizado com sucesso! Bem vindo(a)!')

        setLoading(false)
      } catch (error) {
        const errorCode = (error as FirebaseError).code
        if (errorCode === 'auth/weak-password') {
          toast.error('A senha deve ter pelo menos 6 caracteres.')
        } else if (errorCode === 'auth/email-already-in-use') {
          toast.error('Este e-mail já está em uso.')
        } else {
          toast.error('Ops! Algo deu errado.')
        }

        setLoading(false)

        console.log(error)
      }
    } else {
      toast.error('Preencha todos os campos')
      setLoading(false)
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Cadastre-se</h1>
      <span> Vamos criar sua conta !</span>

      <form className={styles.form} onSubmit={handleRegister}>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className={styles.labelWithButton}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <button type="button" onClick={handleShowPassword}>
            {showPassword ? (
              <Eye size={20} weight="bold" />
            ) : (
              <EyeClosed size={20} weight="bold" />
            )}
          </button>
        </label>
        <button className={styles.buttonLogin} type="submit">
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </form>
      <span className={styles.link}>
        Já possui uma conta?<Link to={'/'}>Faça o login!</Link>
      </span>
    </div>
  )
}
