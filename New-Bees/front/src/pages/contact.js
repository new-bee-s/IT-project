import React from 'react'
import {useState,useEffect } from 'react'
import axios from '../commons/axios.js'
import ContactAcceptList from '../components/contactAcceptList.js'
import ContactPendingList from '../components/contactPendingList.js'
import { Menu } from 'antd';
import { Badge } from 'antd';
import { UserOutlined,UserAddOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;




export default function Contact(){
   
    const [acceptContact, setAcceptContacts] = useState([]);
    const [pendingContact, setPendingContact] = useState([]);
    const [length,setLength ]= useState('');
    
    


    useEffect(()=>{
        axios.get('/dashboard/'+ '614aea1a8cb22838c692a8de'+'/contact').then(response=>{
            if(response.data.success){
                console.log(response.data)
                setAcceptContacts(response.data.accepted)
                setPendingContact(response.data.pending)
                setLength(response.data.pending.length)
                
            }
        }).catch(error=>{
            console.log(error.response)
        })
        
    },[])


  
    return(
        
        <Menu 
            
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
                <SubMenu key="sub" icon={<Badge count={length} size="small" offset={[2,-1]}> 
                                           <UserAddOutlined/> 
                                         </Badge>} title="New friend" >
                  <ContactPendingList contacts= {pendingContact}/>   
                 </SubMenu>
                
                <SubMenu key="sub2" icon={<UserOutlined/>} title="My friend">
                    
                  <ContactAcceptList contacts={acceptContact}/>
                
                </SubMenu>
         

        </Menu>
    )
    
}