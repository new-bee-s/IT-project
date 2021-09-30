import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Statistic, Row, Col, Button, Space, Spin } from 'antd';

import Cookies from 'universal-cookie';


export default class Dashboard extends React.Component {


    constructor(props) {
        super(props)
        this.state = { profile: undefined, loading: true, avatar: undefined};
    }


    componentDidMount() {
        const id = this.props.match.params._id;
        const home = "/dashboard/" + id;
        axios.get(home).then(response => {
            if(response.data.success){
                this.setState({profile: response.data.user, loading: false, avatar: response.data.user.photo.data});
            }
        }).catch(error => {
            this.props.history.push('/signin');
        })
    }



    render() {
        const OnLogOut = () => { 
            const id = this.props.match.params._id;
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
        const { SubMenu } = Menu;
        const { Header, Content, Footer, Sider } = Layout;
        const { profile, loading, avatar } = this.state;
        const onSearch = value => console.log(value);
        const id = this.props.match.params._id;
        const home = "/dashboard/" + id;
        if (loading) {
            return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                        <Spin size="large" />
                        <h3>Loading</h3>
                    </Space>;
        }

        const logout = (
            <Menu>
              <Menu.Item key="1" onClick = {OnLogOut}>Log Out</Menu.Item>
            </Menu>
          );
        


        return (
            <Layout>
                <Header style={{ padding: '0 10px' }}>
                    <Row style={{ height: "64px" }}>
                        <Col span={2} offset={1}>
                            <a href={home}>
                                <div>
                                    <img src='../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                                </div>
                            </a>
                        </Col>
                        <Col span={7} offset={2}>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ height: '64px' }}>
                                <Menu.Item key="1">
                                    <a href={home}>
                                        <img src='../pics/user_icon.png' alt='profile_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                    </a>
                                </Menu.Item>
                                
                                <Menu.Item key="2">
                                    <a href={home+'/contact'}>
                                        <img src='../pics/contact_icon.png' alt='contact_icon' style={{ height: '24px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key="3">
                                    <a href={home + '/search'}>
                                        <img src='../pics/AddFriend.png' alt='AddFriend' style={{ height: '19px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Search</span>
                                    </a>
                                </Menu.Item>

                            </Menu>
                        </Col>
                        <Col span={7} offset={1}>
                            <Menu theme="dark" mode="horizontal" style={{ height: '64px'}}>
                                <Dropdown overlay={logout}>
                                    <Menu.Item key="1">
                                        <a className="ant-dropdown-link">
                                            <Avatar src={avatar}/>
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
                <Layout>
                    <Content style={{ padding: '0 5vw', backgroundImage:'url("../pics/background2.jpg")'}}>
                        <div style={{minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2vw', marginTop: '2vh'}}>

                                <div id="left" style={{width:'20vw',float:'left',paddingLeft:'5vw', paddingTop:'5vh'}}>
                                    <Avatar size={140} src={avatar} />
                                </div>

                                <span id="right" style={{width:"15vw", float:'right', paddingRight:'5vw', paddingTop:'8vh'}}>
                                    <a href = {home+'/editinfo'}>
                                        <Button type="primary" size='large'>change profile</Button>
                                    </a>
                                </span>

                                <div style={{width:'50vw',paddingTop:'5vh', margin:'0 auto'}}>
                                    
                                    <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '47px'}}>
                                        Hi!&nbsp;{profile.givenName}&nbsp;{profile.familyName}
                                    </div>

                                    <div style={{ verticalAlign: 'middle', fontSize: '18px', color:'rgba(0,0,0,0.6)'}}>
                                        ID:&nbsp;{profile.userID}
                                        <br/>
                                        Introduction:&nbsp;{profile.introduction}

                                    </div>

                                    <div style={{fontSize:'27px', paddingTop:'10vh'}}>
                                        <Row gutter={20}>
                                            <Col span={20}>
                                                <Statistic title="Active Users" size='large' value={112893} />
                                            </Col>
                                            <Col span={20}>
                                                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                                                <Button style={{ marginTop: 16 }} type="primary">
                                                    Recharge
                                                </Button>
                                            </Col>
                                            <Col span={20}>
                                                <Statistic title="Active Users" value={112893} loading />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                    </Content>
                </Layout >
            </Layout >
        );
    }

};
