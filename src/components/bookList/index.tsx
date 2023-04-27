import { Book } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
interface Props {
  bookList: Book[]
}

const BookList = ({ bookList }: Props) => {
  const [imagesLoading, setImagesLoading] = useState(true)
  return (
    <div className="mx-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  md:gap-x-4 md:gap-y-10 xl:grid-cols-5  overflow-y-scroll max-h-[65vh]">
      {bookList.map(book => (
        <Link
          href={`book/${book.id}`}
          key={book.id}
          className=" flex flex-col"
        >
          <div className="h-[260px] sm:h-[250px] lg:h-[300px] xl:h-[320px] 2xl:h-[380px]  rounded-xl overflow-hidden ">
            <Image
              className={`object-cover h-full w-full ${
                imagesLoading ? "blur-md scale-100" : "grayscale-0 blur-0 scale-100"
              }`}
              width="300"
              height="0"
              priority
              src={
                book.cover
                  ? book.cover
                  : "https://cdn.awsli.com.br/600x450/1769/1769402/produto/152246068e0860e4b77.jpg"
              }
              onLoadingComplete={() => setImagesLoading(false)}
              alt={`Capa do livro ${book.name} `}
            />
          </div>

          <div>
            <p className="font-bold px-1 pt-1 text-sm">{book.name}</p>
            <p className="px-1 text-xs text-slate-400">
              Quantidade: {book.quantity_available}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BookList
