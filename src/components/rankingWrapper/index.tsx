import { Student } from "@/interfaces"
import { getStudentRankingList } from "@/services/api/student"
import Drawer from "antd/lib/drawer"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AiOutlineTrophy } from "react-icons/ai"
import { MdPerson } from "react-icons/md"
import Loading from "../loading"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

interface Props {
  openDrawerRanking: boolean
  setOpenDrawerRanking: Dispatch<SetStateAction<boolean>>
}

const RankingWrapper = ({ openDrawerRanking, setOpenDrawerRanking }: Props) => {
  const [studentsRankingList, setStudentsRankingList] = useState<Student[] | null>(null)
  const [loading, setLoading] = useState(true)
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)
  useEffect(() => {
    async function getStudentRanking() {
      const { ok, studentsRankingList, error } = await getStudentRankingList()
      if (ok && studentsRankingList) {
        setStudentsRankingList(studentsRankingList)
      } else {
        // console.log(error)
        error?.status === 401 && handlerInauthorizedUserRequest()
      }
      setLoading(false)
    }

    getStudentRanking()
  }, [])

  return (
    <Drawer
      open={openDrawerRanking}
      onClose={() => setOpenDrawerRanking(false)}
      closable={false}
      title={<p>Ranking de leitura</p>}
      destroyOnClose
      bodyStyle={{
        padding: 0,
      }}
    >
      {loading ? (
        <Loading>Carregando lista</Loading>
      ) : (
        studentsRankingList?.map((student, index) => (
          <div
            key={student.id}
            className={` bg-white rounded-lg mb-4 flex items-center justify-between py-3 cursor-pointer  transition-colors px-6 my-2 hover:bg-primary-color ${
              index + 1 == 1 && "bg-slate-50 hover:bg-slate-50"
            }`}
          >
            <div className="flex">
              <div className={` bg-blue-300 rounded-full p-3 mr-3`}>
                <MdPerson
                  size={22}
                  color="#FFF"
                />
              </div>
              <div>
                <p className="font-bold">{student.name}</p>
                <p className="text-xs text-slate-400">{index + 1}° Lugar</p>
              </div>
            </div>
            <div className="text-slate-400 flex gap-x-2">
              <p> {student.studentProgress.returned_books} Livros</p>
              {index + 1 == 1 && <AiOutlineTrophy size={20} />}
            </div>
          </div>
        ))
      )}
    </Drawer>
  )
}

export default RankingWrapper
