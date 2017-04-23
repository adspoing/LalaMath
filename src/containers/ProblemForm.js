import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Table} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import Data from '../problem.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeproblemindex} from '../actions/actions.js'

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class ProblemForm extends React.Component {
	constructor(props) {
        super(props);   
        this.displayName = 'ProblemForm';
    }
    onrowclick=(record, index)=>{
         console.log(record.code);
         // console.log(Data[index].fields.code);
         // var count = 0;
         var indexxx;
         for(var i=0;i<Data.length;i++){
            if(Data[i].fields.code==record.code){
                indexxx=i;
            }
         }
         this.props.actions.changeproblemindex(indexxx);
    }

     render() {
         let dataSource = [];
         let count=0;
         for(var i=0;i<Data.length;i++){
            if(parseInt(Data[i].fields.code.substring(0,1))!=this.props.problemchapter){
                continue;
            }
            let tm=new Object();
            tm.key=count;
            tm.code=Data[i].fields.code;
            tm.difficulty=Data[i].fields.difficulty;
            tm.acceptance="0%";
            count++;
            dataSource.push(tm);
         }

        const columns = [{
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          render: text => <Link to="/ProblemList">{text}</Link>,
        }, {
          title: 'Difficulty',
          dataIndex: 'difficulty',
          key: 'difficulty',
        }, {
          title: 'Acceptance',
          dataIndex: 'acceptance',
          key: 'acceptance',
        }];
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
                    <Breadcrumb.Item href=""> <Link to="/ProblemForm">
                      <Icon type="file-text" />
                      <span>ProblemForm</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                 <Table dataSource={dataSource} columns={columns} onRowClick={this.onrowclick.bind(this)} />
                </div>
                </div>
            </div>
        )
    }
}

// export default ExampleForm;
function mapStateToProps (state){
    return { 
        problemIndex:state.question.problemIndex,
        problemchapter:state.question.problemchapter
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeproblemindex,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProblemForm);

