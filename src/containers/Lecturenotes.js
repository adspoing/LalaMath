import React from 'react';
import { Card, Col, Row} from 'antd';
import Header from './Header.js';
import SideBar from './SideBar.js';
import MyFooter from './MyFooter.js';
import { Button,Breadcrumb,Icon,Select } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import '../css/LectureNote.less';

// var AMUIReact = require('amazeui-react');
// var Footer = AMUIReact.Footer;
const Option=Select.Option;
let myiframe=[];
let changevalue;

class LectureNotes extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'LectureNotes';
        this.state = {
            slideval:-1
        }
    }
    handleChange=(value)=>{
         this.setState({
            slideval:value
         })
         console.log(this.state.slideval);
    }
    render() {
        myiframe.push(<iframe src="https://app.box.com/embed/s/0wyx55ybmkp2x7jdkq31qvjbsmu9kvgx" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/rruml0s4g0r7bxujdkqlwxwdjx3mviw9" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/ncbebaaziikr1iui9vg3zjmfue5q8qjz" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/yt5bzm37a78bpt5oiuhezy5bg425szlp" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/fk4w56p5k855af4ymhc87l0n1do8y48z" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/iergcakozc09vdnlcsp9bgc60tjkc3on" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/dqpl2b75g6n4tf8b21gopzi4iy1y9vy1" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/sttm6y4gemohnf438wgresd2vz67fann" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/pn7tqoir4vzdgviq24szn50mrbmpsr2q" width="800" height="550" frameborder="0"></iframe>);        
        myiframe.push(<iframe src="https://app.box.com/embed/s/6ng2kf0u6dp4ul9ofhhfkg9gp8r6kh9l" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/56h52lov7o948xfgvgjj0o6ty65pi7hj" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/k81y4gz1319crk530tyxv92x2sl4o72u" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/yp4uuz49j2twbfxfe2ew5twum462f5dn" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/pw0sc5ocpr22dm3h2ltkr18mkizhlywv" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/gm8z64fz1qiaviwqf83ykhixpmyhto4m" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/cstiozgf8ht78fz11pbtmujn94n78m8v" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/x1nqjtrj7ar1npv1mto68xj2v7vb2hxr" width="800" height="550" frameborder="0"></iframe>);
        myiframe.push(<iframe src="https://app.box.com/embed/s/mkwgbbemwg1kqc1gt9nlez9xfxinpvxq" width="800" height="550" frameborder="0"></iframe>);
        console.log(myiframe[this.state.value]);
        return (
        	<div>
                <Header />
                <SideBar />
                <div className="wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Home"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/LectureNotes">
                      <Icon type="file-text" />
                      <span>Lecture notes</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread"> 
                    <div className="lecturenote-content">
                     <Select
                        style={{ width: 200 }}
                        placeholder="Select a chapter"
                        // onChange={handleChange}
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="0"><Icon type="cloud-download" />Blackjack</Option>
                        <Option value="1"><Icon type="cloud-download" />Chapter 1&2</Option>
                        <Option value="2"><Icon type="cloud-download" />Chapter3 Part1</Option>
                        <Option value="3"><Icon type="cloud-download" />Chapter3 Part2</Option>
                        <Option value="4"><Icon type="cloud-download" />Chapter3 Part3</Option>
                        <Option value="5"><Icon type="cloud-download" />Chapter4 Part1</Option>
                        <Option value="6"><Icon type="cloud-download" />Chapter4 Part2</Option>
                        <Option value="7"><Icon type="cloud-download" />Chapter5</Option>
                        <Option value="8"><Icon type="cloud-download" />Chapter6 Part1</Option>
                        <Option value="9"><Icon type="cloud-download" />Chapter6 Part2</Option>
                        <Option value="10"><Icon type="cloud-download" />Chapter7 Part1</Option>
                        <Option value="11"><Icon type="cloud-download" />Chapter7 Part2</Option>
                        <Option value="12"><Icon type="cloud-download" />Chapter8</Option>
                        <Option value="13"><Icon type="cloud-download" />CondExp</Option>
                        <Option value="14"><Icon type="cloud-download" />Review Chapter 3&4</Option>
                        <Option value="15"><Icon type="cloud-download" />Review Chapter 5&6</Option>
                        <Option value="16"><Icon type="cloud-download" />Review Chapter 7</Option>
                        <Option value="17"><Icon type="cloud-download" />Review Demo</Option>

                      </Select>
                      <div>
                        { myiframe[this.state.slideval]}
                      </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default LectureNotes;
