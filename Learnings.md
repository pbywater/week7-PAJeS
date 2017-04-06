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


Testing your databases
- You will have to make a config-test.env file
- (add it to your git-ignore)
- It should contain a dburl to your local database
- In your db_connection.js amend your file with the following:
```const environment = require('env2');
    if(process.env.ENV === 'test'){
      environment('./config-test.env')
    } else{
      environment('config.env')
    }
```
- Inside your package.json, add a script called ```"test-database":"ENV=test node database/db_build.js"```
- Create a database called ```test_database``` in your ```psql```
- Your db_url will look like ```[name]:localhost:[port]/[name of database]
