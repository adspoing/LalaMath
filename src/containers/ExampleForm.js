import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Table,Spin} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
// import Data from '../example.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeexampleindex,changeexampledata,loadcomplete} from '../actions/actions.js'
import axios from 'axios';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class ExampleForm extends React.Component {
	constructor(props) {
        super(props);   
        this.displayName = 'ExampleForm';
        this.state = {
             complete: [],
             loading: true
        }
    }
    onrowclick=(record, index)=>{
         var indexxx;
        let Data=this.props.exampleData;
         for(var i=0;i<Data.length;i++){
            if(Data[i].fields.code==record.code){
                indexxx=i;
            }
         }
         this.props.actions.changeexampleindex(indexxx);
    }
    componentWillMount = () =>{
            if(this.props.complete.length==0){
                  let url="http://lala.ust.hk:8000/get/api/students/donerecord?userid=";
                  var userid = this.getCookie("id");
                  // let userid=14;
                  url+=userid;
                  axios.get(url)
                  .then(res => {
                      // console.log(res.data);
                      this.props.actions.loadcomplete(res.data);
                      this.setState({loading: false});
                  });
            }
            if(this.props.exampleData.length==0){
              axios.get('http://lala.ust.hk:8000/get/questions/all?category=1')
              .then(res => {
                this.props.actions.changeexampledata(res.data);
                this.setState({loading: false});
              });
            }else if(this.props.complete.length!=0){
                this.setState({loading: false});
            }
    }
    getCookie = (name) =>{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }
     render() {
         // console.log(Data);
         // console.log(this.state.complete[Data[0].pk]);
         let dataSource = [];
         let Data=this.props.exampleData;
         let count=0;
         var pkIndex=[];
          let AllData = this.props.complete;
          for(var i=0;i<AllData.length;i++){
            pkIndex[AllData[i].questionid]=i;
          }
         if(Data.length!=0&&this.props.complete.length!=0){
               for(var i=0;i<Data.length;i++){
                  if(parseInt(Data[i].fields.code.substring(0,1))!=this.props.examplechapter){
                      continue;
                  }
                  let tm=new Object();
                  tm.key=count;
                  tm.code=Data[i].fields.code;
                  tm.difficulty=Data[i].fields.difficulty;
                  tm.viewcount=0;
                  tm.view=this.props.complete[pkIndex[Data[i].pk]].isdone+"";
                  count++;
                  dataSource.push(tm);
               }
         }
         // console.log(dataSource);
         // console.log(dataSource[0].code.split('.')[1]+dataSource[0].code.split('.')[2]);
          dataSource.sort(function(a, b) {
            return (a.code.split('.')[1]==b.code.split('.')[1]?
          parseInt(a.code.split('.')[2]) - parseInt(b.code.split('.')[2])
          :parseInt(a.code.split('.')[1]) - parseInt(b.code.split('.')[1]))
        });
        const columns = [{
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          render: text => <Link to="/ExampleList">{text}</Link>,
          sorter: (a, b) => a.code.split('.')[1]==b.code.split('.')[1]?
          parseInt(a.code.split('.')[2]) - parseInt(b.code.split('.')[2])
          :parseInt(a.code.split('.')[1]) - parseInt(b.code.split('.')[1]),
        }, {
          title: 'Difficulty',
          dataIndex: 'difficulty',
          key: 'difficulty',
          sorter: (a, b) => a.difficulty - b.difficulty,
        }, {
          title: 'View Count',
          dataIndex: 'viewcount',
          key: 'viewcount',
        },{
          title: 'Viewed',
          dataIndex: 'view',
          key: 'view',
          render: text => <div>{text=="false"?<Icon style={{fontSize:20}} type="lock" />:<Icon style={{fontSize:20,color:"#00FF00"}} type="unlock" />}</div>
          // render: text => <div>{text=="false"?"false":"true"}</div>,
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
                    <Breadcrumb.Item href=""> <Link to="/Example">
                      <Icon type="file-text" />
                      <span>Example</span></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/ExampleForm">
                      <Icon type="file-text" />
                      <span>ExampleForm</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                 <Spin spinning={this.state.loading} tip="Loading List...">
                 <Table dataSource={dataSource} columns={columns} onRowClick={this.onrowclick.bind(this)} />
                 </Spin>
                </div>
                </div>
            </div>
        )
    }
}

// export default ExampleForm;
function mapStateToProps (state){
    return { 
        exampleIndex:state.question.exampleIndex,
        examplechapter:state.question.examplechapter,
        allData:state.question.allData,
        exampleData:state.question.exampleData,
        complete:state.question.complete,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeexampleindex,
            changeexampledata,
            loadcomplete,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExampleForm);

