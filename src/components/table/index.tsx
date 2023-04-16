import { Student } from "@/interfaces"

interface Props {
  sourceData: Student[]
}
const Table = ({ sourceData }: Props) => {
  return (
    <div className="border-x border-t border-zinc-100 bg-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-4  gap-[1px] bg-zinc-100">
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Nome</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Classe</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Ano</p>
        </div>
        <div className=" bg-primary-color">
          <p className="ml-4 my-4 font-bold">Gênero</p>
        </div>
      </div>

      {sourceData.map(student => (
        <div
          key={student.id}
          className="grid grid-cols-4 gap-[1px] cursor-pointer bg-zinc-100 group"
        >
          <div className=" bg-white mb-[1px] group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.name}</p>
          </div>
          <div className=" bg-white mb-[1px]  group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.class_letter}</p>
          </div>
          <div className=" bg-white mb-[1px]  group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.class_age}</p>
          </div>
          <div className=" bg-white mb-[1px]  group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.gender}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Table
