// import React from 'react';
// import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
// import Data from '../data.js';
// import mySelect from './Select.js';
// import { Link } from 'react-router' // 引入Link处理导航跳转
// import { Button,Radio } from 'antd';
// import {changeindexbyid} from '../actions/actions.js'
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router'

// const Option = Select.Option;
// const RadioGroup = Radio.Group;

// var selvalue;
// var twinProblem;
// var RecommendProblem;
// class VQuestion extends React.Component {
//     constructor(props) {
//         super(props);
//         this.displayName = 'VQuestion';
//         this.state = {
//              index: this.props.questionIndex,
//              mathjax: this.props.mathjax,
//              showResults: false,
//              showAns: false,
//              value: 0
//         }
//     }
//     handleChange(value){
//         console.log(`selected ${value}`);
//         selvalue=value;
//         console.log(selvalue);
//     }   
//     submitQuestion = () =>{
//         this.props.clickSubmitQuestion();
//         if(Data[this.props.questionIndex].fields.answer==selvalue){
//             var config={};
//             config.description=Data[this.props.questionIndex].fields.messagesuccess;
//             config.message="success";
//             config.duration=0;
//             notification.success(config);
//         }
//         else
//         {
//             var config={};
//             config.description=Data[this.props.questionIndex].fields.messagefailure;
//             config.message="error";
//             config.duration=0;
//             notification.error(config);
//         }
//         this.setState({ showResults: true });
//     }
//     nextQuestion = () =>{
//         this.props.clickNextQuestion();
//         this.setState({ showResults: false,showAns: false, value: 0});
//     }
//     prevQuestion = () =>{
//         this.props.clickPrevQuestion();
//         this.setState({ showResults: false,showAns: false,value: 0});
//     }
//     componentDidMount = () =>{   
//         this.props.MathJax.Hub.Queue(["Typeset",this.props.MathJax.Hub],"output");
//     }
//     componentDidUpdate = () =>{
//         this.props.MathJax.Hub.Queue(["Typeset",this.props.MathJax.Hub],"output");
//     }
//     showAns = () =>{
//         this.setState({ showAns: true});
//     }
//     onChange = (e) => {
//         console.log('radio checked', e.target.value);
//         this.setState({
//           value: e.target.value,
//         });
//         selvalue=e.target.value;
//       }
//       showQuestion =(e)=>{
//         console.log(e.target.value);
//       }
//       twinProblemChange = (value) =>{
//         twinProblem=value;
//       }
//       RecommendProblemChange = (value) =>{
//         RecommendProblem=value;
//       }
//       showTwinProblem = () =>{
//         this.props.actions.changeindexbyid(twinProblem);
//         this.setState({ showResults: false,showAns: false, value: 0});
//       }
//       showRecommendProblem = () =>{
//         this.props.actions.changeindexbyid(RecommendProblem);
//         this.setState({ showResults: false,showAns: false, value: 0});
//       }

//     render() {
//         // let Data=this.props.Data;
//         console.log(Data)
//         console.log(this.props.questionIndex)
//         var choiceA="";
//         var choiceB="";
//         var choiceC="";
//         var choiceD="";
//         var choiceE="";
//         var choiceF="";
//         var result="";
//         if(Data[this.props.questionIndex].fields.choicesa!=null){
//             choiceA+=Data[this.props.questionIndex].fields.choicesa;
//         }
//         const radioStyle = {
//           height: '30px',
//           lineHeight: '30px',
//         };
//         if(Data[this.props.questionIndex].fields.choicesb!=null){
//             choiceB+=Data[this.props.questionIndex].fields.choicesb;
//         }if(Data[this.props.questionIndex].fields.choicesc!=null){
//             choiceC+=Data[this.props.questionIndex].fields.choicesc;
//         }if(Data[this.props.questionIndex].fields.choicesd!=null){
//             choiceD+=Data[this.props.questionIndex].fields.choicesd;
//         }if(Data[this.props.questionIndex].fields.choicese!=null){
//             choiceE+=Data[this.props.questionIndex].fields.choicese;
//         }if(Data[this.props.questionIndex].fields.choicesf!=null){
//             choiceF+=Data[this.props.questionIndex].fields.choicesf;
//         }
//         let questype;
//         if(Data[this.props.questionIndex].fields.category==1)
//             questype="Example  ";
//         if(Data[this.props.questionIndex].fields.category==2)
//             questype="Exercise  ";
//         if(Data[this.props.questionIndex].fields.category==3)
//             questype="Problem  ";
//         if(Data[this.props.questionIndex].fields.category==4)
//             questype="DIY  ";
//         if(Data[this.props.questionIndex].fields.category==5)
//             questype="Quiz  ";
//         var twinOption=[];
//         // var defaultOption;
//         // defaultOption=Data[this.props.questionIndex].fields.twinproblems[0];
//         for(var i=0;i<Data[this.props.questionIndex].fields.twinproblems.length;i++){
//             var indexx=Data[this.props.questionIndex].fields.twinproblems[i];
//             var iddd=Data[indexx].fields.code;
//             twinOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.twinproblems[i]}>{iddd.toString()}</Option>)
//         }
//         var recommendOption=[];
//         if(Data[this.props.questionIndex].fields.answer==selvalue){
//             for(var i=0;i<Data[this.props.questionIndex].fields.rightproblems.length;i++){
//             var indexx=Data[this.props.questionIndex].fields.rightproblems[i];
//             var iddd=Data[indexx].fields.code;
//             recommendOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.rightproblems[i]}>{iddd.toString()}</Option>)
//             }
//         }
//         else{
//             for(var i=0;i<Data[this.props.questionIndex].fields.wrongproblems.length;i++){
//             var indexx=Data[this.props.questionIndex].fields.wrongproblems[i];
//             var iddd=Data[indexx].fields.code;
//             recommendOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.wrongproblems[i]}>{iddd.toString()}</Option>)
//             }
//         }

