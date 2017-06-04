import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification,Rate } from 'antd';
// import Data from '../problem.js';
// import AllData from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message,Input,Spin,Table} from 'antd';
import {changeindexbyid,prevproblem,nextproblem,changeproblemdata,loaddata,setchapter,} from '../actions/actions.js'
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
class ProblemList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProblemList';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             index: this.props.problemIndex,
             mathjax: MathJax,
             showResults: false,
             showAns: false,
             value: 0,
             selvalue: 0,
             loading:true,
             Likeability:3,
             Difficulty:3,
             Useful:3,
             commentvalue:"",
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
        // this.props.clickSubmitQuestion();
        let Data=this.props.problemData;
        if(Data[this.props.problemIndex].fields.answer==this.state.selvalue){
            var config={};
            config.description=Data[this.props.problemIndex].fields.messagesuccess;
            config.message="Right";
            config.duration=10;
            config.placement="topLeft";
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.problemIndex].fields.messagefailure;
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
        var questionid = Data[this.props.problemIndex].pk;
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
          let Data=this.props.problemData;
          urlLikeability+=Data[this.props.problemIndex].pk;
          urlLikeability+="/prefer?choice=";
          urlLikeability+=this.state.Likeability;

          let urlDifficulty="http://lala.ust.hk:8000/get/api/users/";
          urlDifficulty+=userid;
          urlDifficulty+="/questions/";
          urlDifficulty+=Data[this.props.problemIndex].pk;
          urlDifficulty+="/hardnesss?choice=";
          urlDifficulty+=this.state.Difficulty;

          let urlUseful="http://lala.ust.hk:8000/get/api/users/";
          urlUseful+=userid;
          urlUseful+="/questions/";
          urlUseful+=Data[this.props.problemIndex].pk;
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
              'questionid':Data[this.props.problemIndex].pk
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
             commentoriginData:[],
             hasrecommend:false});
    }
    prevQuestion = () =>{
        this.props.actions.prevproblem();
        this.setState({ showResults: false,showAns: false,value: 0, selvalue: 0,
             hastwin:false,
             commentoriginData:[],
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
        this.setState({hastwin:true});
        // twinProblem=value;
      }
      RecommendProblemChange = (value) =>{
        let AllData=this.props.allData;
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        RecommendProblem=pkIndex[value];
        this.setState({hasrecommend:true});
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
      // submitcomment = () =>{
      //     message.success('Thanks for your comment');
      // }

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
          if(this.props.problemData.length==0){
              axios.get('http://lala.ust.hk:8000/get/questions/all?category=3')
              .then(res => {
                this.props.actions.changeproblemdata(res.data);
              });
          }else{
              this.setState({loading: false});
          }
      }
    querycomment = () =>{
        let uurl="http://lala.ust.hk:8000/get/api/suggestions/question/all?questionid=";
                  let Data=this.props.problemData;
                  if(this.props.problemData.length!=0){
                      uurl+=Data[this.props.problemIndex].pk;
                      axios.get(uurl)
                      .then(res => {
                      this.setState({commentoriginData:res.data});
                        // this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
                      });
      } 
     }
    render() {
        let AllData=this.props.allData;
        let Data=this.props.problemData;
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
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
        if(AllData.length!=0){
              if(Data[this.props.problemIndex].fields.choicesa!=null){
                  choiceA+=Data[this.props.problemIndex].fields.choicesa;
              }
              
              if(Data[this.props.problemIndex].fields.choicesb!=null){
                  choiceB+=Data[this.props.problemIndex].fields.choicesb;
              }if(Data[this.props.problemIndex].fields.choicesc!=null){
                  choiceC+=Data[this.props.problemIndex].fields.choicesc;
              }if(Data[this.props.problemIndex].fields.choicesd!=null){
                  choiceD+=Data[this.props.problemIndex].fields.choicesd;
              }if(Data[this.props.problemIndex].fields.choicese!=null){
                  choiceE+=Data[this.props.problemIndex].fields.choicese;
              }if(Data[this.props.problemIndex].fields.choicesf!=null){
                  choiceF+=Data[this.props.problemIndex].fields.choicesf;
              }

              var twinOption=[];
              for(var i=0;i<Data[this.props.problemIndex].fields.twinproblems.length;i++){
                  var indexx=Data[this.props.problemIndex].fields.twinproblems[i];
                  var iddd=AllData[pkIndex[indexx]].fields.code;
                  twinOption.push(<Option key={iddd+""} value={Data[this.props.problemIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
              }
              var recommendOption=[];
              if(Data[this.props.problemIndex].fields.answer==this.state.selvalue){
                  for(var i=0;i<Data[this.props.problemIndex].fields.rightproblems.length;i++){
                  var indexx=Data[this.props.problemIndex].fields.rightproblems[i];
                  var iddd=AllData[pkIndex[indexx]].fields.code;
                  recommendOption.push(<Option key={iddd+""} value={Data[this.props.problemIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
                  }
              }
              else{
                  for(var i=0;i<Data[this.props.problemIndex].fields.wrongproblems.length;i++){
                  var indexx=Data[this.props.problemIndex].fields.wrongproblems[i];
                  var iddd=AllData[pkIndex[indexx]].fields.code;
                  recommendOption.push(<Option key={iddd+""} value={Data[this.props.problemIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
                  }
              }
              var neurondiv = [];
              neurondiv.push(<span> Related Neurons: </span>)
              var neuronsinformation = Data[this.props.problemIndex].fields.linkneuron;
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
                        <Breadcrumb.Item href=""> <Link to="/Problem">
                          <Icon type="book" />
                          <span>Problem List</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href=""> <Link to="/ProblemForm">
                          <Icon type="file-text" />
                          <span>ProblemForm</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {Data.length!=0?questype[Data[this.props.problemIndex].fields.category]:null}
                            {Data.length!=0?Data[this.props.problemIndex].fields.code:null}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/problemForm">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <Spin spinning={this.state.loading} tip="Loading questions...">
                        <div id="output" className="questionstem">{
                          Data.length!=0?Data[this.props.problemIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }):null}
                         {Data.length!=0?Data[this.props.problemIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture1}/>:null}
                         {Data.length!=0?Data[this.props.problemIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture2}/>:null}
                         {Data.length!=0?Data[this.props.problemIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture3}/>:null}
                         {Data.length!=0?Data[this.props.problemIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture4}/>:null}
                         {Data.length!=0?Data[this.props.problemIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture5}/>:null}
                         {Data.length!=0?Data[this.props.problemIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture6}/>:null}
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
                          { Data.length!=0?this.state.showAns?Data[this.props.problemIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null :null}
                          <div> 
                             { Data.length!=0?this.state.showAns?Data[this.props.problemIndex].fields.alternativesolutions?
                               <div style={{fontSize:16}}>Alternative Solutions</div>
                              :null: null :null}
                          </div>
                          { Data.length!=0?this.state.showAns?Data[this.props.problemIndex].fields.alternativesolutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null :null}
                         {Data.length!=0?this.state.showAns?Data[this.props.problemIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.solutionspicture1}/>:null:null}
                         {Data.length!=0?this.state.showAns?Data[this.props.problemIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.solutionspicture2}/>:null:null}
                         {Data.length!=0?this.state.showAns?Data[this.props.problemIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.solutionspicture3}/>:null:null}
                          <div style={{marginTop: '20px'}}>{Data.length!=0?this.state.showAns?neuronsinformation.length==0?null:neurondiv:null:null}</div>
                          <div style={{marginTop: '20px'}}>{ this.state.showAns?
                                 <Select
                                    style={{ width: 200}}
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
                        </Spin>
                      </div>
                  </div>
                </div>
                </div>
            </div>
        )
    }
}

        //<div className="problemcomment"> { this.state.showAns?"Giving an comment on this problem":null}</div>
          //                 { this.state.showAns?<Rate />:null}
            //               { this.state.showAns?<Button onClick = {this.submitcomment}>submit</Button>:null}
function mapStateToProps (state){
    return { 
            Data:state.question.questionData,
            problemIndex:state.question.problemIndex,
            index:state.question.index,
            allData:state.question.allData,
            problemData:state.question.problemData  
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevproblem,
            nextproblem,
            changeproblemdata,
            loaddata,
            setchapter,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);

