# Project2 - Baby Tracking App

## Motivation & Objectives

Create a Baby tracking app so that new parents will be able login, select their child in the profiles, and keep track of their baby's feed, diaper changing and sleep throughout the day. Similarly they will also be able to note and check what their baby's next milestones are according to the baby's age (up to 1 YO).

## Project Planning

### Phase 1 and 2

[x] - Idea Generation
[x] - User flow diagrams
[x] - UI Mockups
[x] - Database ERD

### Phase 3

DB
[x] DB init schema
[x] DB drop table schema
[] DB seed table schema
[] DB purge table data

User Profile and Login Routes (CRUD)
[x] GET /login
[x] POST /login
[x] GET /accounts/sign-up
[x] POST /accounts/sign-up
[x] GET /accounts/:id/profile/set-up
[x] POST /accounts/:id/profile/set-up
[x] User Profile and Login Views
[x] Add additional profile page in setup

Session Hash
[x] Implement Session Hash
[x] Implement logout button
[x] DELETE /logout

Home page
[x] GET /account/:id/profile/:id
[x] Home Page View
[x] Bottom nav bar - switch profiles easily
[x] Baby profile page

Feeding
[x] GET /account/:id/profile/:id/feeds
[x] POST /account/:id/profile/:id/feeds
[x] PUT /account/:id/profile/:id/feeds/:id
[x] DELETE /account/:id/profile/:id/feeds/:id
[x] Feed view page

Diaper Changing
[x] GET /account/:id/profile/:id/diaper-changes
[x] POST /account/:id/profile/:id/diaper-changes
[x] PUT /account/:id/profile/:id/diaper-changes/:id
[x] DELETE /account/:id/profile/:id/diaper-changes/:id
[x] Diaper change view page

Sleeping
[x] GET /account/:id/profile/:id/sleep
[x] POST /account/:id/profile/:id/sleep
[x] PUT /account/:id/profile/:id/sleep/:id
[x] DELETE /account/:id/profile/:id/sleep/:id
[x] Sleep view page

### Phase 4

[x] Milestone Routes (Read + update completion status)
[] Styling and beautifying

## Future improvements

[] Upload baby profile photo? Generate Generic profile image?
[] Switch profileId cookies when switching profiles
[] middleware to auth login cookie before each request is made

#### Notes

Resources

- https://www.parents.com/baby/development/growth/baby-development-week-by-week/

Colors

- pallette1 -https://coolors.co/palette/ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a
- pallette2 - https://coolors.co/palette/227c9d-17c3b2-ffcb77-fef9ef-fe6d73

Fonts

- https://fonts.google.com/specimen/Neucha?preview.text=Little%20Nugget&preview.text_type=custom
- https://fonts.google.com/specimen/Indie+Flower?preview.text=Little%20Nugget&preview.text_type=custom

Libraries

- express
- ejs
- method-override
- jssha
- cookie-parser
- axios
- luxon (for dates)
- uuid
