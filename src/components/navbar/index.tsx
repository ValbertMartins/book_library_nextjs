import { MdSpaceDashboard, MdPersonSearch, MdLibraryBooks, MdMenuBook } from "react-icons/md"
import Link from "next/link"
import { useRouter } from "next/router"

const menuItens = [
  {
    path: "/",
    icon: (color: string) => (
      <MdSpaceDashboard
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },

  {
    path: "/listBooks",
    icon: (color: string) => (
      <MdMenuBook
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },
  {
    path: "/listStudents",
    icon: (color: string) => (
      <MdPersonSearch
        className={`${color} hover:text-cyan-500 transition-colors ml-1`}
        size={30}
      />
    ),
  },
]

const Navbar = ({ openNavbarMobile }: { openNavbarMobile?: boolean }) => {
  const { pathname } = useRouter()

  return (
    <section
      className={`bg-white fixed min-h-screen ${
        openNavbarMobile ? "translate-x-0" : "-translate-x-10"
      }  md:relative md:translate-x-0 opacity-100 md:opacity-100 transition-all flex items-center md:px-2 lg:px-6 flex-col gap-5 pt-10`}
    >
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
    // {openNavbarMobile && <div className="bg-black/30 flex-1 md:hidden " />}
  )
}

export default Navbar
