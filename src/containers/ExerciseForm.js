import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Table,Spin} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import Data from '../exercise.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeexerciseindex,loadcomplete,changeexercisedata} from '../actions/actions.js'
import axios from 'axios';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class ExerciseForm extends React.Component {
	constructor(props) {
        super(props);   
        this.displayName = 'ExerciseForm';
         this.state = {
             // complete: [],
             loading: true
        }
    }
    onrowclick=(record, index)=>{
         // console.log(record.code);
         // console.log(Data[index].fields.code);
         // var count = 0;
         let Data=this.props.exerciseData;
         var indexxx;
         for(var i=0;i<Data.length;i++){
            if(Data[i].fields.code==record.code){
                indexxx=i;
            }
         }
         this.props.actions.changeexerciseindex(indexxx);
    }
    componentWillMount = () =>{
          if(this.props.complete.length==0){
                let url="http://lala.ust.hk:8000/get/api/students/donerecord?userid=";
                var userid = this.getCookie("id");
                // let userid=14;
                url+=userid;
                axios.get(url)
                .then(res => {
                    console.log(res.data);
                    this.props.actions.loadcomplete(res.data);
                    this.setState({loading: false});
                });
          }
          if(this.props.exerciseData.length==0){
            axios.get('http://lala.ust.hk:8000/get/questions/all?category=2')
            .then(res => {
              this.props.actions.changeexercisedata(res.data);
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
         let dataSource = [];
         let count=0;
         let Data=this.props.exerciseData;
         // console.log(this.props.complete);
         var pkIndex=[];
          let AllData = this.props.complete;
          for(var i=0;i<AllData.length;i++){
            pkIndex[AllData[i].questionid]=i;
          }
         if(Data.length!=0&&this.props.complete.length!=0){
             for(var i=0;i<Data.length;i++){
                // console.log(this.props.exercisechapter);
                if(parseInt(Data[i].fields.code.substring(0,1))!=this.props.exercisechapter){
                    continue;
                }
                let tm=new Object();
                tm.key=count;
                tm.code=Data[i].fields.code;
                tm.difficulty=Data[i].fields.difficulty;
                tm.correctcount="0/0";
                tm.submitted=this.props.complete[pkIndex[Data[i].pk]].isdone+"";
                count++;
                dataSource.push(tm);
             }
         }
        dataSource.sort(function(a, b) {
            return (a.code.split('.')[1]==b.code.split('.')[1]?
          parseInt(a.code.split('.')[2]) - parseInt(b.code.split('.')[2])
          :parseInt(a.code.split('.')[1]) - parseInt(b.code.split('.')[1]))
        });
        const columns = [{
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          render: text => <Link to="/ExerciseList">{text}</Link>,
          sorter: (a, b) => a.code.split('.')[1]==b.code.split('.')[1]?
          parseInt(a.code.split('.')[2]) - parseInt(b.code.split('.')[2])
          :parseInt(a.code.split('.')[1]) - parseInt(b.code.split('.')[1]),
        }, {
          title: 'Difficulty',
          dataIndex: 'difficulty',
          key: 'difficulty',
          sorter: (a, b) => a.difficulty - b.difficulty,
        }, {
          title: 'Correct Count/Submmit Count',
          dataIndex: 'correctcount',
          key: 'correctcount',
        },{
          title: 'Submitted',
          dataIndex: 'submitted',
          key: 'submitted',
          render: text => <div>{text=="false"?<Icon style={{fontSize:20}} type="lock" />:<Icon style={{fontSize:20,color:"#00FF00"}} type="unlock" />}</div>
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
                    <Breadcrumb.Item href=""> <Link to="/Exercise">
                      <Icon type="file-text" />
                      <span>Exercise</span></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/ExerciseForm">
                      <Icon type="file-text" />
                      <span>ExerciseForm</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Spin spinning={this.state.loading} tip="Loading List...">
                <div className="belowbread"> 
                 <Table dataSource={dataSource} columns={columns} onRowClick={this.onrowclick.bind(this)} />
                </div>
                </Spin>
                </div>
            </div>
        )
    }
}

// export default ExampleForm;
function mapStateToProps (state){
    return { 
        exerciseIndex:state.question.exerciseIndex,
        exercisechapter:state.question.exercisechapter,
        allData:state.question.allData,
        exerciseData:state.question.exerciseData,
        complete:state.question.complete,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeexerciseindex,
            loadcomplete,
            changeexercisedata,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm);

