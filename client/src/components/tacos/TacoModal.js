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
        <div className="header1">
          <div className="text">Check-In</div>
          {/* <div className="exit">X</div> */}
        </div>

        <Mutation
          mutation={Mutations.NEW_TACO_CHECKIN}
          update={(cache, data) => {
            let taco;
            let user;
            // let tacooos;
            // debugger;
            // tacooos = cache.readQuery({ query: Mutations.FETCH_TACOS });
            // console.log(tacooos);
            // debugger;
            try {
              taco = cache.readQuery({ query: Queries.FETCH_TACO, variables: { id: tacoId } });
              user = cache.readQuery({ query: Queries.FETCH_USER, variables: { id: userId } });
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
            
            if (user) {
              user.user.tacoCheckin.push(newTacoCheckinToCache);

              cache.writeQuery({
                query: Queries.FETCH_USER,
                variables: { id: userId },
                data: { user: user.user }
              });
            }
            

          }}
          variables={{}}
          onCompleted={data => {
            // debugger;
            // console.log(data);
            // console.log(handleClose);
            setDescription("");
            setRating("");
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
                <textarea
                  className="description-input"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="How's the taco?"
                  rows="4"
                  cols="53"
                />

              {/* <button className="checkin-form-button" type="submit">
                Check In
              </button> */}

                <div className="rate-the-taco">Rate the taco!</div>

                {/* <input
                  className="rating-input"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  placeholder="rate it 1 to 5"
                /> */}

                              <fieldset className="rating-stars">
                <input
                  onChange={setRating(5)}  
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
                  onChange={setRating(4)}
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
                  onChange={setRating(3)}
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
                  onChange={setRating(2)}
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
                  onChange={setRating(1)}
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
              </div>
              <button className="checkin-form-button" type="submit">
                Check In
              </button>
              <button className="close-button" onClick={handleClose}>close</button>
            </form>
          )}
        </Mutation>
        {children}
        {/* <button onClick={handleClose}>close</button> */}
      </section>
    </div>
  );
};

export default Modal;