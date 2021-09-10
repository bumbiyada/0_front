import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { Layout, Menu} from 'antd';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const { Header, Content, Footer } = Layout;

const func2 = (props) => {
        console.log('2');
        console.log(props.logout);
        return(props.logout())
    }

const CustomHeaderLoggedIn = (props) => {
    let history = useHistory();
    let func1 = () => {history.push('/'); console.log('1')}

    return (
        <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Главная</Link></ Menu.Item>
                <Menu.Item key="2"onClick={() => {func1(); func2({...props})}}>
                     logout
                </Menu.Item>
                <Menu.Item key="3"><Link to='/dash'>Дашборд</Link></Menu.Item>

              </Menu>
        </Header>
    )
}

const CustomHeaderLoggedOut = () => {
    return (
        <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Главная</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/login'>Login</Link></Menu.Item>
              </Menu>
            </Header>
    )
}

const CustomHeader = (props) =>{

    if (props.isAuthenticated === true)
        return (<CustomHeaderLoggedIn {...props}/>);
    else return (<CustomHeaderLoggedOut />);

}

const CustomFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>MBU DESIGN ©2021 Created by NSI_BOYS</Footer>
    )
}

class CustomLayout extends React.Component {
    render() {
        return (
          <Layout
          style={{minHeight: '100%'}}
          >
            <CustomHeader {...this.props}/>
            <Content style={{ padding: '0 50px', height: '100%' }}>
              <Layout className="site-layout-background" style={{ padding: '24px 0', minHeight: 'calc(100vh - 64px - 69px)' }}>
                <Content style={{ padding: '0 24px', minHeight: '100%' }}>
                    {this.props.children}
                </Content>
              </Layout>
            </Content>
            <CustomFooter />
          </Layout>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
