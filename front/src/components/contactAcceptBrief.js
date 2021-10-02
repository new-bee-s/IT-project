import React from 'react'
import axios from '../commons/axios.js'
import { Divider, Col, Row,message,Button,Typography,Tag, Input, Tooltip } from 'antd';
import {DeleteOutlined,CheckOutlined,PlusOutlined} from '@ant-design/icons';
import { Layout } from 'antd';




export default class ContactBrief extends React.Component {
  constructor(props){
      super(props);
      console.log(props.contact)
      console.log(this.props.contact)
  }

  state={
    changeRemark: this.props.contact.remark,
    tags:this.props.contact.tag,
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',

  }
  // set edit remark 
  editRemarkF = e => {
    this.setState({ changeRemark: e });
  };

  // Some tag function code using from Antd Design: https://ant.design/components/tag
 
  //click delete tag 
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
    message.success('Delete successfull!')
  };

  // show user input --tag
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  // change input infon --tag
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // input comfirm --tag
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  // edit change input --tag
  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  // edir input confirm --tag
  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  // save input --tag
  saveInputRef = input => {
    this.input = input;
  };

  // save edit input --tag
  saveEditInputRef = input => {
    this.editInput = input;
  };
  

  // connect back-end for edit friend remark
  editRemark=()=>{
    const userId = this.props.contact.user
    axios.post('/dashboard/' + userId+'/changeRemark',{
      remark: this.state.changeRemark,
      contactid: this.props.contact._id
    }).then(response=>{
      if(response.status===200){
        message.success('Edit successful')
              
      }
      else{
        message.error(response.data.error)
      }
    }).catch(error => {

    })
    
  }

  // connect back-end for edit tags(delete and add)
  editTags=()=>{
    const userId = this.props.contact.user
    axios.post('/dashboard/' + userId+ '/editTag',{
      tag: this.state.tags,
      contactid: this.props.contact._id
    }).then(response=>{
      if(response.status===200){
        message.success('Edit successful')
              
      }
      else{
        message.error(response.data.error)
      }
    }).catch(error => {

    })
    
  }

  // connect back-end for reject friend
  rejectFriend = ()=>{
    const userId = this.props.contact.user
    axios.post('/dashboard/' + userId + '/deleteFriend', {
        contactid: this.props.contact._id
    }).then(response => { 
        if(response.status===200){
            message.success('Reject successful')
            
        }
        else{
            message.error(response.data.error)
        }
    }).catch(error => {
        
        })

}

  render(){
    const { Text } = Typography;
    const { Content } = Layout;
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;

    // Description item components
    const DescriptionItem = ({ title, content }) => (
      <div className="site-description-item-profile-wrapper">
        <Text strong className="site-description-item-profile-p-label">{title}: </Text>
        {content}
      </div>
    );

  return(
    // render accept 
    <Content style={{minHeight: 280, background: '#fff', padding: '3vh 3vh' ,margin:'10px 10px'}}>
        <h1 style={{ margin: '20px 330px' }}>
          User Profile
        </h1>
        <h2>Personal</h2>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Gven Name" content={ this.props.contact.friend.givenName} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Family Name" content={ this.props.contact.friend.familyName} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="User id" content={ this.props.contact.friend.userID} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Birthday" content={this.props.contact.friend.birthday} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="County" content={this.props.contact.friend.country} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="City" content={this.props.contact.friend.city} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <DescriptionItem title="Address" content={this.props.contact.friend.address} />
          </Col>
        </Row>
        <Divider/>
        <Row style={{ marginTop: 24 }}>
          <Col span={2}>
            <DescriptionItem title="Remark"  />
          </Col>
          <Col span={10}>
              <Text 
                style={{margin:"0px 0px 0px 0px"}}
                editable={{
                tooltip: 'click to edit text',
                onChange:this.editRemarkF
                }} 
              >
                {this.state.changeRemark}
              </Text>
          </Col>
          <Col span={12}>
            <Button 
              style={{margin:"-10px 0px 0px 0px"}}
              shape="circle"
              type= "primary"
              icon={<CheckOutlined />}
              onClick={this.editRemark}
            />  
          
          </Col>
        </Row>

        
      
      <Divider />
        <h2>Tag</h2>
        
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={this.saveEditInputRef}
                  key={tag}
                  size="small"
                  className="tag-input"
                  value={editInputValue}
                  onChange={this.handleEditInputChange}
                  onBlur={this.handleEditInputConfirm}
                  onPressEnter={this.handleEditInputConfirm}
                />
              );
            }

            const isLongTag = tag.length > 20;

            const tagElem = (
             
                <Tag
                  color="#2db7f5"
                  className="edit-tag"
                  key={tag}
                  closable
                  onClose={() => this.handleClose(tag)}
                >
                  <span
                    onDoubleClick={e => {
                      if (index ) {
                        this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                          this.editInput.focus();
                        });
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
             
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && (
            <Input
              color="blue"
              ref={this.saveInputRef}
              type="text"
              size="small"
              className="tag-input"
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag className="site-tag-plus" onClick={this.showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
       
        
          <Button 
                style={{margin:"-10px 0px 0px 0px"}}
                shape="circle"
                type= "primary"
                icon={<CheckOutlined />}
                onClick={this.editTags}
              />
        
     

      <Divider />
      <h2>Contacts</h2>
        <Row style={{ marginTop: 24 }}>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content={this.props.contact.friend.phoneNumber} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={this.props.contact.friend.email} />
          </Col>
        </Row>
        <Row>
        </Row>
        <Button
          style={{margin:'50px 300px'}}
          type="primary"
          shape="round" 
          icon={<DeleteOutlined/>} 
          size='large'
          danger
          onClick={()=>this.rejectFriend()}
        >
          Delete Friend
        </Button>

    </Content>

  )
 }
}
