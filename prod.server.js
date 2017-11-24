var express = require('express')
var config = require('./config/index')
var axios = require('axios')
const app = express()

const apiRoutes = express.Router()

// var bodyParser = require('body-parser') 

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())

// const    api = require('../servers/index.js')(apiRoutes);

// app.use('/api', apiRoutes);

apiRoutes.get('/getDiscList',function(req,res){
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url,{
    headers:{
      referer:'https://c.y.qq.com/',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})

// app.use('/api',apiRouter)

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api',apiRoutes)

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})