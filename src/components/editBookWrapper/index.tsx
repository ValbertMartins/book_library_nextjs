import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import { Book, FormBookInputFields } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import Tooltip from "antd/lib/tooltip"
import message from "antd/lib/message"
import BookForm from "../forms/Book"
import { editBook } from "@/services/api/book"
import Image from "next/image"
const coverPreviewPlaceholder = "/book_cover_placeholder.png"

interface Props {
  book: Book
  setBookList: Dispatch<SetStateAction<Book[]>>
  page: number
  bookNameFilter: string
}

const EditBookWrapper = ({ book, setBookList, page, bookNameFilter }: Props) => {
  const [loadingCover, setLoadingCover] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()
  const [coverPreview, setCoverPreview] = useState<File | string>(coverPreviewPlaceholder)

  useEffect(() => {
    if (book.cover) {
      setCoverPreview(book.cover)
    }
  }, [])

  async function handleSubmitFormEditBook(formInputFields: FormBookInputFields) {
    toast.open({
      content: "Atualizando livro, aguarde...",
      type: "loading",
      duration: 0,
    })

    const { ok, bookListUpdated, error } = await editBook(
      { ...formInputFields },
      book.id,
      page,
      bookNameFilter
    )
    if (ok && bookListUpdated) {
      setBookList(bookListUpdated)
      toast.destroy()
      message.success("Livro atualizado com sucesso")
      setOpenModal(false)
    } else {
      toast.destroy()
      message.error(error?.message ? error.message : "Falha ao atualizar o livro")
    }
  }

  return (
    <>
      <Tooltip
        title="Editar"
        color="blue"
      >
        <button onClick={() => setOpenModal(true)}>
          <MdModeEditOutline
            size={25}
            className="text-blue-500"
          />
        </button>
      </Tooltip>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Atualizar Livro</h1>}
        open={openModal}
        onCancel={() => {
          setOpenModal(false)
        }}
        cancelText="Cancelar"
        centered
        destroyOnClose
        width={1000}
        footer={null}
      >
        <div className="grid grid-cols-2 gap-x-10 mt-10">
          <div className="rounded-xl overflow-hidden">
            <Image
              width={300}
              height={300}
              className={`h-full w-full ${
                loadingCover ? "blur-md scale-100" : "grayscale-0 blur-0 scale-100"
              }`}
              src={
                typeof coverPreview == "string"
                  ? coverPreview
                  : URL.createObjectURL(coverPreview)
              }
              onLoadingComplete={() => setLoadingCover(false)}
              alt=""
            />
          </div>
          <div>
            <h1 className="font-bold text-xl">Editar Livro</h1>
            <BookForm
              book={book}
              handleSubmitForm={handleSubmitFormEditBook}
              setCoverPreview={setCoverPreview}
            />
          </div>
        </div>

        {toastContextHolder}
      </ModalAntd>
    </>
  )
}

export default EditBookWrapper
