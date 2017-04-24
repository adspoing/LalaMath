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
import {changeexample,loaddata,changeexampledata} from '../actions/actions.js'
import axios from 'axios';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Example extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Example';
         this.state = {
             loading: true
        }
    }
    componentDidMount = () =>{   
    }
    showexample =(value)=>{
          if(value=="1&2")
            value=1;
          this.props.actions.changeexample(value);
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
        if(this.props.exampleData.length==0){
            axios.get('http://lala.ust.hk:8000/get/questions/all?category=1')
            .then(res => {
              this.props.actions.changeexampledata(res.data);
              // this.setState({loading: false});
            });
        }else{
            this.setState({loading: false});
        }
    }
     render() {
        // console.log(this.props.allData)
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
                <Spin spinning={this.state.loading}>
                <div className="belowbread"> 
                <div className="dashboardName" style={{ background: '#ECECEC', padding: '30px' }}>
                                <Row>
                                  <Col span="8" onClick = {this.showexample.bind(this,"1&2")}>
                                    <Link to="/ExampleForm"><Card  title="Chapter 1&2" bordered={false}>chapter 1&2 Example</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"3")}>
                                    <Link to="/ExampleForm"><Card title="Chapter 3" bordered={false}>chapter 3 Example</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"4")}  >
                                    <Link to="/ExampleForm"><Card title="Chapter 4" bordered={false}>chapter 4 Example</Card></Link>
                                  </Col>
                                </Row>
                                 <Row>
                                  <Col span="8" onClick = {this.showexample.bind(this,"5")} >
                                    <Link to="/ExampleForm"><Card title="Chapter 5" bordered={false}>chapter 5 Example</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"6")} >
                                    <Link to="/ExampleForm"><Card title="Chapter 6" bordered={false}>chapter 6 Example</Card></Link>
                                  </Col>
                                  <Col span="8" onClick = {this.showexample.bind(this,"7")} >
                                    <Link to="/ExampleForm"><Card title="Chapter 7" bordered={false}>chapter 7 Example</Card></Link>
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
            exampleData:state.question.exampleData
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
          changeexample,
          changeexampledata,
          loaddata
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Example);

// export default Exercise;
