import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span
                class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                style={{ left: "80%", zIndex: "1" }}
              >
                {source}
                <span class="visually-hidden">unread messages</span>
              </span>
            </h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author} on {date}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-primary btn-dark d-flex justify-content-between"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  }
}
