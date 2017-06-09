import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
// import Data from '../quiz.js';
// import AllData from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message,Rate,Spin} from 'antd';
import {changeindexbyid,prevquiz,nextquiz,changequizdata,loaddata} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import qs from 'qs';

const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;
var twinProblem;
var RecommendProblem;
class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QuizList';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             // index: this.props.quizIndex,
             mathjax: MathJax,
             showResults: false,
             showAns: false,
             value: 0,
             selvalue: 0
        }
    }
    handleChange(value){
        this.setState({ selvalue: value });
    }   
    submitQuestion = () =>{
        // this.props.clickSubmitQuestion();
        let Data=this.props.quizData;
        if(Data[this.props.quizIndex].fields.answer==this.state.selvalue){
            var config={};
            config.description=Data[this.props.quizIndex].fields.messagesuccess;
            config.message="Right";
            config.duration=10;
            config.placement="topLeft";
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.quizIndex].fields.messagefailure;
            config.message="Wrong";
            config.duration=10;
            config.placement="topLeft";
            notification.error(config);
        }
        this.setState({ showResults: true });
      var url="http://lala.ust.hk:8000/get/api/users/";
        var userid = this.getCookie("id");
        // var userid = 14;
        url+=userid;
        var questionid = Data[this.props.quizIndex].pk;
        url+="/questions/";
        url+=questionid;
        // console.log(this.state.selvalue);
        // console.log(url);
        // console.log(this.getCookie("userid"));
        // axios.post('/foo', qs.stringify({ 'bar': 123 });

        axios.post(url, 
          qs.stringify({
            'choice':this.state.selvalue,
          })
        )
        this.setState({ showResults: true });
    }
    getCookie = (name) =>{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }
    nextQuestion = () =>{
        this.props.actions.nextquiz();
        this.setState({ showResults: false,showAns: false, value: 0, selvalue: 0});
    }
    prevQuestion = () =>{
        this.props.actions.prevquiz();
        this.setState({ showResults: false,showAns: false,value: 0, selvalue: 0});
    }
    favoriteQuestion = () =>{
        let Data=this.props.quizData;
        var userid = this.getCookie("id");
        // var userid = 14;
        var questionid = Data[this.props.quizIndex].pk;
        let url = "http://lala.ust.hk:8000";
        url+="/get/api/users/";
        url+=userid;
        url+="/questionslikes/";
        url+=questionid;
        axios.get(url)
        .then(function (response) {
          if(response.data=="w"){
             message.success('Successfully delete it from the favorite list');
          }
          else{
             message.success('Successfully add it to the favorite list');
          }
        })
    }
    componentDidMount = () =>{   
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    componentDidUpdate = () =>{
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    showAns = () =>{
        this.setState({ showAns: true});
    }
    onChange = (e) => {
        // console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
          selvalue: e.target.value,
        });
        // selvalue=e.target.value;
      }
      showQuestion =(e)=>{
        // console.log(e.target.value);
      }
      twinProblemChange = (value) =>{
          let AllData=this.props.allData;
         var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        twinProblem=pkIndex[value];
        // twinProblem=value;
      }
      RecommendProblemChange = (value) =>{
        let AllData=this.props.allData;
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        RecommendProblem=pkIndex[value];
        // RecommendProblem=value;
      }
      showTwinProblem = () =>{
        this.props.actions.changeindexbyid(twinProblem);
        this.setState({ showResults: false,showAns: false, value: 0});
      }
      showRecommendProblem = () =>{
        this.props.actions.changeindexbyid(RecommendProblem);
        this.setState({ showResults: false,showAns: false, value: 0});
      }
      submitcomment = () =>{
          message.success('Thanks for your comment');
      }
     componentWillMount = () =>{
          if(this.props.allData.length==0){
            axios.get('http://lala.ust.hk:8000/get/questions/all')
            .then(res => {
              this.props.actions.loaddata(res.data);
              this.setState({loading: false});
            });
          }else{
              this.setState({loading: false});
          }
          if(this.props.quizData.length==0){
              axios.get('http://lala.ust.hk:8000/get/questions/all?category=5')
              .then(res => {
                this.props.actions.changequizdata(res.data);
              });
          }else{
              this.setState({loading: false});
          }
      }
    render() {
        // let Data=this.props.Data;
        // console.log(Data)
        // console.log(AllData)
        // console.log(this.props.quizIndex)
        let AllData=this.props.allData;
        let Data=this.props.quizData;
        // console.log(this.props.quizIndex);
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        // console.log(pkIndex);
        var choiceA="";
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        if(Data.length!=0){
                if(Data[this.props.quizIndex].fields.choicesa!=null){
                    choiceA+=Data[this.props.quizIndex].fields.choicesa;
                }
                if(Data[this.props.quizIndex].fields.choicesb!=null){
                    choiceB+=Data[this.props.quizIndex].fields.choicesb;
                }if(Data[this.props.quizIndex].fields.choicesc!=null){
                    choiceC+=Data[this.props.quizIndex].fields.choicesc;
                }if(Data[this.props.quizIndex].fields.choicesd!=null){
                    choiceD+=Data[this.props.quizIndex].fields.choicesd;
                }if(Data[this.props.quizIndex].fields.choicese!=null){
                    choiceE+=Data[this.props.quizIndex].fields.choicese;
                }if(Data[this.props.quizIndex].fields.choicesf!=null){
                    choiceF+=Data[this.props.quizIndex].fields.choicesf;
                }
                var twinOption=[];
                for(var i=0;i<Data[this.props.quizIndex].fields.twinproblems.length;i++){
                    var indexx=Data[this.props.quizIndex].fields.twinproblems[i];
                    var iddd=AllData[pkIndex[indexx]].fields.code;
                    twinOption.push(<Option key={iddd+""} value={Data[this.props.quizIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
                }
                var recommendOption=[];
                if(Data[this.props.quizIndex].fields.answer==this.state.selvalue){
                    for(var i=0;i<Data[this.props.quizIndex].fields.rightproblems.length;i++){
                    var indexx=Data[this.props.quizIndex].fields.rightproblems[i];
                    var iddd=AllData[pkIndex[indexx]].fields.code;
                    recommendOption.push(<Option key={iddd+""} value={Data[this.props.quizIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
                    }
                }
                else{
                    for(var i=0;i<Data[this.props.quizIndex].fields.wrongproblems.length;i++){
                    var indexx=Data[this.props.quizIndex].fields.wrongproblems[i];
                    var iddd=AllData[pkIndex[indexx]].fields.code;
                    recommendOption.push(<Option key={iddd+""} value={Data[this.props.quizIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
                    }
                }
        }
        return (
            <div>
                <div className="exam-bg">
                <div className="questionwrapper">
                <div className="inner-wrapper">
                    <div className="questionHeader">
                        <Breadcrumb>
                        <Breadcrumb.Item href="">
                          <Link to="/Dashboard"><Icon type="home" />Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {Data.length!=0?questype[Data[this.props.quizIndex].fields.category]:null}
                            {Data.length!=0?Data[this.props.quizIndex].fields.code:null}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/Dashboard">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                                <Button type="favorite" className="favoriteQuestion" onClick = {this.favoriteQuestion}>Favorite</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <Spin spinning={this.state.loading} tip="Loading questions...">
                        <div id="output" className="questionstem">{Data.length!=0?Data[this.props.quizIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }):null}
                         {Data.length!=0?Data[this.props.quizIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture1}/>:null}
                         {Data.length!=0?Data[this.props.quizIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture2}/>:null}
                         {Data.length!=0?Data[this.props.quizIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture3}/>:null}
                         {Data.length!=0?Data[this.props.quizIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture4}/>:null}
                         {Data.length!=0?Data[this.props.quizIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture5}/>:null}
                         {Data.length!=0?Data[this.props.quizIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture6}/>:null}
                        </div>
                        <div className="questionchoice">
                          <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <div>{choiceA==""?"":<div><Radio style={radioStyle} value={"A"}><div className="choicecontent">{choiceA.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceB==""?"":<div><Radio style={radioStyle} value={"B"}><div className="choicecontent">{choiceB.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceC==""?"":<div><Radio style={radioStyle} value={"C"}><div className="choicecontent">{choiceC.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceD==""?"":<div><Radio style={radioStyle} value={"D"}><div className="choicecontent">{choiceD.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceE==""?"":<div><Radio style={radioStyle} value={"E"}><div className="choicecontent">{choiceE.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceF==""?"":<div><Radio style={radioStyle} value={"F"}><div className="choicecontent">{choiceF.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                          </RadioGroup>
                        </div>
                        <div className="questionanswer">
                        <div className="questionbutton">
                                {this.state.selvalue==0?
                                  <Button className="submitQuestion" type="submit" disabled>Submit</Button>:
                                    <Popconfirm placement="top" title={"Are you sure to submit?"} onConfirm={this.submitQuestion} okText="Yes" cancelText="No">
                                      <Button className="submitQuestion" type="submit">Submit</Button>
                                    </Popconfirm>
                                }
                          </div>
                          <div className="questionbutton">{ this.state.showResults?<Button className="submitQuestion" onClick = {this.showAns}>Show Result</Button>: null }</div>
                          <div className="questionresult">
    
                          {Data.length!=0? this.state.showAns?Data[this.props.quizIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null :null}
                         {Data.length!=0?this.state.showAns?Data[this.props.quizIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.solutionspicture1}/>:null:null}
                         {Data.length!=0?this.state.showAns?Data[this.props.quizIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.solutionspicture2}/>:null:null}
                         {Data.length!=0?this.state.showAns?Data[this.props.quizIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.solutionspicture3}/>:null:null}
            
                            </div>
                 
                        </div>
                        </Spin>
                      </div>
                  </div>
                </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps (state){
    return { 
            allData:state.question.allData,
            quizData:state.question.quizdata,
            quizIndex:state.question.quizIndex
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevquiz,
            nextquiz,
            changequizdata,
            loaddata
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
   
