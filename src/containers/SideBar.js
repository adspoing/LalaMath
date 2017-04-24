import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeindexbyid,sideopenchange,sideclick} from '../actions/actions.js'

const SubMenu = Menu.SubMenu;


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideBar';
    }
    state = {
    // current: '1',
    openKeys: [],
  }
  handleClick = (e) => {
    // console.log('Clicked: ', e);
    this.props.actions.sideclick(e.key);
    // this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
     // this.props.actions.sideopenchange(nextOpenKeys);
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  fetchThings = () =>{
  }
    render() {
        return (
            <div className="sidebar">
            	<Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    // openKeys={this.props.openKeys}
                    // selectedKeys={[this.state.current]}
                    selectedKeys={[this.props.current]}
                    style={{ width: 240 }}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                    >
                    <Menu.Item key="1"><Link to="/Dashboard"><Icon type="home" />Introduction</Link></Menu.Item>                   
                    <Menu.Item key="2"><Icon type="user" />My corner</Menu.Item>
                    <Menu.Item key="3"><Link to="/Syllabus"><Icon type="file-text" />Syllabus</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/LectureNotes"><Icon type="file-ppt" />Lecture notes</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/Chart"><Icon type="picture" />Knowledge graph</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/Example"><Icon type="database" />Show room</Link></Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="book" /><span>Play ground</span></span>}>
                      <Menu.Item key="7"><Link to="/Exercise">Exercise</Link></Menu.Item>
                      <Menu.Item key="8"><Link to="/Problem">Problem</Link></Menu.Item>
                      <Menu.Item key="9"><Link to="/Diy">DIY</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="10"><Link to="/QuizList"><Icon type="appstore" />Quiz</Link></Menu.Item>                   
                    <Menu.Item key="11"><Link to="/QuestionList"><Icon type="search" />Search</Link></Menu.Item>
                    <Menu.Item key="12"><Icon type="star" />Hottest</Menu.Item>                   
                    <Menu.Item key="13"><Link to="/Video"><Icon type="video-camera" />Videos</Link></Menu.Item>                   
                    <Menu.Item key="14"><Icon type="smile-o" />Suggestions</Menu.Item>
                    <Menu.Item key="15"><Icon type="setting" />Settings</Menu.Item>
                </Menu>
            </div>
        )
    }
}
function mapStateToProps (state){
    return { 
        // current:
        current:state.question.current,
        openKeys:state.question.openKeys,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
          sideopenchange,
          sideclick
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);



// export default SideBar;
