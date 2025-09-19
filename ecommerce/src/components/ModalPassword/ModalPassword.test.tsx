import { render, screen, fireEvent } from "@testing-library/react";
import { ModalPassword } from "./ModalPassword";

describe("ModalPassword", () => {
  const mockOnClose = jest.fn();
  const mockOnSendSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza título y botones", () => {
    render(<ModalPassword onClose={mockOnClose} onSendSuccess={mockOnSendSuccess} />);
    expect(screen.getByText("Recuperar contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ingresa tu correo")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
  });
});
