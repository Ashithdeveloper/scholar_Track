import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'  // Axios wrapper

export const StudentLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) return setError('Email is required')
    if (!password) return setError('Password is required')

    try {
      const res = await client.apiPost('/api/user/login', { email, password })
      toast.success(res.message || 'Login successful', {
        onClose: () => navigate('/')
      })

      // ✅ Save token to localStorage
      if (res.token) {
        localStorage.setItem('token', res.token)
      }
    } catch (err) {
      const resp = err.response?.data || err.original?.response?.data
      console.error('Login error:', resp || err)
      toast.error(resp?.message || 'Login failed')
    }
  }

  return (
    <div className="m-4 p-10 font-serif bg-blue-100/50 rounded-md shadow-md flex flex-col items-stretch max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-3 text-center">Student Login</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="you@student.edu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="••••••••"
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex flex-col justify-center space-y-1.5">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
      </form>
      <button
        className="text-sm md:text-md mt-3 underline text-blue-600"
        onClick={() => navigate("/studentsignup")}
      >
        New Student Registration?
      </button>
    </div>
  )
}
