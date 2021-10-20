import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown, Space, Spin } from 'antd';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Row, Col, Button} from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { message, Divider, Typography, Table } from 'antd';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';


export default class ChangeUserInfo extends React.Component {


  constructor(props) {
    super(props)
    this.state = { profile: undefined, loading: true, data: undefined};
  }

  componentDidMount() {
    const home = '/dashboard';
    const cookies = new Cookies()
    axios.get(home, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`
      }
    }).then(response => {
      if (response.data.success) {
        this.setState({ profile: response.data.users, loading: false });
      }
    }).catch(error => {
      console.log(error.response.data.error)
      message.error(error.response.data.error);
    })

    

    axios.get(home).then(response => {
      if (response.data.success) {
        console.log("users info");
        console.log(response.data.users);
        this.setState({ data: response.data.users })

      }
    }).catch(error => {
      console.log(error.response.data.error)
      message.error(error.response.data.error)
    })


  }




  render() {

    const OnLogOut = () => {
      const cookies = new Cookies();
      cookies.remove('token');
      this.props.history.push('/login', { replace: true });
    }
    const logout = (
      <Menu>
        <Menu.Item key='1' onClick={OnLogOut}>Log Out</Menu.Item>
      </Menu>
    );
    // Define the variable
    const { Header, Content } = Layout;
    // remember to add loading back!
    const { profile, loading, data } = this.state;
    const home = '/dashboard';

    if (loading) {
      return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
          <Spin size='large' />
          <h3>Loading</h3>
      </Space>;
    }


    return (
      <Layout >
        <Header style={{ padding: '0 10px' }}>
          <Row style={{ height: '64px' }}>
            <Col span={2} offset={1}>
              <a href={home}>
                <div>
                  <img src='/../pics/logo_bee.png' alt='logo_bee' style={{ height: '64px', padding: '6px' }} />
                </div>
              </a>
            </Col>
            <Col span={7} offset={2}>
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} style={{ height: '64px' }}>
                <Menu.Item key='1'>
                  <a href={home}>
                    <img src='/../pics/manager11.png' alt='manage_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Manage</span>
                  </a>
                </Menu.Item>

                <Menu.Item key='2'>
                  <a href={home+'/changeinfo'}>
                    <img src='/../pics/manage1.png' alt='changeinfo icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Profile</span>
                  </a>
                </Menu.Item>

              </Menu>
            </Col>
            <Col span={3} offset={9}>
              <Menu theme='dark' mode='horizontal'style={{ height: '64px' }}>
                <Menu.Item key='2' onClick={e => OnLogOut()}>
                  Log Out
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout style={{ padding: '2vh 2vh', paddingRight: '2vh', backgroundImage: 'url("/../pics/background2.jpg")' }}>



          <Content style={{ padding: '0 5vw', height:'100vh'}}>
              hahahahahahhaha
              hahahah
          </Content>
        </Layout >
      </Layout >

    );
  }

};
