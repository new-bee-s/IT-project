import React, { createRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Statistic, Row, Col, Button,Input, Space, Spin } from 'antd';
import TextField from '@material-ui/core/TextField';
import { set } from 'mongoose';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
    header: {
        overflow: 'hidden',
        width: '100%',
        marginRight: '0',
        marginLeft: '0',
    },
    middle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalalign: 'middle',
        width: '100%',
        marginTop: "5vh",
        overflow: 'hidden'
    },
    blocks: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '3vh',
        verticalalign: 'middle',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    button: {
        width: "250px",
        height: "50px",
        background: '#429CEF',
        borderRadius: '100px',
        border: 0,
        color: '#FFFFFF',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    },
    background: {
        overflow: 'hidden',
        width: '100%',
        height: '18%',
        backgroundImage: 'url("./pics/vectors_sign_in&sign_up_bottom.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        bottom: 0,
    },

    logo: {
        float: 'left',
        width: '50px',
        height: '40px',
        paddingTop: '1px'
    },

    user: {
        float: 'right',
        width: '120px',
        height: '50px',
    },

    content: {
        minHeight: '280px',
        padding: '24px',
        background: '#fff',
    }
}));


export default function EditInfo (props) { 
    
    const id = props.match.params._id;
    const home = "/dashboard/" + id;
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;
    const { Search } = Input;
    const { profile, setProfile } = useState([]);
    const { loading, setLoading } = useState(true);
    const { notChangePassword, setNotChangePassword} = useState(true);
    const onSearch = value => console.log(value);
    const personalID = createRef();

    useEffect(()=>{
        axios.get(home).then(response=>{
            console.log("data:" + response.data);
            if(response.data.success){
                setProfile(response.data.user);
                console.log("profile:" + profile);
            }
        }).catch(error=>{
            console.log("error:"+error.data)
        })
    },[])

    const changingPassword = () => {
        setNotChangePassword(false)
    }
    
    const changeID = (id) => {
        console.log(id);
        console.log(personalID);
    }
    
    if (notChangePassword){
        return (
            <Layout >
                <Header style={{ padding: '0 10px' }}>
                    <Row style = {{height: "64px"}}>
                        <Col span={2} offset = {1}>
                            <a href= {home}>
                                <div>
                                    <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px'}} />
                                </div>
                            </a>
                        </Col>
                        <Col span={7} offset={2}>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style = {{height: '64px'}}>
                                <Menu.Item key="1">
                                    <a href={home}>
                                        <img src = '/../pics/user_icon.png' alt = 'profile_icon' style = {{height: '24px', verticalAlign: 'middle'}} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Profile</span>
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="2"> 
                                    <img src = '/../pics/contact_icon.png' alt = 'contact_icon' style = {{height: '24px'}} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Contact</span>
                                </Menu.Item>
                                
                                <Menu.Item key="3"> 
                                    <a href={home+'/addFriend'}>
                                        <img src = '/../pics/AddFriend.png' alt = 'AddFriend' style = {{height: '19px'}} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Add Friend</span>
                                    </a>
                                </Menu.Item>
                                
                            </Menu>
                        </Col>
                        <Col span={4} offset={2}>
                            <Search placeholder="click to search" onSearch={onSearch} enterButton style = {{postition: 'relative', paddingTop: '15px'}}/>
                        </Col>
                        <Col span={4} offset={1}>
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px'}}>
                                    {profile.email}
                                </span>
                        </Col>
                    </Row>
                </Header>
                <Layout>

                    <Content style={{ padding: '0 50px' }}>
                        <div style={{minHeight: '100vh', background: '#fff', padding: '24px', marginTop: '24px'}}>

                            <div id="left" style={{width:'15vw',float:'left',paddingLeft:'5vh', paddingTop:'3vh'}}>
                                <Avatar size={140} icon={<UserOutlined />} />
                            </div>

                            <div id="right" style={{float:'right', width:"15vw", paddingRight:'5vw', paddingTop:'8vh'}}>
                                <Button type="primary" size='large' variant="contained" onClick={changingPassword}>
                                    changePassword
                                </Button> 
                            </div>

                            <div id="middle" style={{width:'55vw',float:'middle',paddingTop:'5vh', paddingLeft:'18vw'}}>
                                <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '47px'}}>
                                    Manage Your Profile
                                </div>
                                <br/>
                                <br/>
                                <div>
                                    <form noValidate>
                                        Click to change your personal id.
                                        <br/>
                                        This id can be anything but it has to be unique.
                                        <br/>
                                        People can use this id to find you!
                                        <br/>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="personalID"
                                            label={'Your current id: '+profile.userID}
                                            name="firstname"
                                            autoComplete="email"
                                            onChange={e => changeID(e.target.value)}
                                        />

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label={'Your current email: '+profile.familyName}
                                            name="email"
                                            autoComplete="email"
                                            // onChange={e => setEmail(e.target.value)}
                                        />

                                        <div>
                                            <a href = {home+'/editinfo'}>
                                                <Button type="primary" size='large' style={{paddingLeft:'20px'}}>submit</Button>
                                            </a>
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    };
    return (
        <Layout >
            <Header style={{ padding: '0 10px' }}>
                <Row style = {{height: "64px"}}>
                    <Col span={2} offset = {1}>
                        <a href= {home}>
                            <div>
                                <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px'}} />
                            </div>
                        </a>
                    </Col>
                    <Col span={7} offset={2}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style = {{height: '64px'}}>
                            <Menu.Item key="1">
                                <a href={home}>
                                    <img src = '/../pics/user_icon.png' alt = 'profile_icon' style = {{height: '24px', verticalAlign: 'middle'}} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Profile</span>
                                </a>
                            </Menu.Item>
                            <Menu.Item key="2"> 
                                <img src = '/../pics/contact_icon.png' alt = 'contact_icon' style = {{height: '24px'}} />
                                <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Contact</span>
                            </Menu.Item>
                            
                            <Menu.Item key="3"> 
                                <a href={home+'/addFriend'}>
                                    <img src = '/../pics/AddFriend.png' alt = 'AddFriend' style = {{height: '19px'}} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Add Friend</span>
                                </a>
                            </Menu.Item>
                            
                        </Menu>
                    </Col>
                    <Col span={4} offset={2}>
                        <Search placeholder="click to search" onSearch={onSearch} enterButton style = {{postition: 'relative', paddingTop: '15px'}}/>
                    </Col>
                    <Col span={4} offset={1}>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px'}}>
                                {profile.email}
                            </span>
                    </Col>
                </Row>
            </Header>
            <Layout>

                <Content style={{ padding: '0 50px' }}>
                    <div style={{minHeight: '100vh', background: '#fff', padding: '24px', marginTop: '24px'}}>

                        <div id="left" style={{width:'15vw',float:'left',paddingLeft:'5vh', paddingTop:'3vh'}}>
                            <Avatar size={140} icon={<UserOutlined />} />
                        </div>
                        <div id="right" style={{float:'right', width:"15vw", paddingRight:'5vw', paddingTop:'8vh'}}>
                            
                        </div>
                        <div id="middle" style={{width:'55vw',float:'middle',paddingTop:'5vh', paddingLeft:'18vw'}}>
                            <div style={{ color: 'black', verticalAlign: 'middle', paddingLeft: '13px', fontSize: '47px'}}>
                                Change your password here
                            </div>
                            

                            <div>
                                <form noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        // onChange={e => setPassword(e.target.value)}
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="comfirmed password"
                                        label="Comfirmed Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                        // onChange={e => setComfPassword(e.target.value)}
                                    />

                                    <div>
                                        <a href = {home+'/editinfo'}>
                                            <Button type="primary" size='large'>submit</Button>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
        

    
}

