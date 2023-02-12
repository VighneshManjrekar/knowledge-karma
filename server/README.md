# Knowledge Karma Backend

## Usage

Rename `.env.env` to `.env` and update the values to your own

## Install Dependencies

`npm install`

## Run App

```
# Run in development mode
npm run dev

# Run in produdction mode
npm start
```

## Database Seeder

To seed the database with data from the `./data` folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```
