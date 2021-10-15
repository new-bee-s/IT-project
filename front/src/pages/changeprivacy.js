import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar, Row, Col, Button, Space, Spin, message, Tooltip, Dropdown } from 'antd';
import axios from '../commons/axios.js';
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';

export default function ChangePrivacy(props) {

    const home = "/dashboard";
    const { Header, Content } = Layout;

    // get data to display
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    // store input data for changing profile
    const [userID, setUserID] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [introduction, setIntroduction] = useState('');

    // get data from backend
    useEffect(() => {
        axios.get(home
        ).then(response => {
            if (response.data.success) {
                setProfile(response.data.user);
                setLoading(false);
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error);
        })
    }, [home])

    // logout
    const OnLogOut = () => {
        const cookies = new Cookies()
        cookies.remove('token')
        props.history.push('/login');
    }

    const logout = (
        <Menu>
            <Menu.Item key="1" onClick={OnLogOut}>Log Out</Menu.Item>
        </Menu>
    );


    // change personal infos
    const changeInformation = () => {

        axios.post(home + '/editInfo', { givenName: givenName, familyName: familyName, userID: userID, introduction: introduction}).then(res => {
            if (res.data.success) {
                message.success("successfully changed profile!")
                props.history.push('/dashboard', { replace: true });
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error)
            // or throw(error.respond)
        })
    }



    const changeAvatar = (e) => {
        e.preventDefault();

        var reader = new FileReader();
        var file = e.target.files[0];
        reader.onloadend = () => {

            axios.post(home + '/uploadImage', { image: reader.result }).then(res => {
                if (res.data.success) {
                    message.success("successfully changed avatar!");
                }
                else {
                    // if error
                    message.error(res.data.error)
                    return;
                }

            }).catch(error => {
                console.log(error.response.data.error)
                message.error(error.response.data.error)
                return;
            })
        }
        reader.readAsDataURL(file);

    }

    

    // if the page is loading, draw a loading animation
    if (loading) {
        return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
            <Spin size="large" />
            <h3>Loading</h3>
        </Space>;
    }

    
    return (
        <Layout >
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
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ height: '64px' }}>
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

                    <Col span={3} offset={1}>
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
                    </Col>
                </Row>
            </Header>

            <Layout>
                <Content style={{ padding: '0 5vw', backgroundImage: 'url("/../pics/background4.jpg")' }}>
                    <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>

                        <div id="left" style={{ width: '20vw', float: 'left', paddingLeft: '8vw', paddingTop: '5vh' }}>
                            <Avatar size={140} src={profile.photo.data} />
                            
                            <div>
                                &nbsp;
                            </div>

                            <Button type="primary" size='large'>
                                <input id="inputAvatar" style={{ display: 'none' }} type="file" onChange={(e) => changeAvatar(e)} />
                                <label style={{ color: "#FFF" }} htmlFor="inputAvatar">
                                    Change Avatar
                                </label>
                            </Button>


                            <div>
                                &nbsp;
                            </div>

                            <a href={home+"/changepassword"}>
                                <Button type="primary" size='large' variant="contained">
                                    Change Password
                                </Button>
                            </a>

                            <div>
                                &nbsp;
                            </div>

                            <a href={home+"/changeinfo"}>
                                <Button type="primary" size='large' variant="contained">
                                    Change Information
                                </Button>
                            </a>
                            
                        </div>

                        <div id="right" style={{ width: "12vw", float: 'right', paddingRight: '5vw', paddingTop: '8vh' }}>
                        </div>

                        <div id="middle" style={{ width: '45vw', float:'right', paddingTop: '5vh', margin: '0 auto' }}>

                            <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '47px' }}>
                                Change your privacy
                            </div>
                            <br />

                            <div>
                                <form noValidate>


                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        rows="3"
                                        multiline="true"
                                        id="introduction"
                                        label={'Introduce yourself: '}
                                        defaultValue={profile.introduction}
                                        placeholder={profile.introduction}
                                        name="introduction"
                                        autoComplete="introduction"
                                        onChange={e => setIntroduction(e.target.value)}
                                    />


                                    <Tooltip title={
                                        <div style={{ verticalAlign: 'middle', fontSize: '15px', paddingLeft: '0px' }}>
                                            Set a personal ID and people can use it to find you!
                                            <br />
                                            The ID must contain one uppercase, lowercase letter and digit and be more than 8 characters
                                            <br />
                                        </div>}
                                        placement="right"
                                        color="blue"
                                    >

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="userID"
                                            label={'Your current id: ' + profile.userID}
                                            name="userID"
                                            autoComplete="UserID"
                                            onChange={e => setUserID(e.target.value)}
                                        />
                                    </Tooltip>

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="givenName"
                                        label={'Your current givenName: ' + profile.givenName}
                                        name="givenName"
                                        autoComplete="givenName"
                                        onChange={e => setGivenName(e.target.value)}
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="familyName"
                                        label={'Your current familyName: ' + profile.familyName}
                                        name="familyName"
                                        autoComplete="familyName"
                                        onChange={e => setFamilyName(e.target.value)}
                                    />

                                    <div style={{ paddingTop: '3vh' }}>
                                        <Button type="primary" size='large' onClick={changeInformation}>
                                            Save
                                        </Button>

                                        <span>
                                            &nbsp;&nbsp;
                                        </span>

                                        <a href={home}>
                                            <Button type="primary" size='large'>
                                                Cancel
                                            </Button>
                                        </a>

                                    </div>
                                </form >

                            </div >
                        </div >
                    </div >
                </Content >
            </Layout >
        </Layout >
    )
}
