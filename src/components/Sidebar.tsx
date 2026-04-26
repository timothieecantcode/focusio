import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="w-50 border-r p-4">
      <h1 className="text-xl font-bold">Focusio</h1>

      <div className="mt-6 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block cursor-pointer ${isActive ? 'font-semibold' : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `block cursor-pointer ${isActive ? 'font-semibold' : ''}`
          }
        >
          Tasks
        </NavLink>
      </div>
    </div>
  )
}
