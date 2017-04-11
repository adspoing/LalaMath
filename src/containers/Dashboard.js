import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转


class Dashboard extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Dashboard';
    }

     render() {
        return (
        	<div>
	        	<Header />
                <SideBar />
                <div className="wrapper">
                     <div className="dashboardName" style={{ background: '#ECECEC', padding: '30px' }}>
                                <Row>
                                  <Col span="8">
                                    <Card title="Chapter1" bordered={false}>chapter1 content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Card title="Chapter2" bordered={false}>chapter2 content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Link to="/Questions"><Card title="Chapter3" bordered={false}>chapter3 content</Card></Link>
                                  </Col>
                                </Row>
                                 <Row>
                                  <Col span="8">
                                    <Card title="Chapter4" bordered={false}>chapter4 content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Card title="neuron" bordered={false}>neuron content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Card title="difficulty" bordered={false}>difficulty</Card>
                                  </Col>
                                </Row>
                    </div>               
               </div>
        	</div>
        )
    }
}

export default Dashboard;
