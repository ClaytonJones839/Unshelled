import React, { Component } from "react";
import { Mutation } from "react-apollo";
// import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { FETCH_REVIEWS } = Queries;
const { NEW_REVIEW } = Mutations;

class ReviewNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      rating: 3,
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

  handleSubmit(e, newReview) {
    e.preventDefault();
    let body = this.state.body;

    newReview({
      variables: {
        body: body,
        rating: this.state.rating,
        restaurantId: this.state.restaurantId
      }
    }).then(data => {
      this.setState({
        message: `New review created successfully`,
        body: "",
        rating: 3,
      });
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
        {(newReview, { data }) => (
          <div className="new-review-form">
            <div className="review-form-text">New Review</div>
            <form
              onSubmit={e => this.handleSubmit(e, newReview)}
              className="inner-review-form"
            >
              <input
                className="review-form-input"
                type="number"
                onChange={this.update("rating")}
                value={this.state.rating}
                placeholder="Rating goes here (1-5)"
              />
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
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ReviewNew;
