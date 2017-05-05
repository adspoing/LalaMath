import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import {loaddata} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import '../css/Dashboard.less';


class Dashboard extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Dashboard';
    }
    componentDidMount = () =>{
          console.log("aa");
          if(this.props.allData.length==0){
            axios.get('http://lala.ust.hk:8000/get/questions/all')
            .then(res => {
              this.props.actions.loaddata(res.data);
            });
          }
      }
     render() {
        return (
        	<div>
	        	<Header />
                <SideBar />
                <div className="wrapper">
                    <div className="dashboard-content">
                    <p>
                    Hi, I am Lala. LA stands for learning assistant, which is my sole role: to assist your learning with the goal of maximizing your learning efficiency. So don't get me wrong: I may be helpful to teaching but that is not my mission. My mission is to assist you, rather than the teacher.  </p>
                  <p>
              What I believe. Everyone's time is precious, so is yours. You have a lot of daily chore to do: classes to attend, books to read, dances to dance, datings to date  ... Every bit of time you spend on learning need to be the most effective. And I can help to make it happen.  </p>
            <p>What I can do for you.   I prepare for you all the materials most directly related to the course: syllabus, lecture notes, videos, examples, exercises, ... I can help identify where you need to work harder on to improve and where you can spend less time. After each exercise, I suggest in my opinion the most appropriate action, to read which lecture notes, watch which relevant videos, try which exercises, etc. I present in graphics your status quo of learning the knowledge points chapter by chapter. For details, see <Link to="/Userguide">user’s guide</Link>. The upshot is my assistance will help you cultivate a sense of judgment on what to do and not to do in order to increase your learning efficiency in the future.</p>    
<p>Make you smarter, make me smarter.   My mission of assisting you can be achieved only if you allow me the opportunities by accessing and using the system frequently. Your frequent use of the system will give me more data to learn about you and make better judgments of your needs and in the end make me smarter. A smarter me will do my job better and make you smarter in the learning process. So please submit your valuable comments/suggestions to make me smarter. Use the system more frequently, even after the semester!  </p>
 <p>Anyone can become smarter by smart learning. No one is born smart. That is  </p>
<p>"No smart learner; only smart learning."</p>
                    </div>            
               </div>
        	</div>
        )
    }
}

// export default Dashboard;
function mapStateToProps (state){
    return { 
      allData:state.question.allData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            loaddata
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);