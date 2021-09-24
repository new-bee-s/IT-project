import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Statistic, Row, Col, Button, Input, Space, Spin } from 'antd';
import { Cookie } from 'express-session';
import Cookies from 'universal-cookie';


// dashboard style
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


export default class Dashboard extends React.Component {


    constructor(props) {
        super(props)
        this.state = { profile: undefined, loading: true };
    }


    componentDidMount() {
        const id = this.props.match.params._id;
        const home = "/dashboard/" + id;
        axios.get(home).then(response => {
            if(response.data.success){
                this.setState({profile: response.data.user, loading: false});
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
        const { Search } = Input;
        const { profile, loading } = this.state;
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
            <Layout >
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
                                    <img src='../pics/contact_icon.png' alt='contact_icon' style={{ height: '24px' }} />
                                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                </Menu.Item>

                                <Menu.Item key="3">
                                    <a href={home + '/addFriend'}>
                                        <img src='../pics/AddFriend.png' alt='AddFriend' style={{ height: '19px' }} />
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
                <Layout>
                    {/* <Sider width={'12%'} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider> */}
                    <Content style={{ padding: '0 5vw' }}>
                        <div style={{minHeight: '100vh', background: '#fff', padding: '2vw', marginTop: '2vh'}}>

                                <div id="left" style={{width:'20vw',float:'left',paddingLeft:'5vw', paddingTop:'5vh'}}>
                                    <Avatar size={140} icon={<UserOutlined />} />
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
