// import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { useState } from 'react';
import { message } from 'antd';
import Cookies from 'universal-cookie';

//web page style design
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
        boxSizing: "border-box",
        width: '100%',
    },
    column: {
        display: 'flex',
        float: 'left',
        width: "50%",
        padding: "15px",
        alignItems: 'center',
        verticalAlign: 'middle',
        boxSizing: "border-box",
        height: '100%',
    },
    middle2: {
        float: 'left',
        width: "50%",
        padding: "15px",
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
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
        bottom: 0,
    },

}));

// register page
function Register(props) {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [confirmedPassword, ConfirmedPassword] = useState('');

    //using on onchange
    const onSignUp = () => {

        console.log(email, password)

        //console.log(email, password)
        //use axios connect back-end and push personal information to back-end
        axios.post('/register', {
            email: email,
            givenName: givenName,
            familyName: familyName,
            password: password,
            confirmPassword: confirmedPassword
        }).then(res => {
            if (res.data.success) {
                // console.log(res.data.data)
                const cookies = new Cookies();
                cookies.set('token', res.data.token, { httpOnly: false, sameSite: false, secure: true, maxAge: 24 * 60 * 60, path: '/' });
                props.history.push('/dashboard/')
            }

        }).catch(error => {
            //console.log(error.response.data.error)
            console.log(error.response.data.error)
            message.error(error.response.data.error)
        })
    }


    return (
        <div style={{ width: '100vw', height: '100vw, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
            <div className={classes.middle}>
                <div className={classes.column} style={{ textAlign: 'center', minHeight: '82vh' }}>
                    <span>
                        <a href="/">
                            <img src='./pics/logo_full.png' title="go back to home page" alt="logo pic" style={{ width: '75%' }}></img>
                        </a>
                    </span>

                </div>
                <div className={classes.background}></div>
                <div className={classes.column} style={{ textAlign: 'center', paddingRight: '15vh', minHeight: '82vh' }}>
                    <Container component="main" maxWidth="xs">
                        <div>
                            <Typography component="h1" variant="h1" align="center">
                                Register
                            </Typography>
                            <br />
                            <Typography component="h1" variant="h5" align="center">
                                Welcome to be the new menber!
                            </Typography>
                            <br />
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="givenName"
                                    label="First Name"
                                    name="firstname"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={e => setGivenName(e.target.value)}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="familyName"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="email"
                                    onChange={e => setFamilyName(e.target.value)}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
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
                                    onChange={e => ConfirmedPassword(e.target.value)}
                                />

                                <blocks className={classes.blocks}>
                                    <Button variant="contained" className={classes.button} onClick={onSignUp}>
                                        Register
                                    </Button>
                                </blocks>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
};



export default Register;