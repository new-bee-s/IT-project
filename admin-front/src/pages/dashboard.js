import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown } from 'antd';
import { Avatar } from 'antd';
import axios from '../commons/axios.js';
import { Row, Col, Button, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { message, Divider, Typography, Table } from 'antd';
import Cookies from 'universal-cookie';
import { Components } from 'antd/lib/date-picker/generatePicker';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { profile: undefined, loading: true, data: undefined, banID: "", unbanID: "" };
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
    const test = () => {
      console.log("haha");
      console.log(banID);
    }

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
    const { profile, loading, data, banID, unbanID } = this.state;
    const home = '/dashboard';




    const columns = [
      {
        title: 'User ID',
        dataIndex: 'userID',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.userid - b.userid,
      },
      {
        title: 'First Name',
        dataIndex: 'givenName',
        sorter: (a, b) => a.firstname.length - b.firstname.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Last Name',
        dataIndex: 'familyName',
        sorter: (a, b) => a.lastname.length - b.lastname.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render(record) {
          const id = record._id;
          const flag = 0;
          console.log(id)

          const OnBan = () => {
            console.log(id)
            console.log("click ban");
            axios.post(home + '/banUser', { _id: id }).then(res => {
              if (res.data.success) {
                message.success("ban successfully")
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

          const OnUnban = () => {
            console.log(id)
            console.log("click unban");

            axios.post(home + '/unBanUser', { _id: id }).then(res => {
              if (res.data.success) {
                message.success("unban successfully")
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


          return (
            <div>
              <Button type="dashed" onClick={OnBan} size={20}>
                Ban
              </Button>

              <Button type="dashed" onClick={OnUnban} size={20}>
                Unban
              </Button>
            </div>

          )
        }

      }

      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <Space size="middle">
      //       <Button type="dashed" onClick = {OnBan} size={20} id>
      //           Ban {record.userID}
      //       </Button>
      //       {/* <Button type="dashed" onClick = {OnUnban}  size={20}>
      //           Unban
      //       </Button> */}
      //     </Space>
      //   ) 
      // },
    ];






    /*
    const data = [
      {
        key: '1',
        firstname: 'John',
        lastname: 'Brown',
        userid: 111,
        email: '111@a.com',
      },
      {
        key: '2',
        firstname: 'Jim',
        lastname: 'Green',
        userid: 222,
        email: '222@a.com',
      },
      {
        key: '3',
        firstname: 'Joe',
        lastname: 'Black',
        userid: 333,
        email: '333@a.com',
      },
    ];
    */


    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }






    return (
      <Layout>
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
                    <img src='../pics/manage.png' alt='manage_icon' style={{ height: '24px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Manage</span>
                  </a>
                </Menu.Item>

              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout style={{ padding: '2vh 2vh', paddingRight: '2vh', backgroundImage: 'url("/../pics/background2.jpg")' }}>



          <Content style={{ padding: '0 5vw' }}>
            <div style={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2vw', marginTop: '2vh' }}>
              <Typography component="h1" variant='h1' align='center'>Manage all the users</Typography>
              <Typography component="body1" variant='body1' align='right'>"Big Brother is watching you!"</Typography>
              <Divider />
              <Table columns={columns} dataSource={data} onChange={onChange} style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} />
              <Button type="dashed" onClick={test} size={20}>

                test
              </Button>


            </div>
          </Content>
        </Layout >
      </Layout >

    );
  }

};
