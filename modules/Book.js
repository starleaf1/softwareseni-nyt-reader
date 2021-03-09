const axios = require('axios')

module.exports = class Book {
  constructor (
    title,
    author,
    description,
    isbn,
    rank,
    image,
    buyLinks
  ) {
    this.title = title,
    this.author = author,
    this.description = description,
    this.isbn = isbn,
    this.rank = rank,
    this.image = image,
    this.buyLinks = buyLinks
  }

  static async list (listName) {
    let axiosRequest = await axios(`https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json`, {
      params: {
        'api-key': process.env.NYT_API_KEY
      }
    }).catch(e => {
      if (e.response.status === 404) { throw new Error('not-found') }
    })

    var rawData = axiosRequest.data.results
    var books = rawData.books.map(book => {
      var isbn = null
      if (book.isbns && book.isbns.length) {
        isbn = book.isbns[0].isbn13 || book.isbns[0].isbn10
      }
      return new this(
        book.title,
        book.author || null,
        book.description || null,
        isbn,
        book.rank,
        book.image || null,
        book.buyLinks
      )
    }).sort((a, b) => {
      if (a.rank < b.rank) return -1
      if (a.rank > b.rank) return 1
      return 0
    })

    return books
  }
}