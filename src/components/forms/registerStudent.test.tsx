import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import RegisterStudentForm from "./registerStudent"
import userEvent from "@testing-library/user-event"
//implements metchmedia function
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe("Register student form", () => {
  it("should be in the document", () => {
    render(
      <RegisterStudentForm
        loading={false}
        setStudentList={() => {}}
        setLoading={() => {}}
        setError={() => {}}
        setOpenModal={() => {}}
      />
    )
    const registerStudentForm = screen.getByRole("form-register-student")

    expect(registerStudentForm).toBeInTheDocument()
  })

  it("should able to update input fields when type", async () => {
    render(
      <RegisterStudentForm
        loading={false}
        setStudentList={() => {}}
        setLoading={() => {}}
        setError={() => {}}
        setOpenModal={() => {}}
      />
    )
    const inputName = screen.getByPlaceholderText("Nome")
    const inputGrade = screen.getByPlaceholderText("Série")
    const inputClass = screen.getByPlaceholderText("Turma")

    expect(inputName).toBeVisible()
    expect(inputGrade).toBeVisible()
    expect(inputClass).toBeVisible()

    await userEvent.click(inputName)
    await userEvent.keyboard("foo")

    expect(inputName).toHaveValue("foo")

    await userEvent.click(inputGrade)
    await userEvent.keyboard("2")

    expect(inputGrade).toHaveValue("2")

    await userEvent.click(inputClass)
    await userEvent.keyboard("C")

    expect(inputClass).toHaveValue("C")
  })
})
