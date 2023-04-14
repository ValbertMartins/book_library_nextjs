import { MdPersonAdd, MdDashboard, MdBookmarkAdd, MdPersonSearch } from "react-icons/md"
import Link from "next/link"
import { useRouter } from "next/router"

const menuItens = [
  {
    path: "/",
    icon: (color: string) => (
      <MdDashboard
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },

  {
    path: "/registerStudent",
    icon: (color: string) => (
      <MdBookmarkAdd
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },
  {
    path: "/listStudents",
    icon: (color: string) => (
      <MdPersonSearch
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },
  {
    path: "/registerBook",
    icon: (color: string) => (
      <MdPersonAdd
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <section className="p-6 flex flex-col gap-5">
      {menuItens.map(menuItem => (
        <Link
          href={menuItem.path}
          key={menuItem.path}
        >
          {menuItem.path === pathname
            ? menuItem.icon("text-cyan-500")
            : menuItem.icon("text-slate-300")}
        </Link>
      ))}
    </section>
  )
}

export default Navbar
