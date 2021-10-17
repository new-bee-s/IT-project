import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown, Card, Descriptions, Badge } from 'antd';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Row, Col, Button, Space, Spin } from 'antd';
import { message } from 'antd';
import Cookies from 'js-cookie';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { profile: undefined, loading: true };
    }

    componentDidMount() {
        const home = '/dashboard';
        axios.get(home, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            if (response.data.success) {
                this.setState({ profile: response.data.user, loading: false });
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error);
            this.props.history.push('/login', { replace: true });
        })
    }



    render() {
        const OnLogOut = () => {
            Cookies.remove('token');
            this.props.history.push('/login', { replace: true });
        }

        // Define the variable
        const { Header, Content } = Layout;
        const { profile, loading } = this.state;
        const { Meta } = Card;
        const home = '/dashboard';
        if (loading) {
            return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size='large' />
                <h3>Loading</h3>
            </Space>;
        }

        const logout = (
            <Menu>
                <Menu.Item key='1' onClick={OnLogOut}>Log Out</Menu.Item>
            </Menu>
        );



        return (
            <Layout>
                <Header style={{ padding: '0 10px' }}>
                    <Row style={{ height: '64px' }}>
                        <Col span={2} offset={1}>
                            <a href={home}>
                                <div>
                                    <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                                </div>
                            </a>
                        </Col>
                        <Col span={7} offset={2}>
                            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} style={{ height: '64px' }}>
                                <Menu.Item key='1'>
                                    <a href={home}>
                                        <img src='../pics/user_icon.png' alt='profile_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key='2'>
                                    <a href={home + '/contact'}>
                                        <img src='../pics/contact_icon.png' alt='contact_icon' style={{ height: '24px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key='3'>
                                    <a href={home + '/search'}>
                                        <img src='../pics/AddFriend.png' alt='AddFriend' style={{ height: '19px' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Search</span>
                                    </a>
                                </Menu.Item>

                            </Menu>
                        </Col>
                        <Col span={7} offset={1}>
                            <Menu theme='dark' mode='horizontal' style={{ height: '64px' }}>
                                <Dropdown overlay={logout}>
                                    <Menu.Item key='1'>
                                        <Avatar src={profile.photo.data} />
                                        <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px' }}>
                                            {profile.email}
                                        </span>
                                    </Menu.Item>
                                </Dropdown>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Content style={{ padding: '0 5vw', backgroundImage: 'url("../pics/background2.jpg")' }}>
                        <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2vw', marginTop: '2vh' }}>

                            <div id='left' style={{ width: '10vw', float: 'left', paddingLeft: '5vw', paddingTop: '5vh' }}>
                                <div style={{paddingLeft:'3vw'}}>
                                    <Avatar size={140} src={profile.photo.data}/>
                                </div>
                                
                                <br/>
                                <br/>
                                <br/>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Meta title="Europe Street beat" description="www.instagram.com" />
                                </Card>
                            </div>

                            <div id='right' style={{ width: '60vw', float:'right', paddingTop: '3vh', margin: '0 auto' }}>
                                
                                <span style={{ color: 'black', verticalAlign: 'middle', fontSize: '60px' }}>
                                    Hi!&nbsp;{profile.givenName}&nbsp;{profile.familyName}
                                </span>

                                <span style={{float:'right', paddingRight:'3vw', paddingTop:'5vh'}}>
                                    <a href={home + '/changeinfo'}>
                                        <Button type='primary' size='large'>change profile</Button>
                                    </a>
                                </span>

                                <Descriptions layout="vertical" style={{paddingTop:'5vh'}} bordered>
                                <Descriptions.Item label="UserID">{profile.userID}</Descriptions.Item>
                                    <Descriptions.Item label="Given Name">{profile.givenName}</Descriptions.Item>
                                    <Descriptions.Item label="Family Name">{profile.familyName}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
                                    <Descriptions.Item label="Gender">{profile.gender}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile number">{profile.mobile}</Descriptions.Item>
                                    {/* <Descriptions.Item label="Region">{profile.region}</Descriptions.Item>
                                    <Descriptions.Item label="Date of Birth">{profile.dob}</Descriptions.Item>
                                    <Descriptions.Item label="Company">{profile.company}</Descriptions.Item>
                                    <Descriptions.Item label="Occupation">{profile.occupation}</Descriptions.Item> */}
                                    <Descriptions.Item label="introduction">{profile.introduction}</Descriptions.Item>
                                </Descriptions>
                            </div>



                        </div>
                    </Content>
                </Layout >
            </Layout >
        );
    }

};
