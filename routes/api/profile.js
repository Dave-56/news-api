const express = require('express');
const router = express.Router();
const config = require('config');
const key = config.get('APIKEY');
const axios = require('axios');

// @route    GET api/profile/everything/:company
// @desc     Get every article mentioning a specified company
// @access   Public
router.get('/everything/:company', async (req, res) => {
  const url =
    `http://newsapi.org/v2/everything?` +
    `q=${req.params.company}&` +
    `from=2020-06-30&` +
    `sortBy=popularity&` +
    `apiKey=${key}`;
  try {
    let response = await axios.get(url);
    //filter the articles..check if it contains the company && any other keyword
    //keyword[req.params.company, black, minority, sustainable, community, electric, sustainability]

    let keywords = [
      'black',
      'minority',
      'sustainable',
      'community',
      'electric',
      'sustainability',
      'smart',
    ];

    //cleanup after: pass a func to map instead of for loop
    response.data.articles.map((article, index) => {
      let bool = false;
      for (let i = 0; i < keywords.length; i++) {
        if (article.title.toLowerCase().search(keywords[i]) > -1) {
          bool = true;
          break;
        }
      }

      bool ? '' : (response.data.articles[index] = null);
      return article;
    });

    let filteredArticles = response.data.articles.filter(
      (article) => article != null
    );

    res.json(filteredArticles);
    // return res.json(JSON.parse(body));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/top-headlines/:query (e.g query=trump)
// @desc     Get top headlines personalized by query
// @access   Public
router.get('/top-headlines/:query', async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?q=${req.params.query}&apiKey=${key}`;
  try {
    let response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/top-headlines/:category
// @desc     Get top headlines personalized by category
// @access   Public

router.get('/top-headlines/:category', async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${req.params.category}&apiKey=${key}`;
  try {
    let response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
