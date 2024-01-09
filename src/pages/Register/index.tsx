import { FormEvent, useState } from 'react'
import styles from './styles.module.css'

import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebaseConection'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Eye, EyeClosed } from 'phosphor-react'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )

        const user = userCredential.user

        navigate('/', { replace: true })

        console.log(`Olá ${user?.email} !`)
      } catch (error) {
        alert(`Erro ao realizar cadastro ! ${error}`)
      }
    } else {
      alert('Preencha todos os campos !')
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
          Cadastrar
        </button>
      </form>
      <span className={styles.link}>
        Já possui uma conta?<Link to={'/'}>Faça o login!</Link>
      </span>
    </div>
  )
}
