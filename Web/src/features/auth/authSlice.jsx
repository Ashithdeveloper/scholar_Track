import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../api/client'

// Get token from localStorage if present
const tokenFromStorage = localStorage.getItem('token')

// Async thunks
export const signupUser = createAsyncThunk('auth/signup', async (payload, thunkAPI) => {
  try {
    const res = await client.apiPost('/api/user/signup', payload)
    return res
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || 'Signup failed')
  }
})

export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const res = await client.apiPost('/api/user/login', payload)
    return res
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || 'Login failed')
  }
})

const initialState = {
  user: null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setUser(state, action) {
      // optional: use if you want to set user after page reload
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user || null
        state.token = action.payload.token || null
        if (action.payload.token) localStorage.setItem('token', action.payload.token)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user || null
        state.token = action.payload.token || null
        if (action.payload.token) localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
