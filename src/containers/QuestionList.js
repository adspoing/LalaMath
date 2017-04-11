import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import { Tree, Input, Button,Select} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import {changeindex} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

let queryValue;

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const x = 3;
const y = 2;
const z = 1;
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
      showQuestion =()=>{
          console.log(queryValue);
          this.props.actions.changeindex(queryValue);
      }
    render() {
        console.log(Input);
          const { searchValue, expandedKeys, autoExpandParent } = this.state;
          const loop = data => data.map((item) => {
          const index = item.key.search(searchValue);
          const beforeStr = item.key.substr(0, index);
          const afterStr = item.key.substr(index + searchValue.length);
          const title = index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : <span>{item.key}</span>;
          if (item.children) {
            return (
              <TreeNode key={item.key} title={title}>
                {loop(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode key={item.key} title={title} />;
        });
          let quesList=[];
          var quesdata=this.props.questionData;
          for(var i=0;i<quesdata.length;i++){
              quesList.push(<div>{quesdata[i].fields.code}</div>);
          }
          console.log(quesList);
        return (
            <div>
                <Header />
                <SideBar />
                <div className="wrapper">
                    <Select
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
// <Tree
                    //   onExpand={this.onExpand}
                    //   expandedKeys={expandedKeys}
                    //   autoExpandParent={autoExpandParent}
                    //   >
                    //   {loop(gData)}
                    // </Tree>