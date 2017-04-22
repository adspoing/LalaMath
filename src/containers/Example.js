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
import {changeexample} from '../actions/actions.js'

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Example extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Example';
    }
    componentDidMount = () =>{   
    }
    showexample =(value)=>{
          console.log(value);
          this.props.actions.changeexample(value);
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
                                  <Col span="8" onClick = {this.showexample.bind(this,"1&2")}>
                                    <Card  title="Chapter 1&2" bordered={false}>chapter 1&2 Example</Card>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"3")}>
                                    <Link to="/ExampleForm"><Card title="Chapter 3" bordered={false}>chapter 3 Example</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"4")}  >
                                    <Link to="/ExampleForm"><Card title="Chapter 4" bordered={false}>chapter4 Example</Card></Link>
                                  </Col>
                                </Row>
                                 <Row>
                                  <Col span="8" onClick = {this.showexample.bind(this,"5")} >
                                    <Card title="Chapter 5" bordered={false}>chapter5 Example</Card>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"6")} >
                                    <Card title="Chapter 6" bordered={false}>chapter6 Example</Card>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"7")} >
                                    <Card title="Chapter 7" bordered={false}>chapter7 Example</Card>
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
          changeexample
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Example);

// export default Exercise;
