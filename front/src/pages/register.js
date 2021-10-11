// import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { useState } from 'react';
import { message } from 'antd';
import { Row, Col, Button, Radio, DatePicker, Space, Select, Cascader} from 'antd'; 
import { Country, State, City }  from 'country-state-city';

//web page style design
const useStyles = makeStyles(theme => ({
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
export default function Register() {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [confirmedPassword, ConfirmedPassword] = useState('');
    const [Gender, setGender] = useState('');
    const [mobieNumber, setMobieNumber] = useState('');
    const [dob, setdob] = useState('');
    const [address, setAddress] = useState([]);
    const [company, setCompany] = useState('');
    const [job, setJob] = useState('');
    const [step, setStep] = useState(1);

    //using on onchange
    const onSignUp = () => {
        console.log(address)
        //use axios connect back-end and push personal information to back-end
        axios.post('/register', {
            email: email,
            givenName: givenName,
            familyName: familyName,
            password: password,
            confirmPassword: confirmedPassword,
            gender: Gender,
            mobile: mobieNumber,
            dob: dob,
            region: {city: address[2], state: address[1], country: address[0]},
            company: company,
            occupation: job
        }).then(res => {
            if (res.data.success) {
                this.props.history.push('/login')
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


    const initial_option = ()=>{
        var contries = Country.getAllCountries();
        var cons = [];
        for (var i = 0; i < contries.length; i ++ ){
            var states = State.getStatesOfCountry(contries[i].isoCode);
            var con = {"value" : undefined, "label": undefined, "children": []};
            for (var j = 0; j < states.length; j ++ ){
                var state = {"value" : undefined, "label": undefined, "children": []};
                var cities = City.getCitiesOfState(contries[i].isoCode, states[j].isoCode);
                for (var k = 0; k < cities.length; k ++){
                    var city = {"value" : undefined, "label": undefined};
                    city.value = cities[k].name;
                    city.label = cities[k].name;
                    state.children[k] = city;
                }
                state.value = states[j].name;
                state.label = states[j].name;
                con.children[j] = state;
            }
            con.value = contries[i].name;
            con.label = contries[i].name;
            cons[i] = con;
        }
        return cons;
    }
    

    const options = initial_option();    

    const stepShow = ()=> {
        console.log();
        if (step === 1){
            return (
                <div>
                    <Row gutter = {20}>
                        <Col span = {12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="givenName"
                            label="First Name"
                            name="firstname"
                            autoComplete="email"
                            size = "medium"
                            autoFocus
                            onChange={e => setGivenName(e.target.value)}
                        />
                        </Col>

                        <Col span = {12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="familyName"
                            label="Last Name"
                            name="lastname"
                            size = "medium"
                            autoComplete="email"
                            onChange={e => setFamilyName(e.target.value)}
                        />
                        </Col>
                    </Row>
        
                    <Row>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            size = "medium"
                            autoComplete="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Row>
        
                    <Row>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            size = "medium"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Row>
        
                    <Row>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="comfirmed password"
                            label="Comfirmed Password"
                            type="password"
                            id="confirmPassword"
                            size = "medium"
                            autoComplete="current-password"
                            onChange={e => ConfirmedPassword(e.target.value)}
                        />
                    </Row>   
                    
                    <div className={classes.blocks}>
                        <Button variant="contained" className={classes.button} onClick={e => setStep(2)} style = {{alignItems: 'center'}}>
                            Next
                        </Button>
                    </div>
                </div>    
            );
        }
        else if (step === 2) {
            return  (
                <div>
                    <Row gutter = {30}>
                        <Col span = {5}>
                            <h2 style = {{textAlign: 'center'}}> Gender: </h2>
                        </Col>
                        <Col span = {19}>
                            <Space>
                                <Radio.Group onChange={e => setGender(e.target.value)} size = "large" style = {{verticalAlign: "middle"}}>
                                    <Radio.Button value="Male">Male</Radio.Button>
                                    <Radio.Button value="Female">Female</Radio.Button>
                                    <Radio.Button value="Prefer not to say"> Prefer not to say </Radio.Button>
                                </Radio.Group>
                            </Space>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Space>
                            <Col span = {5} >
                                <h2 style = {{verticalAlign: "middle"}}> Birthday: </h2>
                            </Col>
                            <Col span = {40}>
                                <DatePicker onChange = {e => setdob(new Date(e._d))} size = "large" style={{ width: '100%' }}/>
                            </Col>
                        </Space>
                    </Row>
                    <br />
                    <Row>
                        <Col span = {5}>
                            <h2 style = {{textAlign: 'center'}}> Region: </h2>
                        </Col>
                        <Col span = {19}>
                            <Cascader size = "large" options={options} onChange={e => setAddress(e)} placeholder="Please select" style={{ width: '100%' }}/>
                        </Col>
                    </Row>

                    <Row>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Mobile"
                            label="Phone Number"
                            name="Mobile"
                            autoComplete="Mobile Number"
                            size = "small"
                            onChange={e => setMobieNumber(e.target.value)}
                        />
                    </Row>
                    
                    <Row gutter = {10}>
                        <Col span = {12}>
                            <div className={classes.blocks}>
                                <Button variant="contained" className={classes.button} onClick={e => setStep(1)} style = {{alignItems: 'center'}}>
                                    &lt;Prev
                                </Button>
                            </div>
                        </Col>
                        <Col span = {12}>
                            <div className={classes.blocks}>
                                <Button variant="contained" className={classes.button} onClick={e => setStep(3)} style = {{alignItems: 'center'}}>
                                    Next &gt;
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>    
            );
        }
        else if (step === 3) {
            return (
                <div>
                    <Row>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Mobile"
                            label="Company: (Optional)"
                            name="Company"
                            autoComplete="Company"
                            size = "medium"
                            onChange={e => setCompany(e.target.value)}
                        />
                    </Row>
                    <Row>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Mobile"
                            label="Job: (Optional)"
                            name="Job"
                            autoComplete="Job"
                            size = "medium"
                            onChange={e => setJob(e.target.value)}
                        />
                    </Row>
                    <Row gutter = {10}>
                        <Col span = {12}>
                            <div className={classes.blocks}>
                                <Button variant="contained" className={classes.button} onClick={e => setStep(2)} style = {{alignItems: 'center'}}>
                                    &lt;Prev
                                </Button>
                            </div>
                        </Col>
                        <Col span = {12}>
                            <div className={classes.blocks}>
                                <Button variant="contained" className={classes.button} onClick={e => onSignUp()} style = {{alignItems: 'center'}}>
                                    Register
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            )

        }
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
                                {stepShow()}
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}


// function FirstStep() {
//     const  classes  = useStyles();
//     return (
//         <div> 
//             <Row gutter = {20}>
//                 <Col span={12}>
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="givenName"
//                         label="First Name"
//                         name="firstname"
//                         autoComplete="email"
//                         autoFocus
//                         onChange={e => this.setState({givenName: e.target.value})}
//                     />
//                 </Col>
//                 <Col span={12}>
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="familyName"
//                         label="Last Name"
//                         name="lastname"
//                         autoComplete="email"
//                         onChange={e => this.setState({familyName: e.target.value})}
//                     />
//                 </Col>
//             </Row>

//             <Row>
//                 <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     onChange={e => this.setState({email: e.target.value})}
//                 />
//             </Row>

//             <Row>
//                 <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                     onChange={e => this.setState({password: e.target.value})}
//                 />
//             </Row>

//             <Row>
//                 <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="comfirmed password"
//                     label="Comfirmed Password"
//                     type="password"
//                     id="confirmPassword"
//                     autoComplete="current-password"
//                     onChange={e => this.setState({confirmPassword: e.target.value})}
//                 />
//             </Row>   
//             <Row>
                
//                 <div className={classes.blocks}>
//                     <Button variant="contained" className={classes.button} onClick={this.setState({step: 2})}>
//                         Next
//                     </Button>
//                 </div>

//             </Row>
//         </div>);
// };

// function Around() {
//     const classes  = useStyles();
//     return (
//             <div style={{ width: '100vw', height: '100vw, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
//                 <div className={classes.middle}>
//                     <div className={classes.column} style={{ textAlign: 'center', minHeight: '82vh' }}>
//                         <span>
//                             <a href="/">
//                                 <img src='./pics/logo_full.png' title="go back to home page" alt="logo pic" style={{ width: '75%' }}></img>
//                             </a>
//                         </span>

//                     </div>
//                     <div className={classes.background}></div>
//                     <div className={classes.column} style={{ textAlign: 'center', paddingRight: '15vh', minHeight: '82vh' }}>
//                         <Container component="main" maxWidth="xs">
//                             <div>
//                                 <Typography component="h1" variant="h1" align="center">
//                                     Register
//                                 </Typography>
//                                 <br />
//                                 <Typography component="h1" variant="h5" align="center">
//                                     Welcome to be the new menber!
//                                 </Typography>
//                                 <br />
//                                     <FirstStep />
//                             </div>
//                         </Container>
//                     </div>
//                 </div>
//             </div>
//         );
// };
