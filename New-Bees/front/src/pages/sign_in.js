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
        verticalAlign: 'middle',
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
        verticalAlign: 'middle',
        display: 'flex',
        marginTop: "5%",
    },
    middle2: {
        float: 'left',
        width: "50%",
        padding: "15px",
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
    },
    block: {
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
        width: 'auto',
        height: 'auto',
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
                props.history.push('/dashboard', {
                    user: res.data.user
                })
            }
            else {
                // if error
                message.error(res.data.error)
            }
        }).catch(error => {
            message.error(error.response.data.error)
        })
    };


    return (
        <div style={{ width: '100vw', height: '100vh, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>

            <div className={classes.middle}>
                <div className={classes.column}>
                    <Container component="main" maxWidth="md">
                        <a href="/">
                            <img src='./pics/logo_full.png' style={{ width: '100%' }}></img>
                        </a>
                        <CssBaseline />
                    </Container>
                </div>
                <div className={classes.middle2} verticalAlign='middle'>
                    <Container component="main" maxWidth="sm">
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

                                <a href={"register"} style={{ float: 'right' }}>
                                    New user? Click here
                                </a>
                                
                                <blocks className={classes.block}>
                                    <Button
                                        variant="contained"
                                        onClick={onSignIn}
                                        className={classes.button}
                                    >
                                        Sign In
                                    </Button>

                                </blocks>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
            <div className={classes.background} > </div>

        </div>
    )
};



export default SignIn;