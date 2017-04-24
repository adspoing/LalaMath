import '../css/Hottest.less';

import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import {changeindexbyid} from '../actions/actions.js'
import { Tree, Input, Button,Select,Breadcrumb,TreeSelect,Table} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import Data from '../data.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';


class Hottest extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Search';
    }

    state = {
      Hottest:[],
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
         console.log(indexxx);
         this.props.actions.changeindexbyid(indexxx);
    }
      
    componentWillMount = () =>{
      let result = [];
      let that = this;
      axios.get("http://lala.ust.hk:8000/get/api/questions/mostdone/")
            .then(function(question) {
                for (var i = 0; i < question.data.length; i++){
                  let tm=new Object();
                  tm.key=i;
                  tm.code=question.data[i].code;
                  tm.difficulty=question.data[i].difficulty;
                  tm.acceptance=question.data[i].question_count;
                  result.push(tm);
                }
                that.setState({Hottest:result});
            })
    }
    render() {
      
        let columns = [{
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: text => <Link to="/ViewQuestion">{text}</Link>,
            sorter: (a, b) => a.code.split('.')[1]+a.code.split('.')[2] - (b.code.split('.')[1]+b.code.split('.')[2]),
          }, {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            sorter: (a, b) => a.difficulty - b.difficulty,
          }, {
            title: 'User_Count ',
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
                          <Link to="/Home"><Icon type="home" />Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href=""> <Link to="/Hottest">
                          <Icon type="book" />
                          <span>Hottest</span></Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="hottestResult">
                    <Table dataSource={this.state.Hottest} columns={columns} onRowClick={this.onrowclick.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}
// <Link to="/ViewQuestion">
// export default QuestionList;


function mapStateToProps (state){
    //console.log(state.searchstate);
    return { 
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Hottest);
