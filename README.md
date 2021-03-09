# NYTimes Book and Article Browser

## Installation
1. To install, run `npm install` from terminal.
2. Supply your NYT API key via an environment variable called `NYT_API_KEY`.

## Running the app
To run the app, run `npm run serve` from terminal. The app is served in `http://localhost:8080`, please make sure that port 8080 is not in use before running the app.

The app uses `nodemon` as web server. It's included as a dev-dependency.

## Using the API
### `GET /articles`
Article search
#### Query Parameters
`keyword` The keyword to look for.
`sort` The sorting method. Accepts `ascending` or `descending`.
`page` The page to view. NYT API only displays 10 results at a time. To view other articles, use this parameters. The first page number is `0`.

#### Response fields
`title` _string_ The main title of the article.
`abstract` _string_ A short abstract of the article.
`authors` _array_ An array of strings containing the author(s) of the article.
`keywords` _array_ Keywords related to the article.
`imageUrl` _string_ The web URL of the article's main image.
`url` _string_ The URL to the article on NYT's website.
`publishDate` _string_ A string representing publication date of the article, formatted in ISO 8601.
