import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转

const userMenu = (
  <Menu>
    <Menu.Item key="0">
        <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
    </Menu.Item>
    <Menu.Item key="1">
        <span><i className="fa fa-gear fa-fw"></i> Settings </span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
         <span> <i className = "fa fa-sign-out fa-fw" /> Logout </span>
    </Menu.Item>
  </Menu>
);

const mailMenu = (
  <Menu>
    <Menu.Item key="0">
        <div> <i className="fa fa-tasks fa-fw"></i> New Task <span className="pull-right text-muted small">4 minutes ago</span> </div>
    </Menu.Item>
    <Menu.Item key="1">
        <div> <i className="fa fa-comment fa-fw"></i> New Comment <span className="pull-right text-muted small">4 minutes ago</span> </div>
    </Menu.Item>
    <Menu.Item key="3">
         <div> <i className="fa fa-envelope fa-fw"></i> Message Sent <span className="pull-right text-muted small">4 minutes ago</span> </div>
    </Menu.Item>
   
  </Menu>
);


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
   
    render() {
        return (
        	<div>
        		<div className="Header">
                    <span className="header-brand"><Link to="/Dashboard">LaLa</Link></span>
                    <ul className="header-right">
                        <li>
                            About
                        </li>
                        <li>
                        <Dropdown overlay={mailMenu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                              <i className="fa fa-bell fa-fw"></i><Icon type="down" />
                            </a>
                        </Dropdown>
                        </li>
                        <li>
                         <Dropdown overlay={userMenu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                              <i className="fa fa-user fa-fw"></i><Icon type="down" />
                            </a>
                        </Dropdown>
                        </li>

                    </ul>
                </div>
        	</div>
        )
    }
}

export default Header;
