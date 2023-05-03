# Watch this api

This API serves the application [WatchThis](https://github.com/ArielBetti/watch-this), to run these services you can follow this tutorial.

PROD API: https://watch-this-api.herokuapp.com

#### 1: Create an .env file in the project root and add variables.
you can see an example of the variables used in the project in the `.env-example` file

```
DATA_BASE_PASSWORD='{{your mongo data base password}}'
JWT_SECRET_KEY='{{your jwt key}}'
CORS_ALLOWED_ORIGIN='{{your application url ex: https://watch-this.vercel.app}}'
```

#### 1: Install deps.
`npm i`

#### 2: start in dev mode "nodemon"
`npm run dev`


## TODO
[] Refact to typeScript

## License

MIT
