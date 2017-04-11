import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Home extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Home';
    }

     render() {
        return (
        	<div>
                <div className="allWrapper">
                    <Header />
    	        	<div className="banner-mask"></div>
                    <div className="home-Banner">
                    </div>
                    <div className="slogan">
                         <h3>practice makes perfect</h3>
                         <Button className="slo-btn"><Link to="/Dashboard">Start</Link></Button>
                    </div>
                </div>
                <MyFooter />
        	</div>
        )
    }
}

export default Home;
