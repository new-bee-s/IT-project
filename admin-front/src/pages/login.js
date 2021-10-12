//import libraries
import React from 'react';
import { useState } from 'react'
import { message } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
        backgroundImage: 'url("/../pics/snowmountain.jpeg")',
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
    const [account, setaccount] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = () => {

        //put user input to back-end and return status
        axios.post('/login', { account: account, password: password }).then(res => {
            if (res.data.success) {
                // console.log(res.data.data)
                const cookies = new Cookies();
                cookies.set('token', res.data.token, { maxAge: 24 * 60 * 60 })
                props.history.push('/dashboard')
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            console.log("login axios errors")
            message.error(error)
            console.log(error)

            // or throw(error.respond)
        })
    };




    return (
        <div className={classes.background} style={{ width: '100vw', height: '100vh, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>

            <div className={classes.middle}>
                <Container component="main" maxWidth="xs">
                    <a href="/">
                        <img src='../pics/logo_full.png' alt="logo pic" style={{ width: '100%', verticalAlign: 'middle' }}></img>
                    </a>
                    <br />
                    <br />
                    <div>

                        <Typography component="h1" variant="h3" align='center'>Admin Log In</Typography>
                    </div>
                    <br />
                    <div>

                        <p align='center'>Who controls the past controls the future.</p>
                        <p align='center'>Who controls the present controls the past.</p>
                        <p align='right'>― George Orwell, 1984</p>
                    </div>
                    <br />
                    <div>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="account"
                                label="Account"
                                name="account"
                                autoComplete="account"
                                autoFocus
                                onChange={e => setaccount(e.target.value)}
                            />

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
            {/* <div className={classes.background}> </div> */}

        </div>
    )
};

export default SignIn;

