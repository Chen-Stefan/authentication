import axios from 'axios'
import React, { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const login = () => {
    axios.post('http://localhost:5000/login', {
      username,
      password
    }, {
      withCredentials: true
    }).then(res => {
      if (res.data === 'Authentication Successful') {
        window.location.href = '/'
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)}/>
      <input type="text" placeholder='password' onChange={e => setPassword(e.target.value)}/>
      <button onClick={login}>Login</button>
      <button>Get logged in users</button>
    </div>
  )
}
