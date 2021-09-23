import React, { useState } from 'react'
import axios from '../commons/axios.js'
import { Menu, message,Button,List} from 'antd';
import { Avatar} from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';






export default class ContactBrief extends React.Component {
    constructor(props){
        super(props)
        console.log(props.contact)
    }

    //write friend info
    handleClick = e => {
      console.log('click ', e);
    }
    
    acceptFrined =()=>{

        axios.post('/dashboard/' + '614aea1a8cb22838c692a8de' + '/acceptFriend', {
            userid: this.props.contact.user._id
        }).then(response => { 
            if(response.status===200){
                message.success("Accept successfull !")
            }
            else{
                message.error("Please accept again !")
            }
        }).catch(error => {
            
            })
          
    }

    rejectFriend = ()=>{
        axios.post('/dashboard/' + '614aea1a8cb22838c692a8de' + '/deleteFriend', {
            contactid: this.props.contact._id
        }).then(response => { 
            if(response.status===200){
                message.success("reject successful1")
            }
            else{
                message.error("Please reject again!")
            }
        }).catch(error => {
            
            })

    }

    render() {
        
        return(
            <Menu
                onClick={this.handleClick}
                style={{ width: '100vw',display: 'flex', Margin :'0px 0px'}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                    <List.Item >
                        <Avatar icon={<UserOutlined />} />
                            {' Given name: '+this.props.contact.user.givenName+'  email: '+this.props.contact.user.email}
                            <IconButton 
                                onClick={()=>this.acceptFrined()}      
                            >
                                <AddIcon/>
                            </IconButton>
                            <IconButton 
                                onClick={()=>this.rejectFriend()}
                            >
                                <DeleteIcon/>
                            </IconButton >
                    </List.Item>
            </Menu>
                

    )

    }
}
