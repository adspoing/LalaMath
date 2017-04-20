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
import {changeexercise} from '../actions/actions.js'

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Exercise extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Exercise';
    }
    componentDidMount = () =>{   
        // console.log("oye");
        // this.props.actions.fetchthing();
    }
    showexercise =(value)=>{
          this.props.actions.changeexercise(value);
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
                    <Breadcrumb.Item href=""> <Link to="/Exercise">
                      <Icon type="file-text" />
                      <span>Exercise</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                <div className="dashboardName" style={{ background: '#ECECEC', padding: '30px' }}>
                                <Row>
                                  <Col span="8" onClick = {this.showexercise.bind(this,"1&2")}>
                                    <Card  title="Chapter 1&2" bordered={false}>chapter 1&2 Exercise</Card>
                                  </Col>
                                  <Col span="8" onClick = {this.showexercise.bind(this,"3")}>
                                    <Link to="/ExerciseList"><Card title="Chapter 3" bordered={false}>chapter 3 Exercise</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showexercise.bind(this,"4")}  >
                                    <Link to="/ExerciseList"><Card title="Chapter 4" bordered={false}>chapter4 Exercise</Card></Link>
                                  </Col>
                                </Row>
                                 <Row>
                                  <Col span="8" onClick = {this.showexercise.bind(this,"5")} >
                                    <Card title="Chapter 5" bordered={false}>chapter5 Exercise</Card>
                                  </Col>
                                  <Col span="8" onClick = {this.showexercise.bind(this,"6")} >
                                    <Card title="Chapter 6" bordered={false}>chapter6 Exercise</Card>
                                  </Col>
                                  <Col span="8" onClick = {this.showexercise.bind(this,"7")} >
                                    <Card title="Chapter 7" bordered={false}>chapter7 Exercise</Card>
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
          changeexercise
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Exercise);

// export default Exercise;