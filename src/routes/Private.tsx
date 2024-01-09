import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router'

import { auth } from '../firebaseConection'
import { onAuthStateChanged } from 'firebase/auth'
import { Skeleton } from '../components/Skeleton/Skeleton'

interface PrivateProps {
  children: ReactNode
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    async function verifyUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          }

          localStorage.setItem('@detailUser', JSON.stringify(userData))

          setLoading(false)
          setSigned(true)
        } else {
          setSigned(false)
          setLoading(false)
        }
      })
    }

    verifyUser()
  }, [])

  if (loading) {
    return <Skeleton />
  }

  if (!signed) {
    return <Navigate to="/" />
  }

  return children
}
