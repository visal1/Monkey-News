import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pages: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pages: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `Monkey-News ${this.props.category}`;
  }

  componentDidMount = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  clickprevious = async () => {
    this.props.setProgress(10);
    //console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.props.setProgress(30);
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
    this.props.setProgress(100);
  };

  clicknext = async () => {
    this.props.setProgress(10);
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 10)) {
      //console.log("next runned");
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedata = await data.json();
      this.props.setProgress(30);
      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading: false,
      });
    }
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    //this.props.setProgress(10);
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    //this.props.setProgress(30);
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedata.articles),
    });
    //this.props.setProgress(100);
  };

  render() {
    return (
      <>
        <h2
          className="text-center"
          style={{ marginTop: "85px" }}
        >{`Monkey-News Top ${this.props.category} Headlines`}</h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((ele) => {
                return (
                  <div className="col-md-4">
                    <Newsitem
                      title={ele.title ? ele.title.slice(0, 45) : ""}
                      description={
                        ele.description ? ele.description.slice(0, 88) : ""
                      }
                      imageurl={
                        ele.urlToImage
                          ? ele.urlToImage
                          : "https://thepointsguy.global.ssl.fastly.net/us/originals/2024/06/Delta-One-Lounge-JFK-Zach-Griff-37.jpg"
                      }
                      newsurl={ele.url}
                      author={ele.author ? ele.author : "unknown"}
                      date={ele.publishedAt.slice(0, 10)}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
