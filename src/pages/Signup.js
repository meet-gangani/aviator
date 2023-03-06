import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { ref, set } from 'firebase/database'

const SignUp = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    function onRegister() {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        set(ref(db, 'users/' + userCredential.user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email
        })
      }).catch((error) => console.log(error))
      navigate('/')
    }

    onRegister()
  }

  return (
      <div>
        <form className="signupForm" onSubmit={handleSubmit}>
          <input
              placeholder="first name"
              onChange={(e) => setFirstName(e.target.value)}
              required
          />
          <input
              placeholder="last name"
              onChange={(e) => setLastName(e.target.value)}
              required
          />
          <input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
          />
          <input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
          />
          <button>Sign Up</button>
        </form>
      </div>
  )
}

export default SignUp