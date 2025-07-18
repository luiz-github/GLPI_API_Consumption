import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Ticket from './pages/ticket'
// import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/ticket" element={<Ticket />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
