import { Select } from 'antd';
import React from 'react';


class mySelect extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'mySelect';
    }

     render() {
			const Option = Select.Option;
			const children = [];
			for (let i = 10; i < 36; i++) {
			  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
			}

			function handleChange(value) {
			  console.log(`selected ${value}`);
			}
        return (
        	 <Select
			    tags
			    style={{ width: '100%' }}
			    onChange={handleChange}
			    tokenSeparators={[',']}
			  >
			    {children}
			  </Select>
        )
    }
}

export default mySelect;
