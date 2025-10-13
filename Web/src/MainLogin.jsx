import React from 'react'
import { StudentLogin } from './login&signup/StudentLogin'

export const MainLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center app-bg">
      <h2 className="text-xl font-bold font-serif mb-4 text-center md:text-2xl text-white italic">Welcome to ScholarTrack</h2>
      <div className="p-6 bg-amber-50/30 rounded-lg shadow-lg backdrop-blur-md">
        <div className="flex flex-row justify-center">
          <StudentLogin />
        </div>
      </div>
    </div>
  )
}
