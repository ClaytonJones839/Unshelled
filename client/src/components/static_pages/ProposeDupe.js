import React, { Component } from "react";

class ProposeDupe extends Component {

    state = { submit: false }

    handleSubmit = () => {
        this.setState({ submit: true })
    }

    submitForm() {
        return this.state.submit === false ? (
            <div>
                <div className="req-sub">
                    <div className="req-sub-text">
                        Is this taco a duplicate of another? Enter the URL of the duplicate taco below. We will review your proposal and make the necessary changes.
                    </div>
                </div>
                <div className="req-input-cont">
                    <textarea className="dupe-text"></textarea>
                </div>
                <div className="button-cont">
                    <button
                        onClick={this.handleSubmit}
                        className="submit-req">
                        Submit
                    </button>
                </div>
            </div>
        ) : (
                <div className="req-sub sent">
                    Thank you for your feedback! We are reviewing your proposal.
            </div>
            )
    }

    render() {
        return (
            <div className="request-feat">
                <div className="dupe-title">
                    Propose a Duplicate
                </div>

                {this.submitForm()}
            </div>
        )
    }


}

export default ProposeDupe;