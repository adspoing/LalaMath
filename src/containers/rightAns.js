import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';


class rightAns extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'rightAns';
    }

     render() {
        return (
        	<div>
	        	<Header />
                <SideBar />
                <div className="wrapper">
                    aa
                </div>
        	</div>
        )
    }
}

export default rightAns;
