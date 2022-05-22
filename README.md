# People of Star Wars

Next.js application that displays a Star Wars characters list from a SWAPI (Star Wars API).

User can:
- search for a character by name
- filter the caharcter lists by character’s homeworld
- visit a detailed page of each character
- see modal with information about the homeworld after clicking button on detailed view page
- add characters to persistent favorite list
- send message to page team via provided contact form
- easily navigate through pages
- get on screen notifications about app events

## Installation
### Server
In order to run the app you need to install and launch `swapi-graphql` first

1. Clone API repo
```
git clone https://github.com/graphql/swapi-graphql.git
```
2. Install and start the server
```
npm install
PORT=4000 npm start
```

### Client
1. Clone this repo
2. `yarn install`
3. `yarn dev`
4. Visit http://localhost:3000/