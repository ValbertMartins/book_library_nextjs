import { Book } from "@/interfaces"
import Image from "next/image"
import React, { Dispatch, SetStateAction, useState } from "react"

const coverPreviewPlaceholder = "/book_cover_placeholder.png"

interface Props {
  book: Book
  setBook: Dispatch<SetStateAction<Book | undefined>>
  setOpenModalBookDetails: Dispatch<SetStateAction<boolean>>
}
const Book = ({ book, setBook, setOpenModalBookDetails }: Props) => {
  const [coverLoading, setCoverLoading] = useState(true)
  return (
    <div
      onClick={() => {
        setOpenModalBookDetails(true)
        setBook(book)
      }}
      className="cursor-pointer"
    >
      <div className=" rounded-xl overflow-hidden aspect-[1/1.3]">
        <Image
          className={`object-cover h-full w-full  duration-700 ease-in-out ${
            coverLoading ? "blur-xl scale-110" : " blur-0 scale-100"
          }`}
          width={300}
          height={100}
          priority
          src={book.cover ? book.cover : coverPreviewPlaceholder}
          onLoadingComplete={() => setCoverLoading(false)}
          alt={`Capa do livro ${book.name} `}
        />
      </div>

      <div className="mt-2">
        <p className="font-bold px-1 text-sm">{book.name}</p>
        <p className="px-1 text-xs text-slate-400 my-1">Quantidade: {book.quantity}</p>
        <p
          className={`px-1 text-xs ${
            book.quantity_available === 0 ? "text-red-500" : " text-slate-400"
          }`}
        >
          Disponível: {book.quantity_available}
        </p>
      </div>
    </div>
  )
}

export default Book
