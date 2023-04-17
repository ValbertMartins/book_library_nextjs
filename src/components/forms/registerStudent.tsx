import Input from "antd/lib/input"
import Select from "antd/lib/select"

interface Props {}

const RegisterStudentForm = ({}: Props) => {
  return (
    <div className="my-10 flex flex-col gap-5">
      <Input
        placeholder="Nome"
        allowClear
      />
      <Select
        placeholder="Selecione"
        options={[
          { value: "F", label: "Feminino" },
          { value: "M", label: "Masculino" },
        ]}
      />
      <Input placeholder="Turma" />
      <Input placeholder="Série" />
    </div>
  )
}

export default RegisterStudentForm
