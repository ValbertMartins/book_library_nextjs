import { Book, Student } from "@/interfaces"
import { getStudentsAndBooks, registerNewBorrowBook } from "@/services/api/borrowBook"
import Button from "antd/lib/button"
import Form from "antd/lib/form"
import { MessageInstance } from "antd/lib/message/interface"
import Select from "antd/lib/select"
import DatePicker from "antd/lib/date-picker"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import message from "antd/lib/message"
import { StatisticsContext } from "@/contexts/StatisticsProvider"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import locale from "antd/lib/date-picker/locale/pt_BR"

interface formInputValues {
  bookId: string
  bookName: string
  studentId: string
  studentName: string
}

interface Props {
  page: number
  toast: MessageInstance
  setOpenModalBorrowBook: Dispatch<SetStateAction<boolean>>
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const BorrowBookForm = ({ setOpenModalBorrowBook, toast, setBookList, page }: Props) => {
  const [studentList, setStudentList] = useState([] as Pick<Student, "id" | "name">[])
  const [allBooks, setAllBooks] = useState(
    [] as Pick<Book, "id" | "name" | "quantity_available">[]
  )
  const { updateStatistics } = useContext(StatisticsContext)
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)
  const tomorrow = dayjs.unix(dayjs().unix() + 60 * 60 * 24) //1 day
  const [date, setDate] = useState(tomorrow)

  useEffect(() => {
    async function getSelectValues() {
      const { data, ok, error } = await getStudentsAndBooks()
      if (ok && data) {
        setAllBooks(data.bookList)
        setStudentList(data.studentList)
      } else {
        error?.status === 401 && handlerInauthorizedUserRequest()
      }
    }
    getSelectValues()
  }, [])

  async function handleSubmitForm(formInputValues: formInputValues) {
    toast.open({
      content: "Carregando",
      type: "loading",
      duration: 0,
    })

    const { ok, bookListUpdated, error } = await registerNewBorrowBook(
      formInputValues,
      page,
      date.unix()
    )
    if (ok && bookListUpdated) {
      toast.destroy()
      message.success("Livro emprestado com sucesso.")
      setOpenModalBorrowBook(false)
      setBookList(bookListUpdated)
      updateStatistics()
    } else {
      toast.destroy()
      error?.status === 401 && handlerInauthorizedUserRequest()
      message.error(error?.message)
    }
  }

  return (
    <Form
      className="mt-10"
      onFinish={handleSubmitForm}
    >
      <Form.Item
        name="bookId"
        rules={[{ required: true, message: "Esse campo é obrigatório" }]}
      >
        <Select
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          placeholder="Livro"
          options={allBooks
            .filter(book => book.quantity_available > 0)
            .map(book => ({ label: book.name, value: book.id }))}
        />
      </Form.Item>

      <Form.Item
        name="studentId"
        rules={[{ required: true, message: "Esse campo é obrigatório" }]}
      >
        <Select
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          placeholder="Estudante"
          options={studentList.map(student => ({ label: student.name, value: student.id }))}
        ></Select>
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Esse campo é obrigatório" }]}>
        <p className="mb-2 ml-[2px]">Devolução em: </p>
        <DatePicker
          onChange={date => {
            if (date) setDate(date)
          }}
          locale={locale}
          format={"DD/MM/YYYY"}
          allowClear={false}
          showToday={false}
          defaultValue={tomorrow}
          disabledDate={currentDate => {
            if (currentDate.isBefore(dayjs())) return true
            return false
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Salvar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BorrowBookForm
