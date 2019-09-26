import React, { Component } from "react";

class ProposeEdit extends Component {

    state = { submit: false}

    handleSubmit = () => {
        this.setState({ submit: true })
    }

    submitForm() {
        return this.state.submit === false ? (
            <div>
                <div className="req-sub">
                    <div className="req-sub-text">
                        Did you notice something incorrect with the details of this taco? Help us out by proposing an edit. Once submitted, our team will review and make the change if necessary.
                    </div>
                </div>
                <div className="req-input-cont">
                    <textarea className="req-text"></textarea>
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
                    Thank you for your feedback! Your suggestion has been sent.
            </div>
            )
    }

    render() {
        return (
            <div className="request-feat">
                <div className="req-title">
                    Something look off? Lets Tac-o bout it!
                </div>

                {this.submitForm()}
            </div>
        )
    }


}

export default ProposeEdit;