import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import { ProductProvider } from "../../context/ProductContext"; 

describe("Navbar", () => {
  test("muestra saludo por defecto", () => {
    render(
      <MemoryRouter>
        <ProductProvider>
          <Navbar />
        </ProductProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Hola, invitado")).toBeInTheDocument();
  });
});
