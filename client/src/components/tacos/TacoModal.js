import React, { Component, useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";

const Modal = ({ handleClose, show, children, userId, tacoId }) => {
    let showHideClassName;
    showHideClassName = show ? "display-block" : "display-none";

  const [description, setDescription] =
    useState("");
  
  const [rating, setRating] =
    useState("");
  // debugger;
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="header">
          <div className="text">Check-In</div>
          <div className="exit">X</div>
        </div>

        <Mutation
          mutation={Mutations.NEW_TACO_CHECKIN}
          variables={{}}
          onCompleted={data => {
            debugger;
            // const { token } = data.login;
            // console.log("wof", data);
            // localStorage.setItem("auth-token", token);
            // // console.log(localStorage);
            // this.props.history.push("/");
          }}
          // update={(client, data) => this.updateCache(client, data)}
        >
          {newTacoCheckin => (
            <form
              className="new-checkin-form"
              onSubmit={e => {
                e.preventDefault();
                newTacoCheckin({
                  variables: {
                    description,
                    rating: parseInt(rating),
                    tacoId,
                    userId
                    // userId
                  }
                });
              }}
            >
              <div className="checkin-inputs">
                <input
                  className="description-input"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="How's the taco?"
                />

                <input
                  className="rating-input"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  placeholder="rate it 1 to 5"
                />
              </div>
              <button className="checkin-form-button" type="submit">
                Check In
              </button>
            </form>
          )}
        </Mutation>
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Modal;