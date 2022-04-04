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

[] DB Schema SQL
[] Define project structure

[] User Profile and Login Routes (CRUD)

- [] GET /login
- [] POST /login
- [] GET /accounts/sign-up
- [] POST /accounts/sign-up
- [] GET /accounts/:id/profile/set-up
- [] POST /accounts/:id/profile/set-up
  [] - Session Hash
  [] - User Profile and Login Views
  [] - Feed Routes (CRUD)
- [] GET /account/:id/profile/:id/feeds -> query params for time
- [] POST /account/:id/profile/:id/feeds
- [] PUT /account/:id/profile/:id/feeds/:id
- [] DELETE /account/:id/profile/:id/feeds/:id
  [] - Diaper Change Routes (CRUD)
  - [] GET /account/:id/profile/:id/diaper-changes
  - [] POST /account/:id/profile/:id/diaper-changes
  - [] PUT /account/:id/profile/:id/diaper-changes/:id
  - [] DELETE /account/:id/profile/:id/diaper-changes/:id
    [] - Sleep Routes (CRUD)
    - [] GET /account/:id/profile/:id/sleep
  - [] POST /account/:id/profile/:id/sleep
  - [] PUT /account/:id/profile/:id/sleep/:id
  - [] DELETE /account/:id/profile/:id/sleep/:id
    [] - Home Page View - GET /account/:id/profile/:id
    [] - Daily Summary View

### Phase 4

[] - Milestone Routes (RU)
[] - Milestones improvements (Adding custom milestones)

#### Notes

pallette1 -https://coolors.co/palette/ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a
pallette2 - https://coolors.co/palette/227c9d-17c3b2-ffcb77-fef9ef-fe6d73
