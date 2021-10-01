import React from 'react'
import axios from '../commons/axios.js'
import {message,List, Row, Col} from 'antd';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';






export default class ContactBrief extends React.Component {
    constructor(props){
        super(props);   
    }

    //write friend info
    handleClick = e => {
      console.log('click ', e);
    }
    
    // connect bacl-end accept friend 
    acceptFriend =()=>{

        const userId = this.props.contact.friend
        console.log(this.props.contact)
        axios.post('/dashboard/' + userId+ '/acceptFriend', {
            userid: this.props.contact.user._id
        }).then(response => { 
            if(response.status===200){
                message.success('Accept successful')
            }
            else{
                message.error(response.data.error)
            }
        }).catch(error => {
            
            })
          
    }
    // connect bacl-end reject friend 
    rejectFriend = ()=>{
        const userId = this.props.contact.friend

        axios.post('/dashboard/' + userId + '/deleteFriend', {
            contactid: this.props.contact._id
        }).then(response => { 
            if(response.status===200){
                message.success('Reject successful')
            }
            else{
                message.error(response.data.error)
            }
        }).catch(error => {
            
            })

    }

    render() {
        // render pending  page
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
