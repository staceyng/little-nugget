# Project2 - Baby Tracking App

## Motivation & Objectives

Little Nugget is a baby app for parents to keep track of their baby's feed, diaper changing and sleep throughout the day. They will also be able to check what their baby's next milestones are according to the baby's age (up to 1 YO).

### Libraries used in this project

- express
- ejs
- method-override
- jssha
- cookie-parser
- axios
- luxon (for dates)
- uuid

## How to setup and run

### Setup

1. Create a DB in psql with database name `baby_app`
2. Run npm script to create tables and seed data - `npm run db:create` followed by `npm run db:seed`

### Run and Test

3. Launch app locally by running `nodemon app.js`
4. Go to url login - `localhost:3004/login`
5. Login with seeded user data login, email: `papabear@email.com`, password: `papabear`
6. Test and navigate app

## Project Planning

### Phase 1 and 2

- [x] Idea Generation
- [x] User flow diagrams
- [x] UI Mockups
- [x] Database ERD

### Phase 3

#### DB Setup

- [x] DB init schema
- [x] DB drop table schema
- [x] DB seed table schema
- [x] DB purge table data

#### User Profile and Login Routes

- [x] GET /login
- [x] POST /login
- [x] GET /accounts/sign-up
- [x] POST /accounts/sign-up
- [x] GET /accounts/:id/profile/set-up
- [x] POST /accounts/:id/profile/set-up
- [x] User Profile and Login Views
- [x] Add additional profile page in setup

#### Session Hash

- [x] Implement Session Hash
- [x] Implement logout button
- [x] DELETE /logout

#### Home page

- [x] GET /account/:id/profile/:id
- [x] Home Page View
- [x] Bottom nav bar - switch profiles easily
- [x] Baby profile page

#### Feeding

- [x] GET /account/:id/profile/:id/feeds
- [x] POST /account/:id/profile/:id/feeds
- [x] PUT /account/:id/profile/:id/feeds/:id
- [x] DELETE /account/:id/profile/:id/feeds/:id
- [x] Feed view page

#### Diaper Changing

- [x] GET /account/:id/profile/:id/diaper-changes
- [x] POST /account/:id/profile/:id/diaper-changes
- [x] PUT /account/:id/profile/:id/diaper-changes/:id
- [x] DELETE /account/:id/profile/:id/diaper-changes/:id
- [x] Diaper change view page

#### Sleeping

- [x] GET /account/:id/profile/:id/sleep
- [x] POST /account/:id/profile/:id/sleep
- [x] PUT /account/:id/profile/:id/sleep/:id
- [x] DELETE /account/:id/profile/:id/sleep/:id
- [x] Sleep view page

### Phase 4

- [x] Milestone Routes (Read + update completion status)
- [] Styling and beautifying

## Future improvements

### Features

- [] Upload baby profile photo? Generate Generic profile image?
- [] Add charts so users can visually track their baby's activities

### Bug Fixes

- [] Nav bar icons non collapsible
- [] Switch profileId cookies when switching profiles
- [] Middleware to auth login cookie before each request is made

## Notes

### Resources

- https://www.parents.com/baby/development/growth/baby-development-week-by-week/

### Colors

- pallette1 -https://coolors.co/palette/ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a
- pallette2 - https://coolors.co/palette/227c9d-17c3b2-ffcb77-fef9ef-fe6d73

### Fonts

- https://fonts.google.com/specimen/Neucha?preview.text=Little%20Nugget&preview.text_type=custom
- https://fonts.google.com/specimen/Indie+Flower?preview.text=Little%20Nugget&preview.text_type=custom
