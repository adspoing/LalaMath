import { Card, Col, Row } from 'antd';
import React from 'react';


class myCard extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'myCard';
    }
     render() {
        return (
        	 <div style={{ background: '#ECECEC', padding: '30px' }}>
			    <Row>
			      <Col span="8">
			        <Card title="Card title" bordered={false}>Card content</Card>
			      </Col>
			      <Col span="8">
			        <Card title="Card title" bordered={false}>Card content</Card>
			      </Col>
			      <Col span="8">
			        <Card title="Card title" bordered={false}>Card content</Card>
			      </Col>
			    </Row>
			  </div>
        )
    }
}

export default myCard;
