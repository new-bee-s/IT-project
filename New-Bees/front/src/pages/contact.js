import React from 'react'
import {useState,useEffect} from 'react'
import axios from '../commons/axios.js'
import ContactPendingList from '../components/contactPendingList.js'
import ContactPendingBrief from '../components/contactPendingBrief.js'
import ContactBrief from '../components/contactAcceptBrief.js'
import { Menu,Badge,Typography } from 'antd';
import { UserOutlined,UserAddOutlined,HighlightOutlined } from '@ant-design/icons';
import { Layout, Dropdown } from 'antd';
import { Statistic, Row, Col, Button, Input, Space, Spin } from 'antd';
import Cookies from 'universal-cookie';
import { Avatar } from 'antd';



export default function Contact(props){
    const { Text } = Typography;
    const { SubMenu } = Menu;
    const [acceptContact, setAcceptContacts] = useState([]);
    const [pendingContact, setPendingContact] = useState([]);
    const [length,setLength ]= useState('');
    const { Header, Content, Sider } = Layout;
    const [isShowDetail, setShowState] = useState(false);
    const [Detail, setDetail] = useState('');
    const { Search } = Input;
    const id = props.match.params._id;
    const home = "/dashboard/" + id;
    const [profile,setProfile ]= useState('');
    const onSearch = value => console.log(value);
    console.log(props)
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
    
    const renderContact = acceptContact.map((contact,index)=>{
        if (Detail.id === undefined){
            return (<> </>)
        }

        if (contact.friend._id === Detail.id){
            console.log(Detail.id)
            return (
                <ContactBrief
                    key ={index}
                    contact = {contact}/> 
            )
            
        }
        return (<> </>)
    })

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
                                <a href={home + '/search'}>
                                    <img src='/../pics/AddFriend.png' alt='AddFriend' style={{ height: '19px' }} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Search</span>
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
                                        <Avatar icon={<UserOutlined />} />
                                        <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px'}}>
                                            {profile.email}
                                        </span>
                                    </Menu.Item>
                                </Dropdown>
                            </Menu>
                        </Col>
                </Row>
            </Header>
            <Layout  style={{ padding: '2vh 2vh', paddingRight:'2vh'}}>
                <Sider width={'20vw'} style = {{background: '#fff'}}>
                    <Menu 
                        mode="inline"
                        style={{minHeight: '100vh'}}
                    >   
                            <SubMenu key="sub1" icon={<Badge count={length} size="small" offset={[2,-1]}> 
                                                    <UserAddOutlined/> 
                                                    </Badge>} title="New friend" >
                                {pendingContact.map((contact, index) => <Menu.Item key = {contact._id} icon = {
                                    <Avatar icon={<UserOutlined />} />}  style = {{paddingLeft: '20px', height:'100px'}}  > 
                                    <ContactPendingBrief
                                    key ={contact._id}
                                    contact = {contact}/>
                                </Menu.Item>)}
                                
                            </SubMenu>
                            

                            <SubMenu key="sub2" icon={<UserOutlined/>} title="My friend">
                                {acceptContact.map((contact, index) => <Menu.Item key = {index} icon = {
                                    <Avatar icon={<UserOutlined />}/>
                                } style = {{paddingLeft: '20px'}}> 
                                    <div 
                                     onClick={e => setDetail(e.target)} 
                                     id = {contact.friend._id}
                                    >
                                        {contact.friend.givenName}
                                    <Text 
                                      type="secondary"
                                      style={{margin:'5px'}}
                                    >
                                        {contact.remark}
                                    </Text>
                                        
                                    </div>
                                </Menu.Item>)}
                            </SubMenu>    
                    </Menu>
                </Sider>
                <Content style={{minHeight: 280, background: '#fff', padding: '2vh 2vh' }}> 
                    {renderContact}
                </Content>
            </Layout>
        </Layout>
    )
    
}