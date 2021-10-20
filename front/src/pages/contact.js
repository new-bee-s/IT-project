import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../commons/axios.js'
import ContactPendingBrief from '../components/contactPendingBrief.js'
import ContactBrief from '../components/contactAcceptBrief.js'
import { Menu, Badge, Typography } from 'antd';
import { UserOutlined, UserAddOutlined, SearchOutlined} from '@ant-design/icons';
import { Layout, Dropdown } from 'antd';
import { Row, Col, Space, Spin } from 'antd';
import Cookies from 'js-cookie';
import { Avatar } from 'antd';
import { message } from 'antd';
import { Input} from 'antd';
import { Select } from 'antd';
import { MenuItem } from 'rc-menu'
const { Option } = Select;





export default function Contact(props) {
    const { Search } = Input;
    const { Text } = Typography;
    const { SubMenu } = Menu;
    const [acceptContact, setAcceptContacts] = useState([]);
    const [pendingContact, setPendingContact] = useState([]);
    const [length, setLength] = useState('');
    const { Header, Content, Sider } = Layout;
    const [detailLoading, setDetailLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);
    const [Detail, setDetail] = useState([]);
    const home = '/dashboard';      
    const [profile, setProfile] = useState([]);
    const [searchOption, setSearchOption] = useState("Email" );
    const [searchDisplay, setSearchDisplay] = useState([]);
    const { Option } = Select;

    
    //console.log(acceptContact)

    useEffect(() => {

        // connect contact back-end and seting contact list information
        axios.get(home + '/contact').then(response => {

            if (response.data.success) {
                setAcceptContacts(response.data.accepted)
                setPendingContact(response.data.pending)
                setLength(response.data.pending.length)
                setDetailLoading(false)
                
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error)
        })

        axios.get(home).then(response => {
            if (response.data.success) {
                setProfile(response.data.user);
                setProfileLoading(false);
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error)
        })

    }, [acceptContact], [pendingContact])

    // logout function
    const OnLogOut = () => {
        Cookies.remove('token')
        props.history.push('/login');
    }
    
    const setSearch = e => {
        console.log(e)
        setSearchOption(e)
    }

    
    const onSearch = e =>{
        if (e !== ''){
            let searchList=[];
            if (searchOption === 'Email'){
                searchList = acceptContact.filter(contact=>
                    contact.friend.email.toString().toLowerCase().includes(e)
                );
            }
            else if (searchOption === 'Name'){
                searchList = acceptContact.filter(contact=>
                    contact.contact.friend.givenName.toString().toLowerCase().includes(e)||
                    contact.friend.familyName.toString().toLowerCase().includes(e)
                );
            }
            else if (searchOption === 'Remark'){
                searchList = acceptContact.filter(contact=>
                    contact.remark.toString().toLowerCase().includes(e)
                );
            }
            else if (searchOption === 'UserID'){
                searchList = acceptContact.filter(contact=>
                    contact.friend.userID.toString().toLowerCase().includes(e)
                );
            }
            else if (searchOption === 'Tag'){
                searchList = searchTag(acceptContact, e);
            }
            setSearchDisplay(searchList);
        }
    };

    const searchTag = (allFriendList, e) => {
        var searchList = [];
        allFriendList.map(contact=>{
            contact.tag.map(tag => {
                if (tag.toLowerCase().includes(e)){
                    searchList.push(contact)
                }
            })
        })
        return searchList;
    };




    //render logout
    const logout = (
        <Menu>
            <Menu.Item key="1" onClick={OnLogOut}>Log Out</Menu.Item>
        </Menu>
    );
    
    
    // separate each contact list with index
    const renderContact = acceptContact.map((contact, index) => {
        if (Detail.id === undefined) {
            return (<div key = {index}> </div>)
        }

        if (contact.friend._id === Detail.id) {
            return (
                <ContactBrief
                    key= {index}
                    contact={contact} />
            )

        }
        return (<> </>)
    })

    // loading page if waiting 
    if (detailLoading || profileLoading) {
        return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
            <Spin size="large" />
            <h3>Loading</h3>
        </Space>;
    }
    else {
        // render contact page
        return (
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
                        <Col span={6} offset={2}>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ height: '64px' }}>
                                <Menu.Item key="1">
                                    <a href={home}>
                                        <img src='/../pics/user_icon.png' alt='profile_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key="2">
                                    <a href={home + '/contact'}>
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
                        <Col span={12}>
                            <div style = {{float: 'right'}}>
                                <Menu theme="dark" mode="horizontal" style={{ height: '64px' }}>
                                    <Dropdown overlay={logout}>
                                        <Menu.Item key="1">
                                            <Avatar src={profile.photo.data} />
                                            <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px' }}>
                                                {profile.email}
                                            </span>
                                        </Menu.Item>
                                    </Dropdown>
                                </Menu>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Layout style={{ padding: '2vh 2vh', paddingRight: '2vh', backgroundImage: 'url("/../pics/background1.jpg")' }}>
                    <Sider width={'400px'} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ minHeight: '100vh' }}
                        >   
                            <SubMenu key="3" icon={<SearchOutlined />} title="Search friend">
                                <MenuItem key = "4" style = {{paddingLeft: '10px'}}>
                                    <Input.Group compact style={{ alignSelf: 'center', padding: '10px 20px'}}>
                                        <Select defaultValue="Email" onChange = {setSearch} style = {{width: "90px"}}>
                                            <Option value="Email">Email</Option>
                                            <Option value="UserID">UserID</Option>
                                            <Option value="Remark">Remark</Option>
                                            <Option value="Name">Name</Option>
                                            <Option value="Tag">Tag</Option>
                                        </Select>
                                        <Search style = {{width: "250px"}}
                                            placeholder="Search to Select"
                                            onSearch={onSearch}
                                        />
                                    </Input.Group>
                                </MenuItem>
                                {searchDisplay.map(contact => <Menu.Item icon={
                                    <Avatar icon={<UserOutlined />} key = {contact.friend._id}/>
                                } style={{ paddingLeft: '20px' }}>
                                    <div
                                        onClick={e => setDetail(e.target)}
                                        id={contact.friend._id}
                                    >
                                        {contact.friend.givenName}
                                        <Text
                                            type="secondary"
                                            style={{ margin: '5px' }}
                                        >
                                            {contact.remark}
                                        </Text>

                                    </div>
                                </Menu.Item>)}
                            </SubMenu>
                            <SubMenu key="sub1" icon={<Badge count={length} size="small" offset={[2, -1]}>
                                <UserAddOutlined />

                                </Badge>}
                                title="New friend" 
                            >
                                {pendingContact.map((contact, index) => <Menu.Item key={index} icon={
                                    <Avatar icon={<UserOutlined />} />} style={{ paddingLeft: '20px', height: '100px' }}  >
                                    <ContactPendingBrief
                                        key={contact._id}
                                        contact={contact} />
                                </Menu.Item>)}

                            </SubMenu>
                            <SubMenu key="sub2" icon={<UserOutlined />} title="My friend">
                                {acceptContact.map((contact, index) => <Menu.Item key={index} icon={
                                    <Avatar src={contact.friend.photo.data} />
                                } style={{ paddingLeft: '20px' }}>
                                    <div
                                        onClick={e => setDetail(e.target)}
                                        id={contact.friend._id}
                                    >
                                        {contact.friend.givenName}
                                        <Text
                                            type="secondary"
                                            style={{ margin: '5px' }}
                                        >
                                            {contact.remark}
                                        </Text>

                                    </div>
                                </Menu.Item>)}
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ minHeight: 280, backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw 2vw' }}>
                        {renderContact}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}