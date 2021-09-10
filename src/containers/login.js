import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {
  const onFinish = (values) => {
    console.log('Success:', values);
    props.onAuth(values.username, values.password);
    props.history.push('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  let errorMessage = null;
  if (props.error) {
    errorMessage = (
        <p>{ props.error.message }</p>
    )
  }
  return (
  <div>
        { errorMessage }
        {
            props.loading ?

            <Spin indicator={antIcon} />

            :

            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">Submit
                </Button> or
                <NavLink to='/signup'> signup</NavLink>
              </Form.Item>
            </Form>
        }
  </div>
  );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
