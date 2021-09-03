// import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { useState } from 'react';
import { message } from 'antd';

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
        marginTop: "20vh",
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
        height: '10%',
        backgroundImage: 'url("./pics/vectors_sign_in&sign_up_bottom.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        bottom:0,
    }

    
}));


// register page
function Register(){

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [confirmPassword,setComfPassword]= useState('');
    
    //using on onchange
    const onSignUp = () => {

        //console.log(email, password)
        //use axios connect back-end and push personal information to back-end
        axios.post('/register', {
            email: email,
            givenName: givenName,
            familyName: familyName,
            password: password,
            confirmPassword: confirmPassword
        }).then(res => { 
          if (res.data.success) {
            message.success("Registered successfully")
          } else { 
            // if error
            message.error(res.data.error)
          }
        }).catch(error => {

            //console.log(error.response.data.error)
            message.error(error.response.data.error)
        })
      }
    

    return (
        <div style={{ width: '100vw', height: '100vw, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>

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
                        <Typography  component="h1" variant="h1" align = "center">
                            Register
                        </Typography>
                        <br/>
                        <Typography  component="h1" variant="h5" align = "center">
                            Welcome to be the new menber!
                        </Typography>
                        <br/>
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
                            autoFocus
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
                            onChange={e => setComfPassword(e.target.value)}
                            />

                            <blocks className={classes.blocks}>
                                <Button variant="contained" 
                                    className = {classes.button} 
                                    onClick={onSignUp}
                                    >
                                    Register
                                </Button>
                            </blocks>
                        </form>
                    </div>
                </Container>
            </div>

            <div className={classes.background}></div>

        </div>
    )
  };



  export default Register;