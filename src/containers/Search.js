import '../css/Search.less';

import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import {changeindexbyid,search,setchapter} from '../actions/actions.js'
import { Tree, Input, Button,Select,Breadcrumb,TreeSelect,Table} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import Data from '../data.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
const Option = Select.Option;



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
      }
   
      onSelectChange = (value) => {
          this.setState({searchType:value})
      }

      onrowclick=(record, index)=>{
         if (this.props.searchType == 'questions'){
                  var indexxx;
                   for(var i=0;i<Data.length;i++){
                      if(Data[i].fields.code==record.code.split(' ')[1]){
                          indexxx=i;
                      }
                   }
                   console.log(indexxx);
                   this.props.actions.changeindexbyid(indexxx);}
         if (this.props.searchType == 'neurons'){
                  var chapter = record.chapter;
                  this.props.actions.setchapter(chapter);}
      }
      onSearch =(value)=>{
        let result = [];
        let keyword = value;
        // console.log(keyword);
        let that = this;
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        if (this.state.searchType == "questions")
          axios.get("http://lala.ust.hk:8000/get/api/questions/search?keyword="+keyword)
            .then(function(question) {
                for (var i = 0; i < question.data.length; i++){
                  var Data = question.data[i];
                  //console.log(Data);
                  let tm=new Object();
                  tm.key=i;
                  tm.code=questype[Data.fields.category]+Data.fields.code;
                  tm.difficulty=Data.fields.difficulty;
                  tm.acceptance="0%";
                  result.push(tm);
                }
                that.setState({searchResult:result});
                let type = that.state.searchType;
                that.props.actions.search({type,result});
            })
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
          columns = [{
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: text => <Link to="/ViewQuestion">{text}</Link>,
            // sorter: (a, b) => a.code.split(' ')[1].split('.')[1]+a.code.split(' ')[1].split('.')[2] - (b.code.split(' ')[1].split('.')[1]+b.code.split(' ')[1].split('.')[2]),
          }, {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            sorter: (a, b) => a.difficulty - b.difficulty,
          }, {
            title: 'Acceptance',
            dataIndex: 'acceptance',
            key: 'acceptance',
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
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            search,
            setchapter,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
