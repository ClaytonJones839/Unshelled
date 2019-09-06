import React, { Component, useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";

const Modal = ({ handleClose, show, children, userId, tacoId }) => {
    let showHideClassName;
    showHideClassName = show ? "display-block" : "display-none";

  const [description, setDescription] =
    useState("");
  
  const [rating, setRating] =
    useState("");
  
  // updateCache(cache, data) {
  //   let taco;
  //   try {
  //     taco = cache.readQuery({ query: Mutations.FETCH_TACO, variables: {tacoId}})
  //   } catch (err) {
  //     return;
  //   }
  //   const newTacoCheckinToCache = data.data.taco.newTacoCheckin;

  //   if (taco) {
  //     const tacoCheckinArray = taco.taco.tacoCheckin;
  //     cache.writeQuery({
  //       query: FETCH_TACO,
  //       variables: { tacoId },
  //       data: { taco: tacoCheckinArray.concat(newTacoCheckinToCache) }
  //     });
  //   }
  // }
  
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
          update={(cache, data) => {
            let taco;
            // let tacooos;
            // debugger;
            // tacooos = cache.readQuery({ query: Mutations.FETCH_TACOS });
            // console.log(tacooos);
            // debugger;
            try {
              taco = cache.readQuery({ query: Queries.FETCH_TACO, variables: { id: tacoId } });
              // debugger;
            } catch (err) {
              return;
            }
            const newTacoCheckinToCache = data.data.newTacoCheckin;

            if (taco) {
              // debugger;
              // let tacoCheckinArray;
              // tacoCheckinArray = taco.taco.tacoCheckin;
              taco.taco.tacoCheckin.push(newTacoCheckinToCache);

              cache.writeQuery({
                query: Queries.FETCH_TACO,
                variables: { id: tacoId },
                data: { taco: taco.taco }
              });
            }
          }}
          variables={{}}
          onCompleted={data => {
            // debugger;
            // console.log(data);
            // console.log(handleClose);
            return handleClose();
          }}

          // onCompleted={handleClose}
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