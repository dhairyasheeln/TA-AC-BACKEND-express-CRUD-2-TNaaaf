var express = require('express');
var router = express.Router();
var Article=require('../models/article');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.find({},(err,articles)=>{
    res.render('articles',{articles:articles});
  })
});

router.get('/new',(req,res,next)=>{
  res.render('articleForm.ejs');
});

router.post('/',(req,res,next)=>{
  var data=req.body;
  Article.create(req.body,(err,article)=>{
    if(err) return next(err);
    res.render('articleForm');
  })
});

router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  console.log(id);
  Article.findById(id,(err,article)=>{
    if(err) return next(err);
    res.render('articleDetailView.ejs',{article:article});
  })
});

router.get('/:id/edit',(req,res)=>{
  var id=req.params.id;
  Article.findById(id,(err,article)=>{
    res.render('articleEditForm.ejs',{article:article})
  })
  
});

router.post('/:id/edit',(req,res)=>{
  var id=req.params.id;
  Article.findByIdAndUpdate(id,req.body,(err,article)=>{
    res.redirect('/articles/'+id);
  });
});

module.exports = router;
