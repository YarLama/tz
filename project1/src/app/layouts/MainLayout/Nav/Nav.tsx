import { Link, useLocation } from "react-router";
import Logo from "@/shared/assets/icons/logo.svg?react";
import "./index.scss";

const linkList = [
  {
    route: "/test1",
    label: "",
  },
  {
    route: "/test2",
    label: "",
  },
  {
    route: "/test3",
    label: "",
  },
  {
    route: "/test4",
    label: "",
  },
  {
    route: "/test5",
    label: "",
  },
  {
    route: "/reports",
    label: "",
  },
  {
    route: "/test6",
    label: "",
  },
];

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className="nav-main">
      <Logo className="logo" />
      {linkList.map((link, i) => (
        <Link
          className={[
            "nav-item-link",
            location.pathname === link.route ? "active" : false,
          ]
            .filter(Boolean)
            .join(" ")}
          to={link.route}
          key={i}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
