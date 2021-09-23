import React, { useState } from 'react'
import axios from '../commons/axios.js'
import { Menu } from 'antd';
import { Avatar, Image ,Drawer, List, Divider, Col, Row} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);



export default class ContactBrief extends React.Component {
    constructor(props){
        super(props)
        console.log(props.contact)
    }

    //write friend info
    state = { visible: false };

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    

      onClose = () => {
        this.setState({
          visible: false,
        });
      };


    render() {
        
        return(
          <>
            <Menu
                onClick={this.handleClick}
                style={{ width: '30vw' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                    <List.Item
                        key={this.props.contact.id}
                        actions={[
                        <a onClick={this.showDrawer} key={`a-${this.props.contact.id}`}>
                        View Profile
                        </a>,
                        ]}>
                          <List.Item.Meta
                            avatar={
                            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={this.props.contact.friend.givenName}
                            description={this.props.contact.friend.email}
                           />
        
                    </List.Item>
            </Menu>
              <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                  User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="Gven Name" content={this.props.contact.friend.givenName} />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem title="Family Name" content={this.props.contact.friend.familyName} />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="City" content="*** Future" />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem title="Country" content="Australia (future)" />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="Birthday" content="mm/dd/yyyy future" />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem title="User id" content={this.props.contact.friend._id} />
                  </Col>
                </Row>
                
              <Divider />
                <p className="site-description-item-profile-p">Remark</p>
                  <Col span={24}>
                    <DescriptionItem title="remark" content="future" />
                  </Col>
             
              <Divider />
              <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                  <Col span={24}>
                    <DescriptionItem title="Phone Number" content="+86 181 0000 0000 future" />
                  </Col>
                </Row>
                <Row>
                </Row>
              </Drawer>
           </>          

    )

    }
}
