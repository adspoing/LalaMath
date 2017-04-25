import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Spin } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import {fetchthing} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/Syllabus.less';
import {changeproblem,loaddata,changeproblemdata} from '../actions/actions.js'
import axios from 'axios';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Problem extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Problem';
        this.state = {
             loading: true
        }
    }
    componentDidMount = () =>{   
        // console.log("oye");
        // this.props.actions.fetchthing();
    }
    showproblem =(value)=>{
          console.log(value)
          this.props.actions.changeproblem(value);
      }
    componentWillMount = () =>{
        if(this.props.allData.length==0){
          axios.get('http://lala.ust.hk:8000/get/questions/all')
          .then(res => {
            this.props.actions.loaddata(res.data);
            this.setState({loading: false});
          });
        }else{
            this.setState({loading: false});
        }
        if(this.props.problemData.length==0){
            axios.get('http://lala.ust.hk:8000/get/questions/all?category=3')
            .then(res => {
              this.props.actions.changeproblemdata(res.data);
            });
        }else{
            this.setState({loading: false});
        }
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
                    <Breadcrumb.Item href=""> <Link to="/Problem">
                      <Icon type="file-text" />
                      <span>Problem</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Spin spinning={this.state.loading} tip="Loading questions...">
                <div className="belowbread"> 
                <div className="dashboardName" style={{ background: '#ECECEC', padding: '30px' }}>
                                <Row>
                                  <Col span="8" onClick = {this.showproblem.bind(this,"1&2")}>
                                     <Link to="/ProblemForm"><Card  title="Chapter 1&2" bordered={false}>chapter 1&2 Problem</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showproblem.bind(this,"3")}>
                                    <Link to="/ProblemForm"><Card title="Chapter 3" bordered={false}>chapter 3 Problem</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showproblem.bind(this,"4")}  >
                                    <Link to="/ProblemForm"><Card title="Chapter 4" bordered={false}>chapter 4 Problem</Card></Link>
                                  </Col>
                                </Row>
                                 <Row>
                                  <Col span="8" onClick = {this.showproblem.bind(this,"5")} >
                                     <Link to="/ProblemForm"><Card title="Chapter 5" bordered={false}>chapter 5 Problem</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showproblem.bind(this,"6")} >
                                     <Link to="/ProblemForm"><Card title="Chapter 6" bordered={false}>chapter 6 Problem</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showproblem.bind(this,"7")} >
                                    <Link to="/ProblemForm"><Card title="Chapter 7" bordered={false}>chapter 7 Problem</Card></Link>
                                  </Col>
                                </Row>
                    </div>              
                </div>
                </Spin>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state){
    return { 
            // Data:state.question.questionData,
            allData:state.question.allData,
            problemData:state.question.problemData
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
          changeproblem,
          loaddata,
          changeproblemdata
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Problem);

// export default Exercise;
