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
        height: '315px',
        backgroundImage: 'url("./pics/homepage_bottom.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '-1vh',
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
                            </blocks>

                        </form>
                    </div>
                </Container>
            </div>

            <div className={classes.background}></div>

        </div>
    )
  };



  export default SignIn;