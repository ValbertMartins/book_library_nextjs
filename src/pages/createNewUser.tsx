import { useRouter } from "next/router"

const createNewUser = () => {
  const { pathname, asPath } = useRouter()

  return <div>createNewUser</div>
}

export default createNewUser
