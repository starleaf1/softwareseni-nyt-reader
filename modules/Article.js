const axios = require('axios').default

module.exports = class Article {
  constructor (
    title,
    abstract,
    authors,
    imageUrl,
    url,
    keywords,
    publishDate
  ) {
    this.title = title
    this.authors = authors
    this.abstract = abstract
    this.imageUrl = imageUrl
    this.url = url
    this.keywords = keywords
    this.publishDate = publishDate instanceof Date ? publishDate : new Date(publishDate)
  }

  static async list(keyword, sort = 'descending', page=0) {
    let response = await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        'api-key': process.env.NYT_API_KEY,
        q: keyword || null,
        page: page
      }
    })
    var rawData = response.data.response
    var docs = rawData.docs.map((doc, i) => {
      var title = doc.headline.main
      var abstract = doc.abstract
      var publishDate = doc.pub_date
      var url = doc.web_url
      var keywords = doc.keywords.map(k => k.value || null)
      
      var authors = doc.byline.original ? doc.byline.original.replace(/^[Bb]y /, '').split(', ') : null

      var imageObject = doc.multimedia.find(o => (
            // It has to be of type 'image'...
            o.type === 'image' && 
            // ...and it has to be the smallest rank number.
            o.rank === 0
            // This is assumed to be zero. Need to find actual lowest number when in production
          )
        )
      var imageUrl = imageObject ? `https://nytimes.com/${imageObject.url}` : null

      return new this(
        title, abstract, authors, imageUrl, url, keywords, publishDate
      )
    }).sort((a, b) => {
      // Sort the collection of articles based on sort argument.
      if (a.publishDate < b.publishDate) { return sort === 'ascending' || 'asc' ? -1 : 1}
      if (a.publishDate > b.publishDate) { return sort === 'ascending' || 'asc' ? 1 : -1 }
      return 0
    })
    return docs
  }
}