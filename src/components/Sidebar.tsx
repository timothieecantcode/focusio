import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="fixed w-50 h-full p-4 bg-[#E3EDF5]">
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
