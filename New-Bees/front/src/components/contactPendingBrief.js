import React, { useState } from 'react'
import axios from '../commons/axios.js'
import { Menu, message,Button,List, Row, Col} from 'antd';
import { Divider} from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';






export default class ContactBrief extends React.Component {
    constructor(props){
        super(props);
        //console.log(props.contact.friend.user)
    }

    //write friend info
    handleClick = e => {
      console.log('click ', e);
    }
    
    acceptFriend =()=>{

        const userId = this.props.contact.user._id
        console.log(this.props.contact.user._id)
        //console.log(this.props.contact.user._id)
        //console.log(userId)
        axios.post('/dashboard/' + userId+ '/acceptFriend', {
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
        const userId = this.props.contact.user

        axios.post('/dashboard/' + userId + '/deleteFriend', {
            contactid: this.props.contact._id
        }).then(response => { 
            if(response.status===200){
                message.success("Reject successfull !")
            }
            else{
                message.error("Please reject again !")
            }
        }).catch(error => {
            
            })

    }

    render() {
        //console.log(this.props.contact.user);
        return(
            <Row>
                <Col span={19} style = {{verticalAlign: 'middle', display: 'inline-block'}}>
                    
                    <List.Item  style = {{paddingTop: '20px'}}>
                        <List.Item.Meta
                        title= {this.props.contact.user.givenName + ' ' + this.props.contact.user.familyName}
                        description= {this.props.contact.user.email}
                        />
                    </List.Item>

                </Col>
                <Col span={5}>
                    <div style = {{height: '50%'}}> 
                        <IconButton 
                            onClick={()=>this.acceptFriend()}      
                        >
                            <AddIcon/>
                        </IconButton>
                    </div>
                    <div style = {{height: '50%'}}> 
                        <IconButton 
                            onClick={()=>this.rejectFriend()}
                        >
                            <DeleteIcon/>
                        </IconButton >
                    </div>
                </Col>
            </Row>
        )

    }
}
