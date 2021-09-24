import React from 'react'
import {useState,useEffect } from 'react'
import axios from '../commons/axios.js'
import ContactAcceptList from '../components/contactAcceptList.js'
import ContactPendingList from '../components/contactPendingList.js'
import { Menu } from 'antd';
import { Badge } from 'antd';
import { UserOutlined,UserAddOutlined } from '@ant-design/icons';
import { Layout, Dropdown } from 'antd';
import { Statistic, Row, Col, Button, Input, Space, Spin } from 'antd';
import Cookies from 'universal-cookie';
import { Avatar } from 'antd';



export default function Contact(props){
    
    const { SubMenu } = Menu;
    const [acceptContact, setAcceptContacts] = useState([]);
    const [pendingContact, setPendingContact] = useState([]);
    const [length,setLength ]= useState('');
    const { Header, Content, Footer, Sider } = Layout;
    const { Search } = Input;
    const id = props.match.params._id;
    const home = "/dashboard/" + id;
    const [profile,setProfile ]= useState('');
    const onSearch = value => console.log(value);


    useEffect(()=>{
        axios.get(home +'/contact').then(response=>{
            if(response.data.success){
                setAcceptContacts(response.data.accepted)
                setPendingContact(response.data.pending)
                setLength(response.data.pending.length)

            }
        }).catch(error=>{
        })
        
        axios.get(home).then(response=>{
            if(response.data.success){
                setProfile(response.data.user);
            }
        }).catch(error=>{
        })
        
    },[])


    const OnLogOut = () => { 
        const logout = '/' + id + '/logout';
        axios.get(logout).then(response => {
            if (response.data.success) {
                const cookies = new Cookies();
                cookies.remove('token');
                cookies.remove('connect.sid')
                this.props.history.push('/signin');
            }
        }).catch(error => {
            console.log(error.response);
        })

    }

    const logout = (
        <Menu>
          <Menu.Item key="1" onClick = {OnLogOut}>Log Out</Menu.Item>
        </Menu>
    );

  
    return(
        <Layout>
            <Header style={{ padding: '0 10px' }}>
                <Row style={{ height: "64px" }}>
                    <Col span={2} offset={1}>
                        <a href={home}>
                            <div>
                                <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                            </div>
                        </a>
                    </Col>
                    <Col span={7} offset={2}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ height: '64px' }}>
                            <Menu.Item key="1">
                                <a href={home}>
                                    <img src='/../pics/user_icon.png' alt='profile_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                </a>
                            </Menu.Item>
                            
                            <Menu.Item key="2">
                                <a href={home+'/contact'}>
                                    <img src='/../pics/contact_icon.png' alt='contact_icon' style={{ height: '24px' }} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                </a>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <a href={home + '/addFriend'}>
                                    <img src='/../pics/AddFriend.png' alt='AddFriend' style={{ height: '19px' }} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Add Friend</span>
                                </a>
                            </Menu.Item>

                        </Menu>
                    </Col>
                    <Col span={4} offset={2}>
                        <Search placeholder="click to search" onSearch={onSearch} enterButton style={{ postition: 'relative', paddingTop: '15px' }} />
                    </Col>
                        <Col span={3} offset={1}>
                            <Menu theme="dark" mode="horizontal" style={{ height: '64px' }}>
                                <Dropdown overlay={logout}>
                                    <Menu.Item key="1">
                                        <a className="ant-dropdown-link">
                                            <Avatar icon={<UserOutlined />} />
                                            <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px'}}>
                                                {profile.email}
                                            </span>
                                        </a>
                                    </Menu.Item>
                                </Dropdown>
                            </Menu>
                        </Col>
                </Row>
            </Header>
            <Layout  style={{ padding: '2vh 2vw'}}>
                <Sider width={'20vw'} style = {{background: '#fff'}}>
                    <Menu 
                        mode="inline"
                        style={{minHeight: '100vh'}}
                    >   
                            <SubMenu key="sub1" icon={<Badge count={length} size="small" offset={[2,-1]}> 
                                                    <UserAddOutlined/> 
                                                    </Badge>} title="New friend" >
                            <ContactPendingList contacts= {pendingContact}/>   
                            </SubMenu>
                            
                            <SubMenu key="sub2" icon={<UserOutlined/>} title="My friend">
                                
                            <ContactAcceptList contacts={acceptContact}/>
                            
                            </SubMenu>
                    

                    </Menu>
                </Sider>
            </Layout>
        </Layout>
    )
    
}