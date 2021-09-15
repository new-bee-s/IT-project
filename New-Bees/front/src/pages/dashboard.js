import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { Input, Space } from 'antd';
import { Avatar } from 'antd';


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
    }
}));



function Dashboard() {

    const classes = useStyles();
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;
    const { Search } = Input;
    const onSearch = value => console.log(value);
    return (
        <Layout >
            <Header style={{ padding: '0 10px' }}>
                <Row style = {{height: "64px"}}>
                    <Col span={2} offset = {1}>
                        <a href="/dashboard">
                            <div>
                                <img src='./pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px'}} />
                            </div>
                        </a>
                    </Col>
                    <Col span={5} offset={2}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style = {{height: '64px'}}>
                            <Menu.Item key="1"> 
                                <img src = './pics/user_icon.png' alt = 'profile_icon' style = {{height: '30px', padding: '6px'}} />
                                <span style={{ verticalAlign: 'middle', paddingLeft: '10px'}}>Profile</span>
                            </Menu.Item>
                            <Menu.Item key="2">Contact</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4} offset={4}>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton style = {{postition: 'relative', paddingTop: '15px'}}/>
                    </Col>
                    <Col span={4} offset={1}>
                        
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px'}}>Email Address</span>


                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
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
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

};

export default Dashboard;