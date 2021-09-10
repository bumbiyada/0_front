import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import { Form, Select, Switch, Checkbox, Row, Col } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const { Panel } = Collapse;

const CustomForm = (props) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    }
    const users = props.users.map( data =>  <Option value={data} key={data}>{data}</Option>);
    const foiv = props.foiv.map( data =>  <Option value={data} key={data}>{data}</Option>);
    const docType = props.docType.map( data =>  <Option value={data} key={data}>{data}</Option>);
    return (
         <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
              initialValues={{
                'input-number': 3,
                'departments': ['3', '4', '5', '6', '9', '10', '13'],
                rate: 3.5,
              }}
            >
              <Form.Item
                name="select_users"
                label="Исполнители"
                rules={[{ required: false, message: 'Выберите исполнителей', type: 'array' }]}
              >
                <Select mode="multiple" placeholder="Выберите интересующих исполнителей">
                  {users}
                </Select>
              </Form.Item>

              <Form.Item
                name="select_foiv"
                label="Фоив"
                rules={[{ required: false, message: 'Выберите Фоив', type: 'array' }]}
              >
                <Select mode="multiple" placeholder="Выберите интересующий фоив">
                  {foiv}
                </Select>
              </Form.Item>
              <Form.Item
                name="select_doc_type"
                label="Тип документа"
                rules={[{ required: false, message: 'Выберите Тип документа', type: 'array' }]}
              >
                <Select mode="multiple" placeholder="Выберите тип документа">
                  {docType}
                </Select>
              </Form.Item>
              <Form.Item name="switch_one" label="Выбор" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item name="departments" label="Отделы">
                <Checkbox.Group>
                  <Row>
                    <Col span={4}>
                      <Checkbox value="3" style={{ lineHeight: '32px' }}>
                        Отдел 3
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="4" style={{ lineHeight: '32px' }}>
                        Отдел 4
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="5" style={{ lineHeight: '32px' }}>
                        Отдел 5
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="6" style={{ lineHeight: '32px' }}>
                        Отдел 6
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="9" style={{ lineHeight: '32px' }}>
                        Отдел 9
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="10" style={{ lineHeight: '32px' }}>
                        Отдел 10
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="13" style={{ lineHeight: '32px' }}>
                        Отдел 13
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
         )
}




class CustomDash extends React.Component {
//onClick={this.props.history.push('/dash')}

    state = {
        users: [],
        foiv: [],
        doc_type: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/custom-users').then( res => {
            let users1 = res.data.map( x => x.Stage_user);
            this.setState({
                users: users1
            });
        });

        axios.get('http://127.0.0.1:8000/api/custom-foiv').then( res => {
            let foiv1 = res.data.map( x => x.Foiv);
            this.setState({
                foiv: foiv1
            });
        });
        axios.get('http://127.0.0.1:8000/api/custom-doc-type').then( res => {
            let docType = res.data.map( x => x.Document_type);
            this.setState({
                doc_type: docType
            });
        });
    };

    handleClick = () => {
        return(
            this.props.history.push('/dash')
        )
    };

    render() {
        return (
            <div>
                <h2>Кастомка</h2>
                <Button type="primary" onClick={this.handleClick} icon={<LeftCircleOutlined />}>
                  Назад
                </Button>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Фильтр" key="1">
                       <CustomForm users={this.state.users} foiv={this.state.foiv} docType={this.state.doc_type}/>
                    </Panel>
                </Collapse>
            </div>
            )
        }
    }


export default CustomDash