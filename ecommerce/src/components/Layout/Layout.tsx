import type { ReactNode } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.css';

type LayoutProps = {
  children: ReactNode;
};


export const Layout =  ({ children } : LayoutProps) => {
    return (
    <div className="layoutNav">
      <Navbar />
      <div className="layoutSidebar">
        <Sidebar />
        <main className="layoutMain">
          { children }
        </main>
      </div>
    </div>
  );
}