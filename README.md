<p align="center">
  <br/>
  <img src="app/assets/images/logo.png" alt="Kitesocial" width="50%" align="center"/>
  <br/>
  <br/>
  It's like Twitter, but for Buildkite.
  <br/>
</p>

## Welcome

Welcome to Kitesocial, a Twitter clone!

## Development setup

To run Kitesocial, you will need:

- Ruby 2.7.2
- Rails 6.0.3
- Yarn 1.19.1
- Node 16.10.0
- Chrome or Chromium

Once you've cloned the repo, run:

```
  bin/setup
```

Then you'll be able to spin up your server and run your specs!

## Running kitesocial

Run `rails s` to run the application. The application is accessible at `http://localhost:3000`

Kitesocial uses `db/seeds.rb` to create an initial data set of Users and Chirps, as well as set up Follow relationships 
between Users.

You can log in as any of the users listed in `db/seeds.rb` using their `email` and `password` 🔐
