import "./Navbar.less"
import React, { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Menu, Layout } from "antd";
import { LogoutOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../lib/codegen";
import { AppContext } from "../../lib/helpers/AppContext";

interface NavbarProps extends RouteComponentProps {

}

const _Navbar: React.FC<NavbarProps> = props => {
  const [logout] = useLogoutMutation()
  const { user, meQuery, router } = useContext(AppContext)

  const handleLogout = () => logout().then(() => meQuery.refetch())

  function PublicMenu() {
    return [
      <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>,
      <Menu.Item key="/signup"><Link to="/signup">Signup</Link></Menu.Item>,
    ]
  }

  function UserMenu() {
    return [
      // <Menu.Item key="/app" onClick={() => router.history.push('/app')}>
      //   Tasks
      // </Menu.Item>,
      // <Menu.Item key="/account" onClick={() => router.history.push('/account')}>
      //   Account
      // </Menu.Item>,
      <Menu.Item key="4" className="account" onClick={() => handleLogout()}>
        <LogoutOutlined type="logout" /> Logout
      </Menu.Item>
    ]
  }

  console.log(props.location.pathname);

  return (
    <div>
      <Layout.Header className="navbar">
        <Link to="/"><div className="logo"><span>Todo-App</span></div></Link>
        <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={[props.location.pathname]}>
          {user && user.id ? UserMenu() : PublicMenu()}
        </Menu>
      </Layout.Header>
    </div>
  );
}

export const Navbar = withRouter(_Navbar)