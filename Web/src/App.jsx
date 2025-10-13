import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLogin } from './MainLogin'
import { StudentSignUp } from './login&signup/StudentSignUp'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './store/store'
import { Home } from './Home'

function App() {
  return (
    <>
  <Provider store={store}>
  <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          // outer toast container styling (glass + color by type)
          toastClassName={({ type }) =>
            // base glassmorphism
            `backdrop-blur-md border rounded-md p-3 m-2 shadow-lg max-w-lg w-full ` +
            // color by toast type
            (type === 'error'
              ? 'bg-red-600/40 border-red-400'
              : type === 'success'
              ? 'bg-green-600/40 border-green-400'
              : 'bg-blue-600/40 border-gray-200')
          }
          // body (text area) styling; white text for colored backgrounds
          bodyClassName={({ type }) => (type === 'error' || type === 'success' ? 'text-white p-3' : 'text-black p-3')}
        />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<MainLogin />} />
            <Route path='/studentsignup' element={<StudentSignUp />} />
          </Routes>
  </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
