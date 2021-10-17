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
import Cookies from 'js-cookie';


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
        marginTop: "10%",
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
        marginTop: "5%",
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
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/../pics/beach.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        resizeMethod: 'cover',
        position: 'absolute',
        bottom: '0',
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
        fontFamily: 'Ubuntu',
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
        axios.post('/login', { email: email, password: password }).then(res => {
            if (res.data.success) {
                Cookies.set('token', res.data.token, { expires: 1 })
                props.history.push('/dashboard')
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            console.log(error.response.data.error)
            message.error(error.response.data.error)
        })
    }


    return (
        <div style={{ width: '100vw', height: '100vh, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
            
            <div className={classes.middle}>
                <div className={classes.column}>
                <div style={{width: '50%',height: '100%', backgroundImage: 'url("/../pics/background24.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', left: '0vw', top:'0vh'}}>
                        <a href="/">
                            <img src='../pics/logo_full.png' alt="logo pic" style={{ width: '80%', verticalAlign: 'middle',  position: 'absolute', left: '5vw', top:'34vh' }}></img>
                        </a>
                        </div>
                        </div>
                        <div style={{width: '50%',height: '100%', backgroundColor: '#fffbf0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', right: '0vw', top:'0vh'}}>
                <div align = 'center' verticalalign='middle'>

                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Container component="main" maxWidth="xs">
                        <div>
                            <Typography component="h1" variant="h1" align='center'>Log In</Typography>
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
                                        Log In
                                    </Button>

                                </div>

                            </form>
                        </div>
                    </Container>
                </div>
                </div>
            </div>

        </div>
    )
};

export default SignIn;