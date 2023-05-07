import { Book, Student } from "@/interfaces"
import { getStudentsAndBooksNames, registerNewBorrowBook } from "@/utils/handlerBorrowBook"
import Button from "antd/lib/button"
import Form from "antd/lib/form"
import { MessageInstance } from "antd/lib/message/interface"
import Select from "antd/lib/select"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import message from "antd/lib/message"
import { StatisticsContext } from "@/contexts/StatisticsProvider"

interface formInputValues {
  bookId: string
  bookName: string
  studentId: string
  studentName: string
}

interface Props {
  toast: MessageInstance
  setOpenModalBorrowBook: Dispatch<SetStateAction<boolean>>
}

const BorrowBookForm = ({ setOpenModalBorrowBook, toast }: Props) => {
  const [studentList, setStudentList] = useState([] as Pick<Student, "id" | "name">[])
  const [bookList, setBookList] = useState([] as Pick<Book, "id" | "name">[])
  const { updateStatistics } = useContext(StatisticsContext)

  useEffect(() => {
    async function getSelectValues() {
      const { data, ok } = await getStudentsAndBooksNames()
      if (ok && data) {
        setBookList(data.bookList)
        setStudentList(data.studentList)
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

    const { ok, errorMessage } = await registerNewBorrowBook(formInputValues)
    if (ok) {
      toast.destroy()
      message.success("Livro emprestado com sucesso.")
      setOpenModalBorrowBook(false)
      updateStatistics()
    } else {
      toast.destroy()
      message.error(errorMessage)
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
          options={bookList.map(book => ({ label: book.name, value: book.id }))}
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
