import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
   
    onClick = (e) =>{
        // console.log(e.key);
        if(e.key==3){
            this.delCookie("token");
            this.delCookie("userid");
            window.location = "http://lala.ust.hk/"
        }
    }
    delCookie = (name) =>//删除cookie
    {
        document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
    }
    render() {
         const userMenu = (
          <Menu onClick={this.onClick}>
            <Menu.Item key="0">
               <Link to="/Mycorner"> <span> <i className="fa fa-user fa-fw"></i> User Profile </span></Link>
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
                <div> <i className="fa fa-tasks fa-fw"></i> No Announcement</div>
            </Menu.Item>
          </Menu>
        );
        return (
        	<div>
        		<div className="Header">
                    <span className="header-brand"><Link to="/Dashboard">LaLa</Link></span>
                    <ul className="header-right">
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
