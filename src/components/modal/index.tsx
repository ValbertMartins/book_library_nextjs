import React, { Dispatch, SetStateAction, useState } from "react"
import ModalAntd from "antd/lib/modal"
import Input from "antd/lib/input"
import Select from "antd/lib/select"

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  openModal: boolean
}

const Modal = ({ openModal, setOpenModal }: Props) => {
  return (
    <ModalAntd
      title={<h1 className="font-bold text-xl">Cadastrar estudante</h1>}
      open={openModal}
      onCancel={() => setOpenModal(false)}
    >
      <div className="my-10 flex flex-col gap-5">
        <Input placeholder="Nome" />
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
    </ModalAntd>
  )
}

export default Modal
