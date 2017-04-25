import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Table,Input,message} from 'antd';
import { Link } from 'react-router'
import axios from 'axios';
import qs from 'qs';
import '../css/Suggestion.less';

class Suggestion extends React.Component {
	constructor(props) {
        super(props);   
        this.displayName = 'Suggestion';
        this.state = {
            commentvalue:"",
            commentoriginData:[],
        }
    }

    componentWillUpdate = () =>{
       // let uurl="http://lala.ust.hk:8000/get/api/suggestions/system/all";
       //  axios.get(uurl)
       //      .then(res => {
       //          this.setState({commentoriginData:res.data});
       //      });
    }
    componentWillMount = () =>{
       let uurl="http://lala.ust.hk:8000/get/api/suggestions/system/all";
        axios.get(uurl)
            .then(res => {
                this.setState({commentoriginData:res.data});
        });
    }

    submitcomment = () =>{
        var userid = this.getCookie("id");
        var username = this.getCookie("userid");
        //var userid=14;
        //var username="chuac";
        let urlcomment="http://lala.ust.hk:8000/get/api/suggestions/system/upload";
        axios.post(urlcomment, 
          qs.stringify({
            'userid':userid,
            'username':username,
            'comment':this.state.commentvalue,
         })
          );
        //console.log(this.state.commentvalue);
        message.success('Thanks for your comment');
        let uurl="http://lala.ust.hk:8000/get/api/suggestions/system/all";
        axios.get(uurl)
            .then(res => {
                this.setState({commentoriginData:res.data});
        });
      }
    handleComment = (e) =>{
           this.setState({ commentvalue :e.target.value });
        }
    getCookie = (name) =>{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
        }
    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
          }, {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
          }];
        let commentdata = [];
        for(var i=0;i<this.state.commentoriginData.length;i++){
           var tm=new Object();
           tm.name=this.state.commentoriginData[i].fields.username;
           tm.comment=this.state.commentoriginData[i].fields.comment;
           tm.time=this.state.commentoriginData[i].fields.time;
           tm.key=i;
           commentdata.push(tm);
        }
        return (
        	<div>
                <Header />
                <SideBar />
                <div className="wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Dashboard"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/Suggestion">
                      <Icon type="file-text" />
                      <span>Suggestion</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="submit">
                <Input type="textarea" placeholder="Input your comment" autosize autosize={{ minRows: 10, maxRows: 15 }}
                                onChange={this.handleComment} value={this.state.commentvalue}/>
                <Button style={{marginTop: '10px'}} icon="mail" size="large" onClick = {this.submitcomment}>submit</Button>
                </div>
                <div className="suggestions"> 
                <Table dataSource={commentdata} columns={columns} />
                </div>
                </div>
            </div>
        )
    }
}

export default Suggestion;
