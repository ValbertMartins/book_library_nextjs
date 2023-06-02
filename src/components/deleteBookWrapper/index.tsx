import { Book } from "@/interfaces"
import Popconfirm from "antd/lib/popconfirm"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { deleteBook } from "@/services/api/book"
import message from "antd/lib/message"

interface Props {
  book: Book
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const DeleteBookWrapper = ({ setBookList, book }: Props) => {
  const [warningBookMessage, setWarningBookMessage] = useState<string | null>(null)

  useEffect(() => {
    if (book.quantity_available !== book.quantity) {
      setWarningBookMessage("Esse livro não pode ser deletado, existe alunos com ele.")
    }
  }, [])

  async function handlerDeleteBook() {
    const { ok, bookListUpdated } = await deleteBook(book.id)
    if (ok && bookListUpdated) {
      setBookList(bookListUpdated)
      message.success("Livro deletado com sucesso")
    }
  }
  return (
    <Popconfirm
      title="Tem certeza que deseja excluir esse livro?"
      placement="left"
      okText="Excluir"
      cancelText="Cancelar"
      description={
        warningBookMessage && (
          <p className="text-red-500 font-semibold mr-2">{warningBookMessage}</p>
        )
      }
      okButtonProps={{
        danger: true,
        disabled: !!warningBookMessage,
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
