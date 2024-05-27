import { Link } from "react-router-dom";
import { Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <>
        <span>Home</span>
        <Link to="/" />
      </>
    ),
    key: "home",
  },
  {
    label: (
      <>
        <span>Search</span>
        <Link to="/search" />
      </>
    ),
    key: "search",
  },
  {
    label: (
      <>
        <span>Settings</span>
        <Link to="/settings" />
      </>
    ),
    key: "settings",
  },
];

function NavigationBar() {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["home"]}
      mode="horizontal"
      items={items}
    />
  );
}

export default NavigationBar;
