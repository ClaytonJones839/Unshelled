import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
// import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { FETCH_REVIEWS, IS_LOGGED_IN } = Queries;
const { NEW_REVIEW } = Mutations;

class ReviewNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      rating: 0,
      restaurantId: this.props.restaurantId,
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e, newReview, userId) {
    e.preventDefault();
    let body = this.state.body;
    newReview({
      variables: {
        body: body,
        rating: parseInt(this.state.rating),
        restaurantId: this.state.restaurantId,
        userId: userId
      }
    }).then(data => {
      this.setState({
        message: `New review created successfully`,
        body: "",
      });
      setTimeout(() => document.location.reload(true), 1200);
    });
  }

  updateCache(
    cache,
    {
      data: { newReview }
    }
  ) {
    let reviews;
    try {
      reviews = cache.readQuery({ query: FETCH_REVIEWS });
    } catch (err) {
      return;
    }

    if (reviews) {
      let reviewArray = reviews.reviews;
      cache.writeQuery({
        query: FETCH_REVIEWS,
        data: { reviews: reviewArray.concat(newReview) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_REVIEW}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newReview, { data }) => {
          return (
            <Query query={IS_LOGGED_IN}>
                    {({ loading: loadingTwo, error, data: rdata }) => {
                  if (loadingTwo) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;
                return (
          <div className="new-review-form">
            <div className="review-form-text">Restaurant Review</div>
            <form
              onSubmit={e => this.handleSubmit(e, newReview, rdata._id)}
              className="inner-review-form"
            >
              <fieldset className="rating-stars">
                <input
                  onChange={this.update("rating")}
                  type="radio"
                  id="star1"
                  name="rating"
                  hidden={true}
                  value="5"
                />
                <label htmlFor="star1">
                  <i className="fas fa-star rad-1"></i>
                </label>
                <input
                  onChange={this.update("rating")}
                  type="radio"
                  id="star2"
                  name="rating"
                  hidden={true}
                  value="4"
                />
                <label htmlFor="star2">
                  <i className="fas fa-star rad-2"></i>
                </label>
                <input
                  onChange={this.update("rating")}
                  type="radio"
                  id="star3"
                  name="rating"
                  hidden={true}
                  value="3"
                />
                <label htmlFor="star3">
                  <i className="fas fa-star rad-3"></i>
                </label>
                <input
                  onChange={this.update("rating")}
                  type="radio"
                  id="star4"
                  name="rating"
                  hidden={true}
                  value="2"
                />
                <label htmlFor="star4">
                  <i className="fas fa-star rad-4"></i>
                </label>
                <input
                  onChange={this.update("rating")}
                  type="radio"
                  id="star5"
                  name="rating"
                  hidden={true}
                  value="1"
                />
                <label htmlFor="star5">
                  <i className="fas fa-star rad-5"></i>
                </label>
              </fieldset>
              <textarea
                className="review-form-textarea"
                value={this.state.description}
                onChange={this.update("body")}
                placeholder="Review goes here (Optional)"
              />
              <button className="create-review-btn" type="submit">
                Create Review
              </button>
            </form>
            <div className="review-confirm">{this.state.message}</div>
          </div>
        )}}
        </Query>
        )}
        }
      </Mutation>
    );
  }
}

export default ReviewNew;
