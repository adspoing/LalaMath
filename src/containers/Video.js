import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Table} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;

class Video extends React.Component {
	constructor(props) {
        super(props);   
        this.displayName = 'Video';
    }

     render() {
        const dataSource = [
                {   
                    key:'1',
                    date:'3 Apr 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170403_66396'},
                {   
                    key:'2',
                    date:'29 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170329_25132'},
                {   
                    key:'3',
                    date:'27 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170327_65121'},
                {   
                    key:'4',
                    date:'22 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170322_79252'},
                {   
                    key:'5',
                    date:'20 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170320_92108'},
                {   
                    key:'6',
                    date:'15 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170315_17284'},
                {   
                    key:'7',
                    date:'13 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170313_12349'},
                {   
                    key:'8',
                    date:'8 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170308_46214'},
                {   
                    key:'9',
                    date:'6 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170306_39112'},
                {   
                    key:'10',
                    date:'1 Mar 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170301_36568'},
                {   
                    key:'11',
                    date:'27 Feb 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170227_30887'},
                {   
                    key:'12',
                    date:'22 Feb 201',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170222_92036'},
                {   
                    key:'13',
                    date:'20 Feb 201',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170220_37242'},
                {   
                    key:'14',
                    date:'15 Feb 201',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170215_18777'},
                {   
                    key:'15',
                    date:'13 Feb 201',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170213_15414'},
                {   
                    key:'16',
                    date:'6 Feb 2017',
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170206_15639'},
                {   
                    key:'17',
                    date:'1 Feb 2017',            
                    link:'http://rvc.ust.hk/mgmt/media.aspx?path=17SP_MATH3425-L1_170201_92630'},];

        const columns = [{
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                }, {
                  title: 'Link',
                  dataIndex: 'link',
                  key: 'link',
                  render: text => <a href={text}>{text}</a>,
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
                    <Breadcrumb.Item href=""> <Link to="/Video">
                      <Icon type="file-text" />
                      <span>Video</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                <Table dataSource={dataSource} columns={columns} />
                </div>
                </div>
            </div>
        )
    }
}

export default Video;
