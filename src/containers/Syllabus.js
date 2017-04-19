import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import '../css/Syllabus.less';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Syllabus extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Syllabus';
    }

     render() {
        return (
        	<div>
                <Header />
                <SideBar />
                <div className="wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Dashboard"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/Syllabus">
                      <Icon type="file-text" />
                      <span>Syllabus</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                <iframe src="https://app.box.com/embed/s/ev3uk197rmr4rcwvb50ba1rvghg8ujrh" width="800" height="550" frameborder="0"></iframe>             
                </div>
                </div>
            </div>
        )
    }
}

export default Syllabus;
