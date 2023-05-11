import { deleteStudent } from "@/utils/handlerStudent"
import { Book, Student } from "@/interfaces"
import Popconfirm from "antd/lib/popconfirm"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import axios from "axios"

interface Props {
  book: Book
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const DeleteBookWrapper = ({}: Props) => {
  async function handlerDeleteBook() {}
  return (
    <Popconfirm
      title="Tem certeza que deseja excluir esse livro?"
      placement="left"
      okText="Excluir"
      cancelText="Cancelar"
      okButtonProps={{
        danger: true,
      }}
      onConfirm={handlerDeleteBook}
    >
      <button>
        <MdDelete
          size={25}
          className="text-red-600"
        />
      </button>
    </Popconfirm>
  )
}

export default DeleteBookWrapper
