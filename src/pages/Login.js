import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { auth } from '../firebase'

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    function onRegister() {
      signInWithEmailAndPassword(auth, email, password).catch((error) => console.log(error))

      navigate('/')
    }

    onRegister()
  }

  return (
      <div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
      </div>
  )
}

export default Login