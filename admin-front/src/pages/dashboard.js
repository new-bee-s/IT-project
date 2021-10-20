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


export default class Dashboard extends React.Component {


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




    const columns = [
      {
        title: 'Status',
        key: 'ban',
        render (record) {
          if (record.ban === true) {
            return (
              <div align = 'center'>
                  <Avatar size={30} icon={<CloseCircleFilled />} style={{ color: 'red', background: 'rgba(255, 255, 255, 0)' }} />
              </div>
            )
          }
          else {
            return (
              <div align = 'center'>
                  <Avatar size={30} icon={<CheckCircleFilled />} style={{ color: 'green', background: 'rgba(255, 255, 255, 0)' }} />
              </div>
            )
          }
        }
      },
      {
        title: 'User ID',
        dataIndex: 'userID',
      },
      {
        title: 'First Name',
        dataIndex: 'givenName',
      },
      {
        title: 'Last Name',
        dataIndex: 'familyName',

      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render(record) {
          console.log(record._id)

          const OnBan = () => {
            console.log(profile.email);
            console.log("click ban");
            axios.post(home + '/banUser', { _id: record._id }).then(res => {
              if (res.data.success) {
                message.success("ban successfully")
                record.ban = true;
              }
              else {
                message.error(res.data.error)
              }
            }).catch(error => {
              console.log(error.response.data.error)
              message.error(error.response.data.error)
              // or throw(error.respond)
            })
            //this.setState({banID: id})
          }

          const OnUnban = () => {
            console.log(record._id)
            console.log("click unban");

            axios.post(home + '/unBanUser', { _id: record._id }).then(res => {
              if (res.data.success) {
                message.success("unban successfully")
                record.ban = false;
              }
              else {
                message.error(res.data.error)
              }
            }).catch(error => {
              console.log(error.response.data.error)
              message.error(error.response.data.error)
              // or throw(error.respond)
            })
          }

          if (record.ban === true) {
            return (
              <div>
                <a href={home+'/changeuserinfo/'+record._id}>
                  <Button type="dashed" size={20}>
                    Edit
                  </Button>
                </a>

                <span style={{paddingRight:'2vw'}}></span>

                <Button type="dashed" onClick={OnUnban} size={20}>
                  Unban
                </Button>
              </div>
            )
          }
          else {
            return (
              <div>
                <a href={home+'/changeuserinfo/'+record._id}>
                  <Button type="dashed" size={20}>
                    Edit
                  </Button>
                </a>

                <span style={{paddingRight:'2vw'}}></span>

                <Button type="dashed" onClick={OnBan} size={20}>
                  Ban
                </Button>
              </div>
            )
          }
          
        }

      }

    ];






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
                    <img src='../pics/manager11.png' alt='manage_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Manage</span>
                  </a>
                </Menu.Item>

                <Menu.Item key='2'>
                  <a href={home+'/changeinfo'}>
                    <img src='../pics/manage1.png' alt='changeinfo icon' style={{ height: '24px', verticalAlign: 'middle' }} />
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



          <Content style={{ padding: '0 5vw' }}>
            <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>
              <Typography component="h1" variant='h1' align='center'>Manage all the users</Typography>
              <p align='left'>"Big Brother is watching you!"</p>
              <Divider />
              <Table columns={columns} rowKey='_id' dataSource={data} style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} />
            </div>
          </Content>
        </Layout >
      </Layout >

    );
  }

};
