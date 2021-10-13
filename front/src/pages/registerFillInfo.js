// import libraries
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import { Layout, message } from 'antd';
import { Row, Col, Button, Radio, DatePicker, Space} from 'antd'; 
import Cookies from 'universal-cookie';
import FillDetaillAddress from '../components/fillDetailAddress.js'



// register page
export default class RegisterFillInfo extends React.Component{

    constructor(props) {
        super(props)
        this.state = { gender: undefined, mobieNumber: '', dob: undefined, address: [], company: undefined, job: undefined};
    }


    render() {
        const { Content } = Layout;
        
        const setAddress = (value) => {
            this.state.address = value;
        }

        //using on onchange
        const fillDetaill = () => {
            if (this.state.gender === undefined){
                message.error("Please Enter your Gender")
            }
            if (this.state.dob === undefined){
                message.error("Please Enter your Birthday")
            }
            if (this.state.address === undefined){
                message.error("Please Enter your Address")
            }
            if (this.state.mobieNumber === ''){
                message.error("Please Enter your mobie number")
            }
            // use axios connect back-end and push personal information to back-end
            const cookies = new Cookies()
            axios.post('/register/fillInfo', {
                headers: {
                    Authorization: `Bearer ${cookies.get('token')}`
                },
                gender: this.state.gender,
                mobile: this.state.mobieNumber,
                dob: this.state.dob,
                region: {city: this.state.address[2], state: this.state.address[1], country: this.state.address[0]},
                company: this.state.company,
                occupation: this.state.job
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

        const button= {
            width: "250px",
            height: "50px",
            background: '#429CEF',
            borderRadius: '100px',
            border: 0,
            color: '#FFFFFF',
            fontFamily: 'Ubuntu',
            fontSize: "18px",
            alignItems: 'center'
        };
        
        const blocks= {
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
        };

        return (
            <Layout style={{ backgroundImage: 'url("../pics/background9.jpg")', minHeight: '100vh'}}>
                <Row style = {{marginTop: "2%"}}> 
                    <Col offset = {9}>
                    </Col>
                    <Col span = {6}>
                        <img src='../pics/logo_full.png' title="go back to home page" alt="logo pic" style={{ width: '100%' }}></img>
                    </Col>
                    <Col offset = {9}>
                    </Col>
                </Row>
                <Content style={{ width: '40vw', marginTop: '3vh',  alignSelf: 'center'}}>
                    
                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2vw', marginTop: '2vh', minHeight: '60vh'}}>

                        <Typography component="h2" variant="h2" align="center">
                            Fill In Your Detaill
                        </Typography>
                        <br />
                        <Typography component="h1" variant="h5" align="center">
                            Welcome to be the new menber!
                        </Typography>
                        <br />
                        
                        <Row>
                            <Col span = {4} offset = {1} style = {{verticalAlign: "middle"}}>
                                <h2> Gender: </h2>
                            </Col>
                            <Col span = {19}>
                                <Space>
                                    <Radio.Group onChange={e => this.state.gender = e.target.value} size = "large" style = {{verticalAlign: "middle", width: '100%'}}>
                                        <Radio.Button value="Male">Male</Radio.Button>
                                        <Radio.Button value="Female">Female</Radio.Button>
                                        <Radio.Button value="Prefer not to say"> Prefer not to say </Radio.Button>
                                    </Radio.Group>
                                </Space>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span = {4} offset = {1} style = {{textAlign: "left"}}>
                                <h2 style = {{verticalAlign: "middle"}}> Birthday: </h2>
                            </Col>
                            <Col span = {19}>
                                <DatePicker onChange = {e => this.state.dob = new Date(e._d)} size = "large" style={{ width: '100%' }}/>
                            </Col>
                        </Row>
                        <br />
                    
                        <FillDetaillAddress sendData = {setAddress}></FillDetaillAddress>
                        

                        <Row>
                            <Col span = {23} offset  = {1}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Mobile"
                                    label="Phone Number"
                                    name="Mobile"
                                    autoComplete="Mobile Number"
                                    size = "medium"
                                    onChange = {e =>  this.state.mobieNumber = e.target.value}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span = {23} offset  = {1}>
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
                                    onChange={e => this.state.company = e.target.value}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span = {23} offset  = {1}>
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
                                    onChange={e => this.state.job = e.target.value}
                                />
                            </Col>
                        </Row>
                        
                        <div style = {blocks}>
                            <Button variant="contained" style = {button} onClick={e => fillDetaill()}>
                                Register
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}