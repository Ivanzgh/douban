import React from 'react'
import { Spin, Alert, Pagination } from 'antd';
import fetchJSONP from 'fetch-jsonp';
import MovieItem from './MovieItem.js'

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [], // 电影列表
            nowPage: parseInt(props.match.params.page) || 1, // 当前展示第几页的数据
            pageSize: 12, // 每页显示多少条数据
            total: 0, // 当前电影分类下，总共有多少条数据
            isloading: true, // 数据是否正在加载， 如果为 true，表示正在加载数据
            movieType: props.match.params.type // 保存一下 要获取的电影的类型
        }
    }
    componentWillMount() {
        this.loadMovieListByTypeAndPage()
    }

    // 组件将要接收新属性
    componentWillReceiveProps(nextProps) {
        this.setState ({
            isloading: true, // 又要重新加载电影数据了
            nowPage: parseInt(nextProps.match.params.page) || 1, // 要获取第几页的数据
            movieType: nextProps.match.params.type // 电影类型
        }, function () {
            this.loadMovieListByTypeAndPage()
        })
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }

    // 根据电影类型和页码，获取电影数据
    loadMovieListByTypeAndPage = () => {
        // 注意：默认的 window.fetch 受到跨域限制导致无法直接使用，可以使用第三方包 fetch-jsonp 来发送 JSONP 请求，它的用法和浏览器内置的 fetch 完全兼容
        // fetch('https://api.douban.com/v2/movie/in_theaters')
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //   });
        // // 开始获取数据的索引
        //  const start = this.state.pageSize * (this.state.nowPage - 1);
        //
        // const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`;
        //
        // fetchJSONP(url)
        //   .then(response => response.json())
        //   .then(data => {
        //     // console.log(data);
        //     this.setState({
        //       isloading: false, // 将 loading 效果隐藏
        //       movies: data.subjects, // 为电影列表重新赋值
        //       total: data.total // 把总条数，保存到 state 上
        //     })
        //   });

        const data = require('../test_data/' + this.state.movieType + '.json');
        setTimeout(() => {
            this.setState({
                isloading: false, // 将 loading 效果隐藏
                movies: data.subjects, // 为电影列表重新赋值
                total: data.total // 把总条数，保存到 state 上
            })
        }, 1000)
    };

    // 渲染电影列表的方法
    renderList = () => {
        if (this.state.isloading) { // 正在加载中
            return (
                <Spin tip="Loading...">
                    <Alert
                        message="正在请求电影列表"
                        description="精彩内容，马上呈现....."
                        type="info"
                    />
                </Spin>
            );
        } else { // 加载完成
            return (
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.state.movies.map(item => {
                            return <MovieItem {...item} key={item.id} history={this.props.history} />
                        })}
                    </div>
                {/* 分页 */}
                <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChanged} />
                </div>
            );
        }
    };

    // 当页码改变的时候，加载新一页的数据
    pageChanged = (page) => {
        // 使用 react-router-dom 实现编程式导航
        this.props.history.push('/movie/' + this.state.movieType + '/' + page)
    }
}


// 在 React 中，我们可以使用 fetch API 来获取数据，fetch API 是基于 Promise 封装的