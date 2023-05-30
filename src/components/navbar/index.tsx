import { MdSpaceDashboard, MdPersonSearch, MdMenuBook, MdExitToApp } from "react-icons/md"
import Link from "next/link"
import { useRouter } from "next/router"

const menuItens = [
  {
    path: "/dashboard",
    icon: (color: string) => (
      <MdSpaceDashboard
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },

  {
    path: "/books",
    icon: (color: string) => (
      <MdMenuBook
        className={`${color} hover:text-cyan-500 transition-colors`}
        size={30}
      />
    ),
  },
  {
    path: "/students",
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
      }  md:relative md:translate-x-0 opacity-100 md:opacity-100 transition-all flex items-center md:px-2 lg:px-6 flex-col justify-between pt-10`}
    >
      <div className="flex flex-col items-center gap-5 ">
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
      </div>

      <div>
        <MdExitToApp
          className={`text-slate-300 hover:text-cyan-500 transition-colors ml-1 pb-10 cursor-pointer`}
          size={30}
        />
      </div>
    </section>
    // {openNavbarMobile && <div className="bg-black/30 flex-1 md:hidden " />}
  )
}

export default Navbar
