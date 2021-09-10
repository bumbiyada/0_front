import React from 'react';
import axios from 'axios';
import Pie from '../components/pie';
import { Menu } from 'antd';
import { Row, Col } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

class DashboardContent extends React.Component {

    state = {
        users: [],
        foiv: [],
        doc_type: [],
        is_done: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/dep-3').then( res => {
            let users1 = res.data.map( x => x.Stage_user);
            let foiv1 = res.data.map( x => x.Foiv);
            let docType = res.data.map( x => x.Document_type);
            let isDone = res.data.map( x => x.Is_done);
            this.setState({
                users: users1,
                foiv: foiv1,
                doc_type: docType,
                is_done: isDone
            });
        })
    }

    handleClick = e => {
        console.log(e.key);

        if (e.key === String(0)){
            return (this.props.history.push('/customDash'))

        } else {
            let department = 'http://127.0.0.1:8000/api/dep-' + e.key
            axios.get(department).then( res => {
                this.setState({
                    data: res.data
                });
            })
        };
    };
    render() {
        {console.log(this.state.data)}
        return (
        <div>
            <Row>
                <Col span={8}>
                <Pie x_axle={this.state.users} y_axle={this.state.is_done} title='задачи о юзерам'/>
                </Col>
                <Col span={3} offset={12}>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['3']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                  >
                    <Menu.Item key="0">Кастомка</Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Отделы">
                      <Menu.Item key="3">Третий отдел</Menu.Item>
                      <Menu.Item key="4">Четрвертый отдел</Menu.Item>
                      <Menu.Item key="5">Пятый отдел</Menu.Item>
                      <Menu.Item key="6">Шестой отдел</Menu.Item>
                      <Menu.Item key="9">Девятый отдел</Menu.Item>
                      <Menu.Item key="10">Десятый отдел</Menu.Item>
                      <Menu.Item key="13">Тринадцатый отдел</Menu.Item>
                    </SubMenu>
                </Menu>
                </Col>
            </Row>
        </div>
            )
        }
    }

export default DashboardContent
