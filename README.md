# NYTimes Book and Article Browser

## Installation
1. To install, run `npm install` from terminal.
2. Supply your NYT API key via an environment variable called `NYT_API_KEY`.

## Running the app
To run the app, run `npm run serve` from terminal. The app is served in `http://localhost:8080`, please make sure that port 8080 is not in use before running the app.

The app uses `nodemon` as web server. It's included as a dev-dependency.

## Using the API
All endpoints in this API responds in JSON.

### `GET /articles`
Article search
#### Query Parameters
`keyword` The keyword to look for.

`sort` The sorting method. Accepts `ascending` or `descending`.

`page` The page to view. NYT API only displays 10 results at a time. To view other articles, use this parameters. The first page number is `0`.

#### Response Fields
`reqCompletedAt` _string_ An ISO 8601 string representing the time of request completion. Included for peformance measurement purposes.

`status` _string_ The status of the request operations. `ok` indicates success.

`articles` _array_ The array containing articles returned from the search. Each element of the array contains the following:
* `title` _string_ The main title of the article.
* `abstract` _string_ A short abstract of the article.
* `authors` _array_ An array of strings containing the author(s) of the article.
* `keywords` _array_ Keywords related to the article.
* `imageUrl` _string_ The web URL of the article's main image.
* `url` _string_ The URL to the article on NYT's website.
* `publishDate` _string_ A string representing publication date of the article, formatted in ISO 8601.

### `GET /books/{listName}`
Returns list of best-selling books.

#### URL Parameters
`listName` _required_ The name of the list, such as "e-book-fiction" or "hardcover-fiction".

#### Response Fields
`reqCompletedAt` _string_ An ISO 8601 string representing the time of request completion. Included for peformance measurement purposes.

`status` _string_ The status of the request operations. `ok` indicates success.

`books` _array_ The array containing books in the list. Each element of the array contains the following:
* `title` _string_ The title of the book.
* `author` _string_ The author(s) of the book
* `description` _string_ A short description of the content of the book.
* `isbn` _string_ A 13-digit or 10-digit ISBN of the book.
* `rank` _string_ The rank that the book occupies in the list.
* `image` _string_ An image of the book, or book cover.
* `buyLinks` _string_ A collection of links from which one can buy the book.

