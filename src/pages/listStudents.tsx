import { useRouter } from "next/router"

const ListStudents = () => {
  const { pathname, asPath } = useRouter()

  return <div>ListStudents</div>
}

export default ListStudents
