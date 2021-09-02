import React from 'react';
import { useState } from 'react'
import { message } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import Link from '@material-ui/core/Link';

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
    middle1: {
        float: 'left',
        display: 'felx',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '40%',
        marginTop: "35vh",
        overflow: 'hidden'
        
    },
    middle2: {
        float: 'right',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '50%',
        marginTop: "30vh",
        overflow: 'hidden'
    },
    blocks: {
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
        bottom:0,
    }
}));

function SignIn(props){
        
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = () => {
        
        console.log(email,password);
        axios.post('/signin', { email: email, password: password }).then(res => {
            if (res.data.success) {
                user: res.data.user

            } else {
            message.error(res.data.error)
            }
        }).catch(error => {
            //console.log(error.response.data.error)
            message.error(error.response.data.error)
        })};
    
    

    return (
        <div style={{ width: '100vw', height: '100vh, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>


            <div className={classes.middle1}>
                <Container component="main" maxWidth="xs">
                    <a href = "/">
                        <img src="./pics/logo_full.png" alt="logo pic" height={150} />
                    </a>
                    <CssBaseline />
                </Container>
            </div>
            <div className={classes.middle2}>
                <Container component="main" maxWidth="xs">
                    <div>
                        <Typography  component="h1" variant="h1" align = 'center'>Sign In</Typography>
                    </div>
                    <br/>
                    <div>
                        <Typography  component="h1" variant='body1' align = 'center'>Sign in and start managing your candidates!</Typography>
                    </div>
                    <br/>
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
                            <a href = {"register"} style={{float:'right'}}>
                                New user? Click here
                            </a>
                            <blocks className={classes.blocks}>
                                <Button 
                                  variant="contained" 
                                  onClick={onSignIn} 
                                  className = {classes.button}
                                  >
                                    Sign In
                                </Button>

                            </blocks>
                        </form>
                    </div>
                </Container>
            </div>

            <div className={classes.background} > </div>

        </div>
    )
  };



  export default SignIn;