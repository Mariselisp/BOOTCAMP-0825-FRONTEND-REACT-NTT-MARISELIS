import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

jest.mock("../Navbar/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

jest.mock("../Sidebar/Sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("Layout", () => {
  test("renderiza Navbar, Sidebar y contenido", () => {
    render(
      <Layout>
        <p>Contenido de prueba</p>
      </Layout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });
});

