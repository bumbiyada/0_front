import { NavLink } from 'react-router-dom';
import React from 'react';
import { Form, Input, Button } from 'antd';

import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    props.onAuth(values.username, values.email, values.password, values.confirm);
    props.history.push('/registered');

  };

  return (
  <div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: false,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>



          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button> or
            <NavLink to='/login'> signup</NavLink>
          </Form.Item>
        </Form>
        <p> Пароль должен быть не менее 8 символов, красивый, аккуратный и четкий</p>
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);