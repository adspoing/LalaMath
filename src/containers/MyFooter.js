import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转

class MyFooter extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'myFooter';
    }
   
    render() {
        return (
            <div>
                <div className="Footer">
                    <div className="container">
                        <div className="foot-row">
                            <dl className="foot-col">
                                <dt>About</dt>
                                <dd>About us</dd>
                            </dl>
                            <dl className="foot-col">
                                <dt>Contact</dt>
                                <dd>Contact us</dd>
                            </dl>
                            <dl className="foot-col2">
                                <dt>Content</dt>
                            </dl>
                        </div>
                    </div>                      
                </div>           
             </div>
        )
    }
}

export default MyFooter;


