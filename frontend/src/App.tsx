import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Books from './pages/Books'
import Audits from './pages/Audits'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Books />} />
          <Route path="audits" element={<Audits />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App