import React, { useState } from 'react'
import axios from '../commons/axios.js'
import {  Divider, Col, Row,message,Button,Typography} from 'antd';
import {DeleteOutlined,CheckOutlined} from '@ant-design/icons';
import { Layout } from 'antd';

const { Text } = Typography;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <Text strong className="site-description-item-profile-p-label">{title}: </Text>
    {content}
  </div>
);


export default function ContactBrief(props) {
  
  
  const { Content } = Layout;
  const userId = props.contact.friend.user
  const [changeRemark,setChangeRemark]=useState(props.contact.remark);
  console.log(props.contact)
  
  const editRemark=()=>{
        axios.post('/dashboard/' + userId+'/changeRemark',{
          remark: changeRemark,
          contactid: props.contact._id
        }).then(response=>{
          if(response.status===200){
            message.success("Edit successful1")
            
        }
        else{
            message.error("Edit error!")
        }
    }).catch(error => {

        })
  
  }

  const rejectFriend = ()=>{
    axios.post('/dashboard/' + userId + '/deleteFriend', {
        contactid: props.contact._id
    }).then(response => { 
        if(response.status===200){
            message.success("Reject successful1")
            
        }
        else{
            message.error("Please reject again!")
        }
    }).catch(error => {
        
        })

}


  return(

    <Content style={{minHeight: 280, background: '#fff', padding: '3vh 3vh' ,margin:'10px 10px'}}>
        <h1 style={{ margin: '20px 330px' }}>
          User Profile
        </h1>
        <h2>Personal</h2>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Gven Name" content={ props.contact.friend.givenName} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Family Name" content={ props.contact.friend.familyName} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="User id" content={ props.contact.friend.userID} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Birthday" content={props.contact.friend.birthday} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="County" content={props.contact.friend.country} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="City" content={props.contact.friend.city} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <DescriptionItem title="Address" content={props.contact.friend.address} />
          </Col>
        </Row>
        <Divider/>
        <Row style={{ marginTop: 24 }}>
          <Col span={2}>
            <DescriptionItem title="Remark"  />
          </Col>
          <Col span={10}>
              <Text 
                style={{margin:"0px 0px 0px 0px"}}
                editable={{
                tooltip: 'click to edit text',
                onChange: setChangeRemark
                }} 
              >
                {changeRemark}
              </Text>
          </Col>
          <Col span={12}>
            <Button 
              style={{margin:"-10px 0px 0px 0px"}}
              shape="circle"
              type= "primary"
              icon={<CheckOutlined />}
              onClick={editRemark}
            />  
          
          </Col>
        </Row>

        
        
      <Divider />
        <h2>Tag</h2>

      <Divider />
      <h2>Contacts</h2>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content={props.contact.friend.phoneNumber} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={props.contact.friend.email} />
          </Col>
        </Row>
        <Row>
        </Row>
        <Button
          style={{margin:'50px 300px'}}
          type="primary"
          shape="round" 
          icon={<DeleteOutlined/>} 
          size='large'
          danger
          onClick={()=>rejectFriend()}
        >
          Delete Friend
        </Button>

    </Content>

  )
}