//         return (
//         	<div>
//         		<div className="questionwrapper">
//                 <div className="inner-wrapper">
//                     <div className="questionHeader">
//                         <Breadcrumb>
//                         <Breadcrumb.Item href="">
//                           <Link to="/Dashboard"><Icon type="home" />Home</Link>
//                         </Breadcrumb.Item>
//                         <Breadcrumb.Item href=""> <Link to="/QuestionList">
//                           <Icon type="book" />
//                           <span>Qustion List</span></Link>
//                         </Breadcrumb.Item>
//                         <Breadcrumb.Item>
//                             {questype}
//                             {Data[this.props.questionIndex].fields.code}
//                         </Breadcrumb.Item>
//                         </Breadcrumb>
//                           <div className="pannel">
//                                 <Button type="back" className="backQuestion" onClick = {browserHistory.goBack}>Back</Button>
    
//                           </div>
//                       </div>
//                       <div className="questionCanvas">
//                         <div id="output" className="questionstem">{Data[this.props.questionIndex].fields.problem}</div>
//                         <div className="questionchoice">
//                          <RadioGroup onChange={this.onChange} value={this.state.value}>
//                             <div>{choiceA==""?"":<div><Radio style={radioStyle} value={"A"}>{choiceA}</Radio></div>}</div>
//                             <div>{choiceB==""?"":<div><Radio style={radioStyle} value={"B"}>{choiceB}</Radio></div>}</div>
//                             <div>{choiceC==""?"":<div><Radio style={radioStyle} value={"C"}>{choiceC}</Radio></div>}</div>
//                             <div>{choiceD==""?"":<div><Radio style={radioStyle} value={"D"}>{choiceD}</Radio></div>}</div>
//                             <div>{choiceE==""?"":<div><Radio style={radioStyle} value={"E"}>{choiceE}</Radio></div>}</div>
//                             <div>{choiceF==""?"":<div><Radio style={radioStyle} value={"F"}>{choiceF}</Radio></div>}</div>
//                           </RadioGroup>
//                         </div>
//                         <div className="questionanswer">
//                           <div className="questionbutton">
//                                 <Button className="submitQuestion" type="submit" onClick = {this.submitQuestion}>Submit</Button>
//                           </div>
//                           <div className="questionbutton">{ this.state.showResults?<Button className="submitQuestion" onClick = {this.showAns}>Show Result</Button>: null }</div>
//                           <div className="questionresult">
//                           { this.state.showAns?<div>Twin problems: </div>: null }
//                           <div>{ this.state.showAns?
//                              <Select
//                                 style={{ width: 120 }}
//                                 // defaultValue={twinOption[0]}
//                                 placeholder="Select a twin problem"
//                                 optionFilterProp="children"
//                                 onChange={this.twinProblemChange}
//                                 filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//                               >
                                 
