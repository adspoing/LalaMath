import '../css/QuestionList.less';

import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import { Tree, Input, Button,Select,Breadcrumb,TreeSelect} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import {changeindex} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

let queryValue;
let queryType;

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const x = 10;
const y = 10;
const z = 0;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}.${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);


const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QuestionList';
    }
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
      }
      onExpand = (expandedKeys) => {
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      }
      onChange = (e) => {
        const value = e.target.value;
        queryValue = e.target.value;
        const expandedKeys = dataList.map((item) => {
          if (item.key.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      }
      onSelectChange = (e) => {
          queryType = e.target.value;
      }
      showQuestion =()=>{
          this.props.actions.changeindex(queryValue);
      }
    render() {
        return (
            <div>
                <Header />
                <SideBar />
                <div className="wrapper">
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                          <Link to="/Home"><Icon type="home" />Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href=""> <Link to="/QuestionList">
                          <Icon type="book" />
                          <span>Qustion List</span></Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="questionlistcontainer">
                    <Select onChange={this.onSelectChange} 
                        showSearch
                        style={{ width: 120 }}
                        placeholder="Select a type"
                      >
                      <Option value="exercise">Exercise</Option>
                      <Option value="example">Example</Option>
                      <Option value="problem">Problem</Option>
                      <Option value="DIY">DIY</Option>
                      <Option value="quiz">Quiz</Option>
                    </Select>
                    <Search  style={{ width: 300 }} placeholder="Search" onChange={this.onChange}  />
                    <Button onClick = {this.showQuestion}><Link to="/ViewQuestion">Show</Link></Button>
                  </div>
                </div>
            </div>
        )
    }
}
// <Link to="/ViewQuestion">
// export default QuestionList;


function mapStateToProps (state){
    return { 
            index:state.question.index,
            questionData:state.question.questionData
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindex
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);