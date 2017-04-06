# What we have learnt

## Heroku database

To set up a database in Heroku

- Get Heroku account (if you don't have one)
- Download and install Heroku CLI (info on how to do this here: [Heroku CLI docs](https://devcenter.heroku.com/articles/heroku-cli))
- Login to Heroku on the command line using `heroku login` and type in the email and password you use for Heroku
- Create new app using `heroku create <app-name>`
- Create database using `heroku addons:create heroku-postgresql:hobby-dev`
- After running this, Heroku will create a `DATABASE_URL` variable, which you can find in your Heroku app settings under 'Config Variables'
- Create a `config.env` file in your local repo using the Heroku `DATABASE_URL` (make sure that this is in your `.gitignore` file, because you don't want to push it to GitHub)
- Make sure that your `db_connection.js` files references this correctly (i.e. `const params = url.parse(process.env.DATABASE_URL);`, not `DB_URL`)
- Run `node database/db_build.js` to create your database locally (or whatever command you use to create your database)
- Connect directly to Heroku database using `heroku pg:psql`
- To see if your tables are there, run `\dt`
