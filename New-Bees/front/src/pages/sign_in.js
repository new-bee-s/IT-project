//import libraries
import React from 'react';
import { useState } from 'react'
import { message } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import Cookies from 'universal-cookie';


////web page style design
const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        boxSizing: "border-box",
        position: 'center',
        marginTop: '5vh'
    },
    middle: {
        display: 'felx',
        alignItems: 'center',
        verticalalign: 'middle',
        justifyContent: 'center',
        marginTop: "7%",
        boxSizing: "border-box",
        width: '100%',
    },
    column: {
        float: 'left',
        width: "50%",
        padding: "15px",
        alignItems: 'center',
        verticalalign: 'middle',
        display: 'flex',
        marginTop: "8%",
    },
    middle2: {
        float: 'left',
        width: "50%",
        padding: "15px",
        display: 'flex',
        alignItems: 'center',
        verticalalign: 'middle',
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
    blocks_signin: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '3vh',
        verticalAlign: 'middle',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    blocks_text: {
        height: '3vh',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '1vh',
        verticalAlign: 'middle',
        borderRadius: 2,
        display: 'flex',
        fontFamily:'Ubuntu',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    blocks_google: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '1.5vh',
        verticalAlign: 'middle',
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
        alignItems: 'center',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    },
    button_google: {
        width: "250px",
        height: "50px",
        background: '#EA4335',
        borderRadius: '100px',
        border: 1,
        color: '#FFFFFF',
        alignItems: 'center',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    }
}));

// signin page
function SignIn(props) {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //using on onchange
    const onSignIn = () => {

        //put user input to back-end and return status
        axios.post('/signin', { email: email, password: password }).then(res => {
            if (res.data.success) {
                console.log(res.data.data)
                let detail = { id: res.data.data, user: res.data.user }
                let path = {
                    pathname: '/dashboard/' + res.data.data,
                    state: detail
                }
                props.history.push(path)
                const cookies = new Cookies();
                cookies.set('userInfo', res.data.token, { path: '/', maxAge: 2592000 });
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            message.error(error.respond.data.error)
        })
    };


    return (
        <div style={{ width: '100vw', height: '100vh, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>

            <div className={classes.middle}>
                <div className={classes.column}>
                    <Container component="main" maxWidth="md">
                        <a href="/">
                            <img src='./pics/logo_full.png' alt="logo pic" style={{ width: '90%', verticalAlign: 'middle', paddingLeft:'15vh'}}></img>
                        </a>
                        <CssBaseline />
                    </Container>
                </div>
                <div className={classes.middle2} verticalalign='middle'>
                    <Container component="main" maxWidth="xs">
                        <div>
                            <Typography component="h1" variant="h1" align='center'>Sign In</Typography>
                        </div>
                        <br />
                        <div>
                            <Typography component="h1" variant='body1' align='center'>Sign in and start managing your candidates!</Typography>
                        </div>
                        <br />
                        <div>
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <a href={"register"} style={{ float: 'right' }}>
                                    New user? Click here
                                </a>

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

                                
                                <div className={classes.blocks_signin}>
                                    <Button
                                        variant="contained"
                                        onClick={onSignIn}
                                        className={classes.button}
                                    >
                                        Sign In
                                    </Button>

                                </div>

                                {/* <div className={classes.blocks_text}>
                                    <p>
                                        or
                                    </p>
                                </div>
                                
                                <div className={classes.blocks_google}>

                                    <Button variant="contained" className = {classes.button_google}href={window.location.href}>
                                        google
                                    </Button>
                                    <Button onclick="google_login">
                                        Login with Google
                                    </Button>
                                </div> */}
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
            <div className={classes.background}> </div>

        </div>
    )
};

/* <script src="https://apis.google.com/js/api:client.js"></script>

function google_login() {
    var googleUser = {};
        gapi.load('auth2', function(){

            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: 'client_id',
                cookiepolicy: 'single_host_origin',
                scope: 'profile'
            });
            attachSignin(document.getElementById('google_button'));
        }
    );
}

function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            var profile = auth2.currentUser.get().getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
        }, function(error) {
            console.log(JSON.stringify(error, undefined, 2));
        }
    );
} */


export default SignIn;