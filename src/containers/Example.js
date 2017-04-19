import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import {fetchthing} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/Syllabus.less';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Example extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Example';
    }
    componentDidMount = () =>{   
        console.log("oye");
        this.props.actions.fetchthing();
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
                    <Breadcrumb.Item href=""> <Link to="/Example">
                      <Icon type="file-text" />
                      <span>Example</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                <div className="dashboardName" style={{ background: '#ECECEC', padding: '30px' }}>
                                <Row>
                                  <Col span="8">
                                    <Card title="Chapter 1&2" bordered={false}>chapter 1&2 content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Card title="Chapter 3" bordered={false}>chapter 3 content</Card>
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
                                    <Card title="Chapter5" bordered={false}>chapter5 content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Card title="Chapter6" bordered={false}>chapter6 content</Card>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span="8">
                                    <Card title="Chapter7" bordered={false}>chapter7 content</Card>
                                  </Col>
                                  <Col span="8">
                                    <Card title="Chapter8" bordered={false}>chapter8 content</Card>
                                  </Col>
                                 
                                </Row>
                    </div>              
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state){
    return { 
            Data:state.question.questionData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
          fetchthing
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Example);

// export default Exercise;