//                                  {twinOption}
//                               </Select>:null}
//                            { this.state.showAns?<Button onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
//                            </div>
//                             { this.state.showAns?<div>Recommend problems: </div>: null }
//                            <div>{ this.state.showAns?
//                              <Select
//                                 style={{ width: 120 }}
//                                 // defaultValue={twinOption[0]}
//                                 placeholder="Select a Recommend problem"
//                                 optionFilterProp="children"
//                                 onChange={this.RecommendProblemChange}
//                                 filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//                               >
                                 
//                                  {recommendOption}
//                               </Select>:null}
//                            { this.state.showAns?<Button onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
//                            </div>
//                           { this.state.showAns?Data[this.props.questionIndex].fields.solutions: null }
//                           </div>
//                         </div>
//                       </div>
//                   </div>
//                 </div>
//         	</div>
//         )
//     }
// }

// function mapStateToProps (state){
//     return { 
//             Data:state.question.questionData,
//             // questionData:state.question.questionData
//             index:state.question.index
//         }
// }

// function mapDispatchToProps (dispatch){
//     return{
//         actions: bindActionCreators({
//             changeindexbyid
//         },dispatch)
//     };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(VQuestion);

import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification,Rate } from 'antd';
// import Data from '../problem.js';
import Data from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message} from 'antd';
import {changeindexbyid,prevproblem,nextproblem} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/ProblemList.less';
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
             selvalue: 0
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
    }
    nextQuestion = () =>{
        this.props.actions.nextproblem();
        this.setState({ showResults: false,showAns: false, value: 0, selvalue: 0});
    }
    prevQuestion = () =>{
        this.props.actions.prevproblem();
        this.setState({ showResults: false,showAns: false,value: 0, selvalue: 0});
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
          selvalue: e.target.value
        });
        // selvalue=e.target.value;
      }
      showQuestion =(e)=>{
        // console.log(e.target.value);
      }
      twinProblemChange = (value) =>{
         var pkIndex=[];
        for(var i=0;i<Data.length;i++){
          pkIndex[Data[i].pk]=i;
        }
        twinProblem=pkIndex[value];
        // twinProblem=value;
      }
      RecommendProblemChange = (value) =>{
        var pkIndex=[];
        for(var i=0;i<Data.length;i++){
          pkIndex[Data[i].pk]=i;
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

    render() {
        var pkIndex=[];
        for(var i=0;i<Data.length;i++){
          pkIndex[Data[i].pk]=i;
        }
        var choiceA="";
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        if(Data[this.props.questionIndex].fields.choicesa!=null){
            choiceA+=Data[this.props.questionIndex].fields.choicesa;
        }
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
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
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];

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
                        <Breadcrumb.Item href=""> <Link to="/Search">
                          <Icon type="search" />
                          <span>Search</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {questype[Data[this.props.questionIndex].fields.category]}
                            {Data[this.props.questionIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                               <Button type="back" className="backQuestion" onClick = {browserHistory.goBack}>Back</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{
                          Data[this.props.questionIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}
                         {Data[this.props.questionIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture1}/>}
                         {Data[this.props.questionIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture2}/>}
                         {Data[this.props.questionIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture3}/>}
                         {Data[this.props.questionIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture4}/>}
                         {Data[this.props.questionIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture5}/>}
                         {Data[this.props.questionIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.problempicture6}/>}
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
                          { this.state.showAns?Data[this.props.questionIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null }
                         {this.state.showAns?Data[this.props.questionIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.solutionspicture1}/>:null}
                         {this.state.showAns?Data[this.props.questionIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.solutionspicture2}/>:null}
                         {this.state.showAns?Data[this.props.questionIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.questionIndex].fields.solutionspicture3}/>:null}
                          <div>{ this.state.showAns?
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
                               { this.state.showAns?<Button onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                              
                               { this.state.showAns?
                                 <Select
                                    style={{ width: 200 }}
                                    // defaultValue={twinOption[0]}
                                    placeholder="Select a Recommend problem"
                                    optionFilterProp="children"
                                    onChange={this.RecommendProblemChange}
                                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                  >
                                     
                                     {recommendOption}
                                  </Select>:null}
                               { this.state.showAns?<Button onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                               </div>
                          </div>
                          <div className="problemcomment"> { this.state.showAns?"Giving an comment on this problem":null}</div>
                           { this.state.showAns?<Rate />:null}
                           { this.state.showAns?<Button onClick = {this.submitcomment}>submit</Button>:null}
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
            problemIndex:state.question.problemIndex,
            index:state.question.index
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevproblem,
            nextproblem
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VQuestion);

