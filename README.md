# Tic-tac-toe UI

[![CircleCI](https://circleci.com/gh/leafrogers/tic-tac-toe-ui.svg?style=svg)](https://circleci.com/gh/leafrogers/tic-tac-toe-ui)

A UI for playing games of tic-tac-toe via an [accompanying
API](https://github.com/leafrogers/tic-tac-toe-api).

- [:thinking: Why does this repo exist?](#thinking-why-does-this-repo-exist)
- [:warning: Requirements](#warning-requirements)
- [:running: Running locally](#running-running-locally)
- [:gear: Developing locally](#gear-developing-locally)
- [:pager: Contact](#pager-contact)
- [Licence](#licence)

## :thinking: Why does this repo exist?

This repo exists so that the [the author](https://github.com/leafrogers) can
use it a playground for learning different web stacks, and for general tinkering.

Please do feel free to use this code, add GitHub issues, or open PRs, but know
that you may not get a timely response.

## :warning: Requirements

This app requires the following to be installed in order to run locally.

- [Node](https://www.nodejs.org) (version 16.x.x)

## :running: Running locally

This app relies on the [tic-tac-toe API](https://github.com/leafrogers/tic-tac-toe-api), so you’ll need to run that locally too. Follow the [steps in its README.md](https://github.com/leafrogers/tic-tac-toe-api/blob/main/README.md) and come back here when you have that running.

Steps for running this app:

- Clone this repo to a local directory
- In your terminal, run `npm install`
- Optionally, run `npm test` to confirm that everything is set up properly. The output shouldn’t say the word “fail” or “failed” anywhere
- Run `API_URL=http://localhost:3000/api API_KEY=hello BASE_URL=http://localhost:3001 npm start`
- With your favourite web browser, go to the URL that’s logged in your terminal
- Have fun playing — let’s face it — a bit of a rubbish game

## :gear: Developing locally

Similar to the prior steps, but some varying commands to make it easier for
checking your changes:

- Clone this repo to a local directory
- In your terminal, run `npm install`
- After that’s finished, run `API_URL=http://localhost:3000/api API_KEY=hello BASE_URL=http://localhost:3001 npm run start:dev`
- Go to the URL that’s logged in the console output

### :pager: Contact

If you have any questions or comments about this app, or need help using it,
please [raise an issue](https://github.com/leafrogers/tic-tac-toe-ui/issues).

---

### Licence

This software is published by the Leaf Rogers under the [MIT licence](http://opensource.org/licenses/MIT).
