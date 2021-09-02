import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '100%',
        marginTop: "5vh",
        overflow: 'hidden'
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
    },
    background: {
        overflow: 'hidden',
        width: '100%',
        height: '315px',
        backgroundImage: 'url("./pics/homepage_bottom.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '-1vh'
    }

}));

function SignIn(){
        
    const classes = useStyles();
    console.log('jaosn');

    return (
        <div style={{ width: '100vw', height: '100vw, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>

            <div className={classes.header}>
                <a href = "/">
                <img src="./pics/logo_full.png" alt="logo pic" height={90} />
                </a>
            </div>

            <div className={classes.middle}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div >
                        <Avatar > <LockOutlinedIcon /> </Avatar>
                        <Typography  component="h1" variant="h5">Sign In</Typography>
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
                            />

                            <a href = {"register"} style={{float:'right'}}>
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
                            />

                            <a href = {"register"} style={{float:'right'}}>
                                New user? Click here
                            </a>

                            <blocks className={classes.blocks}>
                                <Button variant="contained" className = {classes.button}href={window.location.href + "/"}>
                                    Sign In
                                </Button>
                                
                                {/* <Button onclick="google_login">
                                    Login with Google
                                </Button> */}
                            </blocks>
                            <blocks className={classes.blocks_text}>
                                <p>
                                    or
                                </p>
                            </blocks>
                            <blocks className={classes.blocks_google}>

                                <Button variant="contained" className = {classes.button_google}href={window.location.href}>
                                    google
                                </Button>
                                {/* <Button onclick="google_login">
                                    Login with Google
                                </Button> */}
                            </blocks>

                        </form>
                    </div>
                </Container>
            </div>

            <div className={classes.background}></div>

        </div>
    )
};

{/* <script src="https://apis.google.com/js/api:client.js"></script>

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
} */}


export default SignIn;