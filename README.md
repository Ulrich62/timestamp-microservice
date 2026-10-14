# Timestamp Microservice

A freeCodeCamp certification project: an API microservice that parses dates and returns Unix timestamps (in milliseconds) and UTC string representations.

## API Endpoints

- `GET /api/:date?`
  - If a valid date string is passed (e.g. `2016-12-25` or `05 October 2011`), returns `{ "unix": 1482624000000, "utc": "Sun, 25 Dec 2016 00:00:00 GMT" }`.
  - If a Unix timestamp in milliseconds is passed (e.g. `1451001600000`), returns `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`.
  - If empty, returns the current time in Unix and UTC format.
  - If invalid, returns `{ "error": "Invalid Date" }`.

## Running the Application

```bash
npm install
npm start
```

## Running Tests

```bash
npm test
```

## License

MIT © [Ulrich ADIMI](https://github.com/Ulrich62)
