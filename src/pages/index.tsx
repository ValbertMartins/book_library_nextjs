import BookList from "@/components"

export default function Home() {
  return (
    <main className="bg-primary-color p-8">
      <header className="flex items-center justify-between">
        <div className="text-2xl font-bold">Dashboard</div>

        <div>
          <input
            type="text"
            placeholder="Search book here"
            className="rounded-sm  py-1 px-3"
          />
        </div>
      </header>

      <section className="grid grid-cols-2 my-10 gap-6">
        <div className="bg-white rounded-sm px-2 ">Livros cadastrados </div>
        <div className="bg-white rounded-sm px-2 ">Livros emprestados</div>
        <div className="bg-white rounded-sm px-2 ">Alunos cadastrados</div>
      </section>

      <BookList />
    </main>
  )
}
