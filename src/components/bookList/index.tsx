import { Book } from "@/interfaces"
import Link from "next/link"
interface Props {
  bookList: Book[]
}

const BookList = ({ bookList }: Props) => {
  return (
    <div className="mx-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-8 lg:gap-20">
      {bookList.map(book => (
        <Link
          href={`book/${book.id}`}
          key={book.id}
        >
          <div className="rounded-xl overflow-hidden flex max-w-xxs">
            <img
              className="object-cover w-full"
              src={
                book.cover
                  ? book.cover
                  : "https://cdn.awsli.com.br/600x450/1769/1769402/produto/152246068e0860e4b77.jpg"
              }
              alt=""
            />
          </div>
          <p className="font-bold px-1 pt-1 text-sm">{book.name}</p>
          <p className="px-1 text-xs text-slate-400">Quantidade: {book.quantity_available}</p>
        </Link>
      ))}
    </div>
  )
}

export default BookList
