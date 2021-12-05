import React, { useState } from 'react';
import { DatePicker, message, Form, Input, Button, Checkbox, Table, Tag, Space } from 'antd';
import UserState from './hooks/UserState'
import './App.css';

function App() {
  
  const form=UserState()
  

  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    if (values) {
      setdisplayResult(true);
      return;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onCancel=()=>{
    setdisplayResult(false)
  }
  return (
    <>
    {form?.userEntryMode==="View"?(
      <Table columns={columns} dataSource={form?.userlist} />
    )
    :null}
    <div style={{ width: 400, margin: '100px auto',display: displayResult?'block':'none' }}>
      
      <Button type="primary" onClick={onCancel}>
          Cancel
      </Button>
    </div>
    </>
  );
}

export default App;
