import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
import Data from '../data.js';
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Question';
        this.state = {
             index: this.props.questionIndex,
             mathjax: this.props.mathjax,
             showResults: false,
             showAns: false,
             value: 0
        }
    }
    handleChange(value){
        console.log(`selected ${value}`);
        selvalue=value;
        console.log(selvalue);
    }   
    submitQuestion = () =>{
        this.props.clickSubmitQuestion();
        if(Data[this.props.questionIndex].fields.answer==selvalue){
            var config={};
            config.description=Data[this.props.questionIndex].fields.messagesuccess;
            config.message="success";
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.questionIndex].fields.messagefailure;
            config.message="error";
            notification.error(config);
        }
        this.setState({ showResults: true });
    }
    nextQuestion = () =>{
        this.props.clickNextQuestion();
        this.setState({ showResults: false,showAns: false, value: 0});
    }
    prevQuestion = () =>{
        this.props.clickPrevQuestion();
        this.setState({ showResults: false,showAns: false,value: 0});
    }
    componentDidMount = () =>{   
        this.props.MathJax.Hub.Queue(["Typeset",this.props.MathJax.Hub],"output");
    }
    componentDidUpdate = () =>{
        this.props.MathJax.Hub.Queue(["Typeset",this.props.MathJax.Hub],"output");
    }
    showAns = () =>{
        this.setState({ showAns: true});
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
        selvalue=e.target.value;
      }
    render() {
        var choiceA=Data[this.props.questionIndex].fields.choicesa;
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        // if(Data[this.props.questionIndex].fields.choicesa!=null){
        //     choiceA+=Data[this.props.questionIndex].fields.choicesa;
        // }
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
        let questype;
        if(Data[this.props.questionIndex].fields.category==1)
            questype="Example  ";
        if(Data[this.props.questionIndex].fields.category==2)
            questype="Exercise  ";
        if(Data[this.props.questionIndex].fields.category==3)
            questype="Problem  ";
        if(Data[this.props.questionIndex].fields.category==4)
            questype="DIY  ";
        if(Data[this.props.questionIndex].fields.category==5)
            questype="Quiz  ";
        console.log(questype);
        return (
        	<div>
        		<div className="questionwrapper">
                <div className="inner-wrapper">
                    <div className="questionHeader">
                        <Breadcrumb>
                        <Breadcrumb.Item href="">
                          <Link to="/Home"><Icon type="home" /></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href=""> <Link to="/QuestionList">
                          <Icon type="book" />
                          <span>Qustion List</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {questype}
                            {Data[this.props.questionIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/Dashboard">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data[this.props.questionIndex].fields.problem}</div>
                        <div className="questionchoice">
                         <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <div>{choiceA==""?"":<Radio style={radioStyle} value={"A"}>{choiceA}</Radio>}</div>
                            <div>{choiceB==""?"":<Radio style={radioStyle} value={"B"}>{choiceB}</Radio>}</div>
                            <div>{choiceC==""?"":<Radio style={radioStyle} value={"C"}>{choiceC}</Radio>}</div>
                            <div>{choiceD==""?"":<Radio style={radioStyle} value={"D"}>{choiceD}</Radio>}</div>
                            <div>{choiceE==""?"":<Radio style={radioStyle} value={"E"}>{choiceE}</Radio>}</div>
                            <div>{choiceF==""?"":<Radio style={radioStyle} value={"F"}>{choiceF}</Radio>}</div>
                          </RadioGroup>
                        </div>
                        <div className="questionanswer">
                          <div className="questionbutton">
                                <Button className="submitQuestion" type="submit" onClick = {this.submitQuestion}>Submit</Button>
                          </div>
                          <div className="questionbutton">{ this.state.showResults?<Button className="submitQuestion" onClick = {this.showAns}>Show Result</Button>: null }</div>
                          <div className="questionresult">{ this.state.showAns?Data[this.props.questionIndex].fields.solutions: null }</div>
                        </div>
                      </div>
                  </div>
                </div>
        	</div>
        )
    }
}
export default Question;
     //<div className="choice">
       //                     <p><b>{choiceA==""?"":"A: "}</b>{choiceA}</p>
         //                   <p><b>{choiceB==""?"":"B: "}</b>{choiceB}</p>
           //                 <p><b>{choiceC==""?"":"C: "}</b>{choiceC}</p>
             //               <p><b>{choiceD==""?"":"D: "}</b>{choiceD}</p>
               //             <p><b>{choiceE==""?"":"E: "}</b>{choiceE}</p>
                 //           <p><b>{choiceF==""?"":"F: "}</b>{choiceF}</p>
                   //     </div>

   // <Select
   //                      showSearch
   //                      style={{ width: 120 }}
   //                      placeholder="Select a answer"
   //                      optionFilterProp="children"
   //                      onChange={this.handleChange}
   //                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
   //                    >
   //                      <Option value="A">A</Option>
   //                      <Option value="B">B</Option>
   //                      <Option value="C">C</Option>
   //                      <Option value="D">D</Option>
   //                      <Option value="E">E</Option>
   //                      <Option value="F">F</Option>
   //                    </Select>
