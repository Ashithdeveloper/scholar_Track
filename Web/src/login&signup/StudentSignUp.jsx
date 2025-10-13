import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'

export const StudentSignUp = () => {
  const navigate = useNavigate()

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [institution, setInstitution] = useState('')
  const [category, setCategory] = useState('')
  const [caste, setCaste] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [percentage, setPercentage] = useState('')
  const [lasteducation, setLasteducation] = useState('')
  const [loading, setLoading] = useState(false)

  const options = {
    gender: ['male', 'female', 'other'],
    caste: ['SC/ST', 'General', 'OBC'],
    education: ['sslc', 'hsc', 'diploma', 'ug', 'pg', 'phd'],
    categories: ['Colleges', 'Schools'],
  }

  const validate = () => {
    if (!fullname) return 'Full name is required'
    if (!email) return 'Email is required'
    if (!gender) return 'Gender is required'
    if (!category) return 'Institution category is required'
    if (!institution) return 'Institution is required'
    if (!caste) return 'Caste is required'
    if (!phone) return 'Phone is required'
    if (phone.replace(/\D/g, '').length < 7) return 'Phone number is invalid'
    if (percentage === '') return 'Percentage is required'
    const pct = parseFloat(percentage)
    if (isNaN(pct) || pct < 0 || pct > 100) return 'Percentage must be between 0 and 100'
    if (!password) return 'Password is required'
    if (!lasteducation) return 'Last education is required'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) return toast.error(err)

    setLoading(true)
    const payload = {
      fullname: fullname.trim(),
      email: email.trim().toLowerCase(),
      gender,
      institution: institution.trim(),
      caste,
      phoneNumber: parseInt(phone.replace(/\D/g, ''), 10),
      percentage: parseFloat(percentage),
      password,
      category, 
      lasteducation, 
    }

    try {
      console.log('Signup payload:', payload);
      await client.apiPost('/api/user/studentsignup', payload)
      toast.success('Student registered successfully.', {
        onClose: () => navigate('/')
      })
    } catch (err) {
      const resp = err.response?.data || err.original?.response?.data
      console.error('Signup error:', resp || err)
      toast.error(resp?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center app-bg">
      <div className="w-full mx-4 p-4 sm:p-6 bg-white/70 rounded-md shadow font-serif max-w-md md:max-w-lg max-h-[90vh] overflow-auto no-scrollbar">
        <h3 className="text-xl font-semibold mb-4 text-center">Student Sign Up</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input
              value={fullname}
              onChange={e => setFullname(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              value={gender}
              onChange={e => setGender(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            >
              <option value="">Select gender</option>
              {options.gender.map(g => (
                <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Institution Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            >
              <option value="">Select category</option>
              {options.categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Institution</label>
            <input
              type="text"
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Type your institution name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Caste</label>
            <select
              value={caste}
              onChange={e => setCaste(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            >
              <option value="">Select caste</option>
              {options.caste.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              maxLength={10}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              value={percentage}
              onChange={e => {
                let value = e.target.value.replace('%', ''); // remove % if typed
                value = Number(value);
                if (isNaN(value)) value = 0;
                if (value < 0) value = 0;
                if (value > 100) value = 100;
                setPercentage(value);
              }}
              className="w-full mt-1 px-3 py-2 border rounded pr-10"
              placeholder="Enter your percentage"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Education</label>
            <select
              value={lasteducation}
              onChange={e => setLasteducation(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            >
              <option value="">Select</option>
              {options.education.map(e => (
                <option key={e} value={e}>{e.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? 'Submitting...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
