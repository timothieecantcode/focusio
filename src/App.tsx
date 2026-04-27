import Sidebar from '@/components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from '@/pages/Dashboard'
import Tasks from '@/pages/Tasks'

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar (always visible) */}
      <Sidebar />

      {/* Main content changes based on route */}
      <div className="flex-1 flex flex-col p-6 ml-55">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
