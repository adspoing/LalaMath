import '../css/Search.less';

import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import {changeindexbyid,search,setchapter,loaddata,loadcomplete} from '../actions/actions.js'
import { Tree, Input, Button,Select,Breadcrumb,TreeSelect,Table,Spin} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
// import Data from '../data.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
const Option = Select.Option;


let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];

const SearchInput = Input.Search;
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Search';
    }
    state = {
        searchType: 'questions',
        searchValue: '',
        searchResult: [],
        loading:true,
      }
   
      onSelectChange = (value) => {
          this.setState({searchType:value})
      }

      onrowclick=(record, index)=>{
         if (this.props.searchType == 'questions'){
                var indexxx;
                let Data=this.props.allData;
                var category;
                switch(record.code.split(' ')[0]){
                  case 'Example':category=1;break;
                  case 'Exercise':category=2;break;
                  case 'Problem':category=3;break;
                  case 'DIY':category=4;break;
                  case 'Quiz':category=5;break;
                }
                 for(var i=0;i<Data.length;i++){
                      if(Data[i].fields.code==record.code.split(' ')[1]&&
                        Data[i].fields.category==category){
                        indexxx=i;
                    }
                 }
                this.props.actions.changeindexbyid(indexxx);
          }
         if (this.props.searchType == 'neurons'){
                  var chapter = record.chapter;
                  this.props.actions.setchapter(chapter);}
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
          if(this.props.complete.length==0){
                let url="http://lala.ust.hk:8000/get/api/students/donerecord?userid=";
                var userid = this.getCookie("id");
                // userid=14;
                url+=userid;
                axios.get(url)
                .then(res => {
                    console.log(res.data);
                    this.props.actions.loadcomplete(res.data);
                    this.setState({loading: false});
                });
          }
      }
      getCookie = (name) =>{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
      }
      onSearch =(value)=>{
        let result = [];
        let keyword = value;
        // console.log(keyword);
        let that = this;
        if (this.state.searchType == "questions")
          {
          var pkIndex=[];
          let AllData = this.props.complete;
          for(var i=0;i<AllData.length;i++){
            pkIndex[AllData[i].questionid]=i;
          }
          axios.get("http://lala.ust.hk:8000/get/api/questions/search?keyword="+keyword)
            .then(function(question) {
                for (var i = 0; i < question.data.length; i++){
                  var Data = question.data[i];
                  let tm=new Object();
                  tm.key=i;
                  tm.code=questype[Data.fields.category]+Data.fields.code;
                  tm.difficulty=Data.fields.difficulty;
                  tm.category=Data.fields.category;
                  tm.correctcount="0/0";
                  tm.submitted=that.props.complete[pkIndex[Data.pk]].isdone+"";
                  result.push(tm);
                }
                that.setState({searchResult:result});
                let type = that.state.searchType;
                that.props.actions.search({type,result});
            })
          }
        else
          axios.get("http://lala.ust.hk:8000/get/api/neurons/search?keyword="+keyword)
            .then(function(neurons) {
                for (var i = 0; i < neurons.data.length; i++){
                  var Data = neurons.data[i];
                  //console.log(Data);
                  let tm=new Object();
                  tm.key=i;
                  tm.name=Data.fields.title;
                  tm.chapter=Data.fields.chapter;
                  result.push(tm);
                }
                that.setState({searchResult:result});
                let type = that.state.searchType;
                that.props.actions.search({type,result});
            })        
      }
    render() {
        // console.log(this.props);
        //=this.state.searchResult
        let columns = [];
        if (this.props.searchType == "questions")
          // columns = [{
          //   title: 'Code',
          //   dataIndex: 'code',
          //   key: 'code',
          //   render: text => <Link to="/ViewQuestion">{text}</Link>,
          //   // sorter: (a, b) => a.code.split(' ')[1].split('.')[1]+a.code.split(' ')[1].split('.')[2] - (b.code.split(' ')[1].split('.')[1]+b.code.split(' ')[1].split('.')[2]),
          // }, {
          //   title: 'Difficulty',
          //   dataIndex: 'difficulty',
          //   key: 'difficulty',
          //   sorter: (a, b) => a.difficulty - b.difficulty,
          // }, {
          //   title: 'Acceptance',
          //   dataIndex: 'acceptance',
          //   key: 'acceptance',
          // }];
           columns = [{
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: text => <Link to="/ViewQuestion">{text}</Link>,
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
        if (this.props.searchType == "neurons")
          columns = [{
            title: 'Neuron Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to="/Chart">{text}</Link>,
          }, {
            title: 'Chapter',
            dataIndex: 'chapter',
            key: 'chapter',
            sorter: (a, b) => a.chapter - b.chapter,
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
                        <Breadcrumb.Item href=""> <Link to="/Search">
                          <Icon type="book" />
                          <span>Search</span></Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Spin spinning={this.state.loading} tip="Loading questions...">
                    <div className="search">
                    <Select onChange={this.onSelectChange} 
                        showSearch
                        style={{ width: 120 }}
                        placeholder="Select a type"
                      >
                      <Option value="questions">Question</Option>
                      <Option value="neurons">Neurons</Option>
                    </Select>
                    <SearchInput  style={{ width: 300 }} placeholder="Search"  onSearch={this.onSearch}   />
                    <div className="searchResult">
                    <Table dataSource={this.props.searchResult} columns={columns} onRowClick={this.onrowclick.bind(this)} />
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
            searchType:state.searchstate.searchType,
            searchResult:state.searchstate.searchResult,
            graphChater:state.graph.chapter,
            allData:state.question.allData,
            complete:state.question.complete,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            search,
            setchapter,
            loaddata,
            loadcomplete
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
