'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from '../ui/button'

type Props = {}

function AuthButton({}: Props) {

  const { logout } = useAuth()

  return (
    <Button onClick={logout}>Sign out</Button>
  )
}

export default AuthButton