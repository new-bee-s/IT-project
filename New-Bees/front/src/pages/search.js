import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown, Card, Divider, message} from 'antd';


import { UserOutlined, CheckOutlined, UserAddOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import { Avatar, Radio, Drawer } from 'antd';
import axios from '../commons/axios.js';
import { Statistic, Row, Col, Button, Input, Space, Spin} from 'antd';
import { Cookie } from 'express-session';
import Cookies from 'universal-cookie';


// addFriend style
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


export default class AddFriend extends React.Component {


    constructor(props) {
        super(props)
        this.state = { profile: undefined, loading: true, result: undefined, visible: false};
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
                    this.props.history.push( '/signin');
                }
            }).catch(error => {
                console.log(error.response);
            })
        }

        const { SubMenu } = Menu;
        const { Header, Content, Footer, Sider } = Layout;
        const { Meta } = Card;
        const { Search } = Input;
        const { profile, loading, result, visible } = this.state;


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

        //const onSearch = value => console.log(value);
        const onSearch = searchID => {
            console.log(searchID);
            axios.post(home+'/search', {userID: searchID}).then(res => {
                if (res.data.success) {
                    console.log("user"+res.data.user)
                    console.log("success search!")
                    // message.success("success search")
                    this.setState({result: res.data.user});
                    // console.log("result:"+{result});
                    this.setState({visible: true})
                }
                else {
                    // if error
                    console.log("failed search")
                    message.error(res.data.error)
                }
            }).catch(error => {
                message.error(error.response.data.error)
                console.log(error.response.data.error)
                // or throw(error.respond)
            })
        }

        const showResult = ((result) => {

            if (result.userID === undefined) {
                console.log(999999999);
                return (<> </>);
            } 
            else {
                console.log(52246356356);
                return <Card
                            style={{ width: 300, marginTop: 16 }}
                            actions={[
                                <EllipsisOutlined key="ellipsis" />,
                                <EditOutlined key="edit" />,
                                <UserAddOutlined key="add" />
                            ]}       
                        >
                            <Meta
                                avatar={
                                    <Avatar size={48} icon={<UserOutlined />} />
                                }
                                title="FirstName LastName"
                                description="This slogon is empty"
                            />
                    
                        </Card>;
            }
        })

        const showDrawer = () => {
            this.setState({
                visible: true,
            });
        };
        
        const onClose = () => {
            this.setState({
                visible: false,
            });
        };
        
        const getName = () =>{
            if(result.userID===undefined) {
                return "admin";
            }
            else {
                return result.givenName;
            }
        }

        return (
            
            <Layout >
                <Header style={{ padding: '0 10px' }}>
                    <Row style={{ height: "64px" }}>
                        <Col span={2} offset={1}>
                            <a href={home}>
                                <div>
                                    <img src="/../pics/logo_bee.png" alt="logo_bee" style={{ height: '64px', padding: '6px' }} />
                                </div>
                            </a>
                        </Col>
                        <Col span={7} offset={2}>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']} style={{ height: '64px' }}>
                                <Menu.Item key="1">
                                    <a href={home}>
                                        <img src="/../pics/user_icon.png" alt="profile_icon" style={{ height: '24px', verticalAlign: 'middle' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <a href={home+'/contact'}>
                                        <img src="/../pics/contact_icon.png" alt='contact_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                                        <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Contact</span>
                                    </a>
                                </Menu.Item>

                                <Menu.Item key="3">
                                    <a href={home + '/search'}>
                                        <img src="/../pics/AddFriend.png" alt="AddFriend" style={{ height: '19px' }} />
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
                <Layout style={{ padding: '2vh 2vh', paddingRight:'2vh', backgroundImage:'url("/../pics/background23.jpg")'}}>
                    

                    <Content style={{ padding: '0 5vw' }}>
                        <div style={{minHeight: '100vh', background: '#fff', padding: '2vw', marginTop: '2vh'}}>
                            <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '25px'}}>
                                &nbsp;{profile.givenName}&nbsp;{profile.familyName}, Ready to make a new friend? 
                            </div>
                            <div align='center' style={{ color: 'black', verticalAlign: 'middle', fontSize: '25px'}}>
                                Search anyone you wish to work with!
                            </div>
                            <br />
                            
                            <Divider /> 

                            <div align='center'>
                                <img src="/../pics/telescope.png" alt="telescope pic" style={{ height: '300px', padding: '6px' }} />
                                <br />
                                <br />
                                <Search align='center' placeholder="Enter ID" onSearch={onSearch} enterButton style={{ width: 800}} />
                            </div>
                            
                            <br />

                            {/* <div align='center'>
                                {showResult}
                            </div> 

                            <Typography component="h1" variant="h6" align='center'>Someone wants to add you... </Typography>
                            
                            <div align='center'>
                            <Card
                                style={{ width: 300, marginTop: 16 }}
                                actions={[
                                    <EllipsisOutlined key="ellipsis" />,
                                    <EditOutlined key="edit" />,
                                    <CheckOutlined key="confirm" />,
                                ]}
                            >
                            <Meta
                                avatar={
                                    <Avatar size={48} icon={<UserOutlined />} />
                                }
                                title="FirstName LastName"
                                description="This slogon is empty"
                            />
                            </Card>
                            </div> */}
                            <Drawer
                                title="You have find a user"
                                placement={'bottom'}
                                closable={true}
                                onClose={onClose}
                                visible={visible}
                                key={'bottom'}
                                align='center'
                                //style={{ height: 256}}
                                >
                                <Card 
                                    style={{ width: 400, height: 500, marginTop: 16 }}
                                    actions={[
                                        <EllipsisOutlined key="ellipsis" />,
                                        <EditOutlined key="edit" />,
                                        <CheckOutlined key="confirm" />,
                                    ]}
                                >
                                <Meta
                                    avatar={
                                        <Avatar size={48} icon={<UserOutlined />} />
                                    }
                                    title={getName }
                                    description='1'
                                />
                                </Card>
                            </Drawer>

                                



                                

                              
                                

                        </div>
                    </Content>
                </Layout >
            </Layout >
        );
    }

};
