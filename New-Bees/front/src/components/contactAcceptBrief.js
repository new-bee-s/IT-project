import React, { useState } from 'react'
import axios from '../commons/axios.js'
import { Avatar, Image ,Drawer, List, Divider, Col, Row} from 'antd';
import { Layout } from 'antd';


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);


export default function ContactBrief(props) {
  
  
  const { Content } = Layout;


  return(

    <Content style={{minHeight: 280, background: '#fff', padding: '2vh 2vh' }}>
        <h1 style={{ marginBottom: 24 }}>
          User Profile
        </h1>
        <h2>Personal</h2>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Gven Name" content={props.contact.friend.givenName} />
          </Col>
          <Col>
            <DescriptionItem title="Family Name" content={props.contact.friend.familyName} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="City" content="*** Future" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="Australia (future)" />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="mm/dd/yyyy future" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="User id" content={props.contact.friend._id} />
          </Col>
        </Row>
        
      <Divider />
        <h2>Remark</h2>
          <Col span={24}>
            <DescriptionItem title=" Remark" content="future" />
          </Col>

      <Divider />
      <h2>Contacts</h2>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000 future" />
          </Col>
        </Row>
        <Row>
        </Row>

    </Content>

  )
}
