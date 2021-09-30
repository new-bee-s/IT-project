import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar, Row, Col, Button, Input, Space, Spin, message, Tooltip, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from '../commons/axios.js';
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';


export default function EditInfo(props) {

    const id = props.match.params._id;
    const home = "/dashboard/" + id;
    const { Header, Content } = Layout;
    const { Search } = Input;

    // get data to display
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notChangePassword, setNotChangePassword] = useState(true);

    // store input data for changing profile
    const [userID, setUserID] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [introduction, setIntroduction] = useState('');

    // store input password
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');


    // email cannot be updated because it is currently used as login username
    // const [ email, setEmail ] = useState('');
    const onSearch = value => console.log(value);

    // get data from backend
    useEffect(() => {
        axios.get(home).then(response => {
            // console.log("data:" + response.data);
            if (response.data.success) {
                setProfile(response.data.user);
                // console.log("email: "+response.data.user.email);
                setLoading(false);
            }
        }).catch(error => {
            console.log("error: " + error.data)
        })
    }, [home])


    // set the state to changing password state
    const changingPassword = () => {
        setNotChangePassword(false)
    }

    // logout
    const OnLogOut = () => {
        const logout = '/' + id + '/logout';
        axios.get(logout).then(response => {
            if (response.data.success) {
                const cookies = new Cookies();
                cookies.remove('token');
                cookies.remove('connect.sid')
                props.history.push('/signin');
            }
        }).catch(error => {
            console.log(error.response);
        })

    }

    const logout = (
        <Menu>
            <Menu.Item key="1" onClick={OnLogOut}>Log Out</Menu.Item>
        </Menu>
    );


    // change personal infos
    const changeInformation = () => {

        axios.post(home + '/editInfo', { givenName: givenName, familyName: familyName, userID: userID, introduction: introduction }).then(res => {
            if (res.data.success) {
                //console.log("success:"+email)
                console.log("success changed profile")
                message.success("success changed profile")
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            message.error(error.response.data.error)
            console.log(error.response.data.error)
            // or throw(error.respond)
        })
    }

    // check whether the input email is valid
    // const checkEmail = (email) => {
    //     var correctEmail = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    //     return correctEmail.test(email);
    // }

    // change user's password
    const changePassword = () => {

        if (password !== confirmedPassword) {
            console.log("input different password");
            message.error("You input a different confirmed password!");
            return;
        }

        axios.post(home + '/editInfo', { password: password }).then(res => {
            if (res.data.success) {
                console.log("success changed password");
                message.success("success changed password");

                // if success
                // logout and clear cookies
                // go back to sign in page
                const logout = '/' + id + '/logout';
                axios.get(logout).then(response => {
                    if (response.data.success) {
                        const cookies = new Cookies();
                        cookies.remove('token');
                        cookies.remove('connect.sid')
                        props.history.push('/signin');
                    }
                }).catch(error => {
                    console.log("logout error: " + error.response);
                })
            }
            else {
                // if error
                message.error(res.data.error)
                return;
            }

        }).catch(error => {
            message.error(error.response.data.error)
            console.log(error.response.data.error)
            // or throw(error.respond)
            return;
        })

    }

    const changeAvatar = (e) => {
        e.preventDefault();

        var reader = new FileReader();
        var file = e.target.files[0];
        reader.onloadend = () => {
            console.log('result: ', reader);

            axios.post(home + '/uploadImage', { image: reader.result }).then(res => {
                if (res.data.success) {
                    console.log("success changed avatar");
                    message.success("success changed avatar");
                }
                else {
                    // if error
                    message.error(res.data.error)
                    return;
                }

            }).catch(error => {
                message.error(error.response)
                console.log(error.response)
                return;
            })
        }
        reader.readAsDataURL(file);

    }

    const cancelChangingPassword = () => {
        setNotChangePassword(true);
    }

    // if (profile.photo) {
    //     console.log(file)
    //     return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
    //         <img style={{ width: '80px', height: '80px' }} src={profile.photo} />
    //     </Space>;
    // }

    // if the page is loading, draw a loading animation
    if (loading) {
        return <Space size="middle" style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
            <Spin size="large" />
            <h3>Loading</h3>
        </Space>;
    }

    // display normal change info page
    else if (notChangePassword) {
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

                        <Col span={4} offset={2}>
                            <Search placeholder="click to search" onSearch={onSearch} enterButton style={{ postition: 'relative', paddingTop: '15px' }} />
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

                            <span id="left" style={{ width: '15vw', float: 'left', paddingLeft: '5vw', paddingTop: '5vh' }}>
                                <Avatar size={140} src={profile.photo.data} />
                            </span>

                            <span id="right" style={{ width: "15vw", float: 'right', paddingRight: '5vw', paddingTop: '8vh' }}>

                            </span>

                            <div id="middle" style={{ width: '45vw', paddingTop: '5vh', margin: '0 auto' }}>

                                <div style={{ color: 'black', verticalAlign: 'middle', fontSize: '47px' }}>
                                    Manage Your Profile
                                </div>
                                <br />

                                <div>
                                    <form noValidate>

                                        <Tooltip title={
                                            <div style={{ verticalAlign: 'middle', fontSize: '15px', paddingLeft: '0px' }}>
                                                This ID can be anything but it has to be unique.
                                                <br />
                                                People can use it to find you!
                                                <br />
                                            </div>
                                        }
                                            placement="right"
                                            color="blue">

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
                                            id="introduction"
                                            label={'Introduce yourself: ' + profile.introduction}
                                            name="introduction"
                                            autoComplete="introduction"
                                            onChange={e => setIntroduction(e.target.value)}
                                        />


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

                                        {/* <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label={'Your current email: '+profile.email}
                                            name="email"
                                            autoComplete="email"
                                            onChange={e => setEmail(e.target.value)}
                                        /> */}


                                        <div style={{ paddingTop: '3vh' }}>
                                            <a href={home}>
                                                <Button type="primary" size='large' onClick={changeInformation}>
                                                    Submit
                                                </Button>
                                            </a>

                                            <span>
                                                &nbsp;&nbsp;
                                            </span>

                                            <a href={home}>
                                                <Button type="primary" size='large'>
                                                    Cancel
                                                </Button>
                                            </a>

                                            <span>
                                                &nbsp;&nbsp;
                                            </span>

                                            <Button type="primary" size='large' variant="contained" onClick={changingPassword}>
                                                Change password
                                            </Button>

                                            <span>
                                                &nbsp;&nbsp;
                                            </span>

                                            <Button type="primary" size='large'>
                                                <input id="inputAvatar" style={{ display: 'none' }} type="file" onChange={(e) => changeAvatar(e)} />
                                                <label style={{ color: "#FFF" }} htmlFor="inputAvatar">
                                                    Change Avatar
                                                </label>
                                            </Button>

                                        </div>
                                    </form >

                                </div >
                            </div >
                        </div >
                    </Content >
                </Layout >
            </Layout >
        )
    };

    // change password page
    // if the change password buttun is clicked
    // the status is now changing password mode
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
                                <a href={home + '/addFriend'}>
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
                                    <span style={{ color: 'white', verticalAlign: 'middle', paddingLeft: '10px' }}>
                                        {profile.email}
                                    </span>
                                </Menu.Item>
                            </Dropdown>
                        </Menu>
                    </Col>
                </Row>
            </Header >
            <Layout>

                <Content style={{ padding: '0 5vw', backgroundImage: 'url("/../pics/background4.jpg")' }}>
                    <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>

                        <div id="left" style={{ width: '15vw', float: 'left', paddingLeft: '5vw', paddingTop: '5vh' }}>
                            {/* <Avatar size={140} icon={<UserOutlined />} /> */}
                        </div>

                        <div id="right" style={{ float: 'right', width: "15vw", paddingRight: '5vw', paddingTop: '8vh' }}>
                            {/* <button>go back</button> */}
                        </div>

                        <div id="middle" style={{ width: '45vw', paddingTop: '5vh', margin: '0 atuo' }}>
                            <div style={{ color: 'black', verticalAlign: 'middle', paddingLeft: '13px', fontSize: '47px' }}>
                                Change your password
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
                                        onChange={e => setPassword(e.target.value)}
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
                                        onChange={e => setConfirmedPassword(e.target.value)}
                                    />

                                    <div style={{ paddingTop: '3vh' }}>
                                        {/* <a href = {home+'/editinfo'}> */}
                                        <Button type="primary" size='large' onClick={changePassword}>
                                            Submit
                                        </Button>

                                        <span>
                                            &nbsp;&nbsp;
                                        </span>

                                        <Button type="primary" size='large' onClick={cancelChangingPassword}>
                                            Cancel
                                        </Button>
                                        {/* </a> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout >
    )
}

