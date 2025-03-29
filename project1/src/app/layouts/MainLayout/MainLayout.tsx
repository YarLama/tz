import { Outlet } from "react-router";
import { Nav } from "./Nav/Nav";
import './index.scss'

export const MainLayout = () => {
  return (
    <div className="layout">
      <div className="layout__nav">
        <Nav />
      </div>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};
