import '../css/Hottest.less';

import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import {changeindexbyid,loaddata} from '../actions/actions.js'
import { Tree, Input, Button,Select,Breadcrumb,TreeSelect,Table,Spin} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
// import Data from '../data.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];

class Hottest extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Search';
    }

    state = {
      Hottest:[],
      loading: true
    }

    onrowclick=(record, index)=>{
         var indexxx;
         // console.log(this.state.Hottest[index]);
         let Data=this.props.allData;

         for(var i=0;i<Data.length;i++){
              if(Data[i].fields.code==record.code.split(' ')[1]&&
                Data[i].fields.category==this.state.Hottest[index].category){
                indexxx=i;
            }
         }
         this.props.actions.changeindexbyid(indexxx);
    }
    componentDidMount = () =>{
        if(this.props.allData.length==0){
          axios.get('http://lala.ust.hk:8000/get/questions/all')
          .then(res => {
            this.props.actions.loaddata(res.data);
            this.setState({loading: false});
          });
        }else{
              this.setState({loading: false});
         }
    }
    componentWillMount = () =>{
      let result = [];
      let that = this;
      axios.get("http://lala.ust.hk:8000/get/api/questions/mostdone/")
            .then(function(question) {
                for (var i = 0; i < question.data.length; i++){
                  let tm=new Object();
                  tm.key=i;
                  tm.code=questype[question.data[i].category]+question.data[i].code;
                  tm.difficulty=question.data[i].difficulty;
                  tm.acceptance=question.data[i].question_count;
                  tm.category=question.data[i].category
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
            title: 'Submissions ',
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
                    <Spin spinning={this.state.loading} tip="Loading questions...">
                    <Table dataSource={this.state.Hottest} columns={columns} onRowClick={this.onrowclick.bind(this)} />
                    </Spin>
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
      allData:state.question.allData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,loaddata
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Hottest);
