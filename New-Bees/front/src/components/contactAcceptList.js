import React from 'react'
import ContactBrief from './contactAcceptBrief.js'
import {  Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function ContactList(props) {

    const { SubMenu } = Menu;
    const renderContact = props.contacts.map((contact,index)=>{
        
        return (
            
            <ContactBrief
                key ={index}
                contact = {contact}/> 
        )
    })   
    return (
        
        {renderContact}
    )
}