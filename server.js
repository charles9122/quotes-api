const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const RandomQuote = {quote: getRandomElement(quotes)};
    res.send(RandomQuote);

})

app.get('/api/quotes', (req, res, next) => {
const person = req.query.person;
if(person !== undefined){
    const quotesByPerson = quotes.filter(quote => quote.person === person);
    res.send({quotes: quotesByPerson})
} else {
      res.send({quotes: quotes})
  }})

app.post('/api/quotes', (req, res, next) => {
    const newPerson = req.query.person;
    const newQuote = req.query.quote;
    const quote = {quote: newQuote, person: newPerson};
    if(newPerson && newQuote){
        quotes.push(quote)
        res.send({quote: quote})
    } else {
        res.status(400).send()
    }
})
app.listen(PORT, ()=>{console.log(`listening on port: ${PORT}.`)})