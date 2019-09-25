# [Unshelled](https://unshelled.herokuapp.com/#/login)
Unshelled is a web application focuses on helping it's users find the best taco's in their area. Unshelled is inspired from the popular site [Untapped](https://untappd.com). User's are able to search for resturants in their area that serve tacos. User's are also able to review the tacos, leave reviews, and check-in to show others where they have been!
test

# Built With
- JavaScript
- React
- GraphQL
- Node.js
- Mongoose


# Unshelled Features

## User Authentication
User Authentication is secured by incorporating BCrypt, creating a password-digest to ensure no users actual password is stored in the database. Session tokens are created at login and destroyed at logout, to store a user's current session as a client-side cookie in the browser.
![Login Page](./client/public/login.png)

## Featured Restaurants
Unshelled features a directory of some of the best Taco restaurants across the country. Through the web application, users are able to search through various restaurants and see details such as the restaurants featured tacos, ratings by other Unshelled members, and more.
![Restaurant Index Page](./client/public/rest_index.png)

## Restaurant Show Pages
Each restaurant featured on Unshelled has it's own show page. At this page, users are able to add tacos to that restaurants current menu directory, rate the restaurant, and access external social media links. 
![Restaurant Page](./client/public/rest_show.png)

## MVP's
- Drinks CRUD
- Checkins / reviews
- Review feed
- Profile
- Bonus: Friendships
- Bonus: Search
- Bonus: Venues
- Bonus: Badges

## Technologies

- MongoDB
- React
- GraphQL
- AWS S3
- Docker
- Heroku Container Registry

## Backup Idea
- Eventbrite
- Wufoo
