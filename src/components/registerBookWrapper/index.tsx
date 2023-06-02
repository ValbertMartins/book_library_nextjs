import { Book, FormBookInputFields } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import { Dispatch, SetStateAction, useState } from "react"
import { registerBook } from "@/services/api/book"
import Image from "next/image"
import BookForm from "../forms/Book"
import message from "antd/lib/message"
const coverPreviewPlaceholder = "/book_cover_placeholder.png"

interface Props {
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const RegisterBookWrapper = ({ setBookList }: Props) => {
  const [openModalRegisterBook, setOpenModalRegisterBook] = useState(false)
  const [coverPreview, setCoverPreview] = useState<File | string>(coverPreviewPlaceholder)
  const [toast, toastContextHolder] = message.useMessage()

  async function handleSubmitFormregisterBook(formBookInputFields: FormBookInputFields) {
    toast.open({
      content: "Cadastrando livro",
      type: "loading",
      duration: 0,
    })
    const { ok, bookListUpdated } = await registerBook(formBookInputFields)
    if (ok && bookListUpdated) {
      toast.destroy()
      message.success("Livro cadastrado com sucesso.")
      setOpenModalRegisterBook(false)
      setBookList(bookListUpdated)
      setCoverPreview(coverPreviewPlaceholder)
    } else {
      toast.destroy()
      message.error("Não foi possível cadastrar o livro, tente novamente")
    }
  }

  return (
    <>
      <button
        className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all "
        onClick={() => setOpenModalRegisterBook(true)}
      >
        Cadastrar novo livro
      </button>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Cadastrar novo livro</h1>}
        open={openModalRegisterBook}
        width={1000}
        footer={null}
        destroyOnClose
        onCancel={() => {
          setCoverPreview(coverPreviewPlaceholder)
          setOpenModalRegisterBook(false)
        }}
      >
        <div className="grid grid-cols-2 gap-x-10">
          <BookForm
            setCoverPreview={setCoverPreview}
            handleSubmitForm={handleSubmitFormregisterBook}
          />

          <div className="rounded-md overflow-hidden">
            <Image
              width={240}
              height={340}
              className="w-full h-full"
              src={
                typeof coverPreview == "string"
                  ? coverPreview
                  : URL.createObjectURL(coverPreview)
              }
              alt=""
            />
          </div>
        </div>
        {toastContextHolder}
      </ModalAntd>
    </>
  )
}

export default RegisterBookWrapper
