// 这是项目的根组件
import React from 'react'

// 导入模块化的样式
import './css/app.css';

// 导入 路由相关的组件页面
import HomeContainer from './components/home/HomeContainer.js'
import MovieContainer from './components/movie/MovieContainer.js'
import AboutContainer from './components/about/AboutContainer.js'

// 导入路由组件
import { HashRouter, Route, Link } from 'react-router-dom'

// 导入需要的 Ant Design 组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    render() {
        return (
            <HashRouter>
                <Layout className="layout" style={{ height: '100%' }}>
                    {/* Header 头部区域 */}
                    <Header>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="home">
                                <Link to="/home">首页</Link>
                            </Menu.Item>
                            <Menu.Item key="movie">
                                <Link to="/movie/in_theaters/1">电影</Link>
                            </Menu.Item>
                            <Menu.Item key="about">
                                <Link to="/about">关于</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>

                    {/* 中间的 内容区域 */}
                    <Content style={{ backgroundColor: '#fff', flex: 1 }}>
                        <Route path="/home" component={HomeContainer} />
                        <Route path="/movie" component={MovieContainer} />
                        <Route path="/about" component={AboutContainer} />
                    </Content>

                    {/* Footer 底部区域 */}
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright ©2018 DOUBAN
                    </Footer>

                </Layout>
            </HashRouter>
        );
    }
}