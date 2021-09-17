import React, { useState } from 'react'
import axios from '../commons/axios.js'
import { Menu } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';





export default class ContactBrief extends React.Component {
    constructor(props){
        super(props)
        //console.log(props.contact)
    }

    //write friend info
    handleClick = e => {
      console.log('click ', e);
    }

    render() {
        return(
            <Menu
                onClick={this.handleClick}
                style={{ width: 300 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                    <Menu.Item >
                        <Avatar icon={<UserOutlined />} />
                        {' Given name: '+this.props.contact.friend.givenName+'  email: '+this.props.contact.friend.email}
                    </Menu.Item>
            </Menu>
                

    )

    }
}
