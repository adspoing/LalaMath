import { browserHistory } from 'react-router'
import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification,Rate } from 'antd';
// import Data from '../problem.js';
// import Data from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message,Input,Table} from 'antd';
import {changeindexbyid,prevproblem,nextproblem,setchapter} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/ProblemList.less';
const Option = Select.Option;
const RadioGroup = Radio.Group;
import axios from 'axios';
import qs from 'qs';

var selvalue;
var twinProblem;
var RecommendProblem;
class VQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'VQuestion';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             index: this.props.questionIndex,
             mathjax: MathJax,
             showResults: false,
             showAns: false,
             value: 0,
             selvalue: 0,
             hastwin:false,
             hasrecommend:false,
             commentoriginData:[],
        }
    }
    handleChange(value){
        // console.log(`selected ${value}`);
        // selvalue=value;
        this.setState({ selvalue: value });
        // console.log(selvalue);
    }   
    submitQuestion = () =>{
        let Data=this.props.allData;
        console.log(this.props.questionIndex);
        if(Data[this.props.questionIndex].fields.answer==this.state.selvalue){
            var config={};
            config.description=Data[this.props.questionIndex].fields.messagesuccess;
            config.message="Right";
            config.duration=10;
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.questionIndex].fields.messagefailure;
            config.message="Wrong";
            config.duration=10;
            notification.error(config);
        }
        this.setState({ showResults: true });
        var url="http://lala.ust.hk:8000/get/api/users/";
        var userid = this.getCookie("id");
        // var userid = 14;
        url+=userid;
        var questionid = Data[this.props.questionIndex].pk;
        url+="/questions/";
        url+=questionid;
        console.log(this.state.selvalue);
        console.log(url);
        console.log(this.getCookie("userid"));
        // axios.post('/foo', qs.stringify({ 'bar': 123 });

        axios.post(url, 
          qs.stringify({
            'choice':this.state.selvalue,
          })
        )
        this.setState({ showResults: true });
    }
    handleLikeability = (value) =>{
        this.setState({ Likeability:value });
    }
    handleDifficulty = (value) =>{
        this.setState({ Difficulty:value });
    }
    handleUseful = (value) =>{
        this.setState({ Useful :value });
    }
    handleComment = (e) =>{
       this.setState({ commentvalue :e.target.value });
    }
    submitcomment = () =>{
          let urlLikeability="http://lala.ust.hk:8000/get/api/users/";
          var userid = this.getCookie("id");
          var username = this.getCookie("userid");
          // userid=14;
          // username="chuac";
          urlLikeability+=userid;
          urlLikeability+="/questions/";
          let Data=this.props.allData;
          urlLikeability+=Data[this.props.questionIndex].pk;
          urlLikeability+="/prefer?choice=";
          urlLikeability+=this.state.Likeability;

          let urlDifficulty="http://lala.ust.hk:8000/get/api/users/";
          urlDifficulty+=userid;
          urlDifficulty+="/questions/";
          urlDifficulty+=Data[this.props.questionIndex].pk;
          urlDifficulty+="/hardnesss?choice=";
          urlDifficulty+=this.state.Difficulty;

          let urlUseful="http://lala.ust.hk:8000/get/api/users/";
          urlUseful+=userid;
          urlUseful+="/questions/";
          urlUseful+=Data[this.props.questionIndex].pk;
          urlUseful+="/usefuls?choice=";
          urlUseful+=this.state.Useful;
          let urlcomment="http://lala.ust.hk:8000/get/api/suggestions/question/upload";

          axios.get(urlLikeability);
          axios.get(urlDifficulty);
          axios.get(urlUseful)
          if(this.state.commentvalue!=''){
            axios.post(urlcomment, 
            qs.stringify({
              'userid':userid,
              'username':username,
              'comment':this.state.commentvalue,
              'questionid':Data[this.props.questionIndex].pk
            })
            );
          }
          message.success('Thanks for your comment');
      }
    getCookie = (name) =>{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }
    nextQuestion = () =>{
        this.props.actions.nextproblem();
        this.setState({ showResults: false,showAns: false, value: 0, selvalue: 0,
             hastwin:false,
             hasrecommend:false});
    }
    prevQuestion = () =>{
        this.props.actions.prevproblem();
        this.setState({ showResults: false,showAns: false,value: 0, selvalue: 0,
             hastwin:false,
             hasrecommend:false});
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
        this.setState({
          value: e.target.value,
          selvalue: e.target.value
        });
      }
      showQuestion =(e)=>{
      }
      twinProblemChange = (value) =>{
        let Data=this.props.allData;
         var pkIndex=[];
        for(var i=0;i<Data.length;i++){
          pkIndex[Data[i].pk]=i;
        }
        twinProblem=pkIndex[value];
        this.setState({hastwin:true});
      }
      RecommendProblemChange = (value) =>{
        let Data=this.props.allData;
        var pkIndex=[];
        for(var i=0;i<Data.length;i++){
          pkIndex[Data[i].pk]=i;
        }
        RecommendProblem=pkIndex[value];
        this.setState({hasrecommend:true});
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
    querycomment = () =>{
        let uurl="http://lala.ust.hk:8000/get/api/suggestions/question/all?questionid=";
                  let Data=this.props.allData;
                  if(this.props.allData.length!=0){
                      uurl+=Data[this.props.questionIndex].pk;
                      axios.get(uurl)
                      .then(res => {
                      this.setState({commentoriginData:res.data});
                        // this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
                      });
      } 
     }
    render() {
        let Data=this.props.allData;
        var pkIndex=[];
        for(var i=0;i<Data.length;i++){
          pkIndex[Data[i].pk]=i;
        }
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
        var choiceA="";
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        if(Data.length!=0){
              if(Data[this.props.questionIndex].fields.choicesa!=null){
                  choiceA+=Data[this.props.questionIndex].fields.choicesa;
              }
              if(Data[this.props.questionIndex].fields.choicesb!=null){
                  choiceB+=Data[this.props.questionIndex].fields.choicesb;
              }if(Data[this.props.questionIndex].fields.choicesc!=null){
                  choiceC+=Data[this.props.questionIndex].fields.choicesc;
              }if(Data[this.props.questionIndex].fields.choicesd!=null){
                  choiceD+=Data[this.props.questionIndex].fields.choicesd;
              }if(Data[this.props.questionIndex].fields.choicese!=null){
                  choiceE+=Data[this.props.questionIndex].fields.choicese;
              }if(Data[this.props.questionIndex].fields.choicesf!=null){
                  choiceF+=Data[this.props.questionIndex].fields.choicesf;
              }

              var twinOption=[];
              for(var i=0;i<Data[this.props.questionIndex].fields.twinproblems.length;i++){
                  var indexx=Data[this.props.questionIndex].fields.twinproblems[i];
                  var iddd=Data[pkIndex[indexx]].fields.code;
                  twinOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.twinproblems[i]}>{questype[Data[pkIndex[indexx]].fields.category]+iddd}</Option>)
              }
              var recommendOption=[];
              if(Data[this.props.questionIndex].fields.answer==this.state.selvalue){
                  for(var i=0;i<Data[this.props.questionIndex].fields.rightproblems.length;i++){
                  var indexx=Data[this.props.questionIndex].fields.rightproblems[i];
                  var iddd=Data[pkIndex[indexx]].fields.code;
                  recommendOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.rightproblems[i]}>{questype[Data[pkIndex[indexx]].fields.category]+iddd}</Option>)
                  }
              }
              else{
                  for(var i=0;i<Data[this.props.questionIndex].fields.wrongproblems.length;i++){
                  var indexx=Data[this.props.questionIndex].fields.wrongproblems[i];
                  var iddd=Data[pkIndex[indexx]].fields.code;
                  recommendOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.wrongproblems[i]}>{questype[Data[pkIndex[indexx]].fields.category]+iddd}</Option>)
                  }
              }
            var neurondiv = [];
            neurondiv.push(<span> Related Neurons: </span>)
            var neuronsinformation = Data[this.props.questionIndex].fields.linkneuron;
            for (var i = 0; i < neuronsinformation.length;++i){
                var chapter = neuronsinformation[i].chapter;
                neurondiv.push(<span onClick = {()=>this.props.actions.setchapter(chapter)}><Link to="/Chart">{neuronsinformation[i].title}</Link>;  </span>)                   
            } 
        }
        const columns = [{
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
           if(this.state.commentoriginData[i].fields.comment.length!=0){
             var tm=new Object();
             tm.comment=this.state.commentoriginData[i].fields.comment;
             tm.time=this.state.commentoriginData[i].fields.time.split('T')[0]+" "+this.state.commentoriginData[i].fields.time.split('T')[1];;
             tm.key=i;
             commentdata.push(tm);
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
                            {Data.length!=0?questype[Data[this.props.questionIndex].fields.category]:null}
                            {Data.length!=0?Data[this.props.questionIndex].fields.code:null}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button type="back" className="backQuestion" onClick = {browserHistory.goBack}>Back</Button>
                                <Button type="favorite" className="favoriteQuestion" onClick = {this.favoriteQuestion}>Favorite</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">
                         {Data.length!=0?Data[this.props.questionIndex].fields.category!=1?Data[this.props.questionIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }):
                         (Data[this.props.questionIndex].fields.problem+"<br>"+Data[this.props.questionIndex].fields.solutions).split("<br>").map(i => {
                           return <div>{i}</div>;
                          })
                         :null}
                         {Data.length!=0?Data[this.props.questionIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture1}/>:null}
                         {Data.length!=0?Data[this.props.questionIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture2}/>:null}
                         {Data.length!=0?Data[this.props.questionIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture3}/>:null}
                         {Data.length!=0?Data[this.props.questionIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture4}/>:null}
                         {Data.length!=0?Data[this.props.questionIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture5}/>:null}
                         {Data.length!=0?Data[this.props.questionIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture6}/>:null}

                         </div>
                         {Data[this.props.questionIndex].fields.category!=1?
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
                        </div>:null}
                        <div className="questionanswer">
                          {Data[this.props.questionIndex].fields.category!=1?
                          <div className="questionbutton">
                                {this.state.selvalue==0?
                                  <Button className="submitQuestion" type="submit" disabled>Submit</Button>:
                                    <Popconfirm placement="top" title={"Are you sure to submit?"} onConfirm={this.submitQuestion} okText="Yes" cancelText="No">
                                      <Button className="submitQuestion" type="submit">Submit</Button>
                                    </Popconfirm>
                                }                       
                          </div>:null}
                          <div className="questionbutton">{ this.state.showResults?<Button className="submitQuestion" onClick = {this.showAns}>Show Result</Button>: null }</div>
                          <div className="questionresult">
                          { Data.length!=0?this.state.showAns?Data[this.props.questionIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null :null}
                          <div> 
                             { Data.length!=0?this.state.showAns?Data[this.props.questionIndex].fields.alternativesolutions?
                               <div style={{fontSize:16}}>Alternative Solutions</div>
                              :null: null :null}
                          </div>
                          { Data.length!=0?this.state.showAns?Data[this.props.questionIndex].fields.alternativesolutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null :null}
                         {Data.length!=0?this.state.showAns?Data[this.props.questionIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.solutionspicture1}/>:null:null}
                         {Data.length!=0?this.state.showAns?Data[this.props.questionIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.solutionspicture2}/>:null:null}
                         {Data.length!=0?this.state.showAns?Data[this.props.questionIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.solutionspicture3}/>:null:null}
                          <div style={{marginTop: '20px'}}>{Data.length!=0?this.state.showAns?neuronsinformation.length==0?null:neurondiv:null:null}</div>
                          <div style={{marginTop: '20px'}}>{ this.state.showAns?
                                 <Select
                                    style={{ width: 200 }}
                                    // defaultValue={twinOption[0]}
                                    placeholder="Select a twin problem"
                                    optionFilterProp="children"
                                    onChange={this.twinProblemChange}
                                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                  >
                                     
                                     {twinOption}
                                  </Select>:null}
                               { this.state.showAns?this.state.hastwin?<Button style = {{marginLeft: '5px'}} onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>:<Button disabled style = {{marginLeft: '5px'}} onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                                
                                 { this.state.showAns?
                                   <Select
                                      style={{ width: 200,marginLeft: '10px'}}
                                    // defaultValue={twinOption[0]}
                                    placeholder="Select a Recommend problem"
                                    optionFilterProp="children"
                                    onChange={this.RecommendProblemChange}
                                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                  >
                                     
                                     {recommendOption}
                                  </Select>:null}
                                { this.state.showAns?this.state.hasrecommend?<Button style = {{marginLeft: '5px'}} onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button>:<Button disabled style = {{marginLeft: '5px'}} onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                                </div>
                            <div style={{marginTop: '20px'}} className="commentblock">
                             <div className="problemcomment"> { "Your evaluation is highly appreciated:"}</div>
                             <div>Likeability:<span className="problemrate">{ <Rate onChange={this.handleLikeability} value={this.state.Likeability} />}</span></div>
                             <div>Difficulty:<span className="problemrate2">{ <Rate onChange={this.handleDifficulty} value={this.state.Difficulty} />}</span></div>
                             <div>Useful:<span className="problemrate3">{ <Rate onChange={this.handleUseful} value={this.state.Useful} />}</span></div>
                            <Input type="textarea" placeholder="Input your comment" autosize autosize={{ minRows: 2, maxRows: 6 }}
                                  onChange={this.handleComment} value={this.state.commentvalue}/>
                            { <Button onClick = {this.submitcomment}>submit</Button>}
                            </div>
                            <div className="commentarea">Comment Area
                                <Button className="commentareabutton" onClick = {this.querycomment}>Show Comment</Button>
                            </div>
                           <Table columns={columns} dataSource={commentdata}/>
                          </div>
                        </div>
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
            Data:state.question.questionData,
            index:state.question.index,
            allData:state.question.allData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevproblem,
            nextproblem,
            setchapter,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VQuestion);

