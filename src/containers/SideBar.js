import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
const SubMenu = Menu.SubMenu;


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideBar';
    }
    state = {
    current: '1',
    openKeys: [],
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
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
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
    render() {
        return (
            <div className="sidebar">
            	<Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    style={{ width: 240 }}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                    >
                    <SubMenu key="sub1" title={<span><Icon type="book" /><span>Chapter</span></span>}>
                      <Menu.Item key="1">Chapter 1</Menu.Item>
                      <Menu.Item key="2">Chapter 2</Menu.Item>
                      <Menu.Item key="3"><Link to="/Questions">Chapter 3</Link></Menu.Item>
                      <Menu.Item key="4">Chapter 4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Profile</span></span>}>
                      <Menu.Item key="5"><Link to="/Chart">Chart</Link></Menu.Item>
                      <Menu.Item key="6">Hotest</Menu.Item>
                      <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                      </SubMenu>
                    </SubMenu>
                     <SubMenu key="sub4" title={<span><Icon type="folder" /><span>Problem List</span></span>}>
                      <Menu.Item key="18">Problem</Menu.Item>
                      <Menu.Item key="19">Example</Menu.Item>
                      <Menu.Item key="20">Exercise</Menu.Item>
                      <Menu.Item key="21">DIY</Menu.Item>
                      <Menu.Item key="22">Quiz</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="23"><Link to="/QuestionList"><Icon type="search" />Search</Link></Menu.Item>
                    <Menu.Item key="17"><Icon type="user" />My corner</Menu.Item>
                    <Menu.Item key="13"><Icon type="file-text" />Syllabus</Menu.Item>
                    <Menu.Item key="14"><Icon type="file-ppt" />Lecture notes</Menu.Item>
                    <Menu.Item key="15"><Icon type="video-camera" />Videos</Menu.Item>                   
                    <Menu.Item key="16"><Icon type="smile-o" />Suggestions</Menu.Item>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Settings</span></span>}>
                      <Menu.Item key="9">Option 9</Menu.Item>
                      <Menu.Item key="10">Option 10</Menu.Item>
                      <Menu.Item key="11">Option 11</Menu.Item>
                      <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default SideBar;
