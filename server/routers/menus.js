import express from 'express';
import Menus from '../models/Menus';
import Users from '../models/Users';
var cookieParser = require('cookie-parser');  //
// import session from 'express-session';
import uuid from 'node-uuid';
import Session from '../models/Sessions';
let router = express.Router();

router.use(cookieParser());

router.get('/confirmUserCenter',(req,res)=>{

  if(req.cookies.user){
    Session.findOne({randomId:req.cookies.user},(err,doc)=>{
      if(err){
        res.status(403).send('');
      }else {
        res.status(200).send(doc.username)
      }
    })
  } else {
    res.status(403).send('');
  }
});

router.get('/confirmUpload',(req,res)=>{
  if(req.cookies.user){
    Session.findOne({randomId:req.cookies.user},(err,doc)=>{
      if(err){
        res.status(403).send('');
      }else {
        res.status(200).send(doc.username)
      }
    })
  } else {
    res.status(403).send('');
  }
});




router.get(`/userWorks/:userId`,(req,res)=>{
  Menus.find({user:req.params.userId},(err,doc)=>{
      if(doc){
        res.status(200).send(doc)
      } else {
        res.status(404)
      }
  });
});


router.get('/user/:userId',(req,res)=>{
  Users.findOne({username:req.params.userId},(err,doc)=>{
    if(doc){
      res.status(200).send(doc)
    }
    if(err){
      res.status(400)
    }
  })
});

router.get('/', (req, res)=> {//朋友圈
    Menus.find({}).sort({_id: -1}).limit(9).exec(function (err, data) {
      res.send(data);
    });
  });



router.get('/homePage',(req,res) =>{
  Menus.find({}).sort({_id:-1}).limit(3).exec(function (err,data) {//脸是函数
    res.send(data);
  });
});






router.post('/registerCheck',(req,res)=>{
  Users.findOne({username:req.body.username},(err,doc)=>{
    if(doc){
      res.status(501).send({err:'用户名重复'})
    } else {
      new Users({username:req.body.username,password:req.body.password,tel:req.body.tel}).save((err,doc)=>{
        res.status(200).send({data:'success'})
      })
    }
    if(err){
      res.status(501)
    }
  })
});



router.post('/loginTest',(req,res)=>{
  Users.findOne({username:req.body.username},(err,doc)=>{
    if(!doc){
      res.status(501).send({err:'该用户不存在'})
    } else if(doc.password === req.body.password){
      var randomId = uuid.v4();
       new Session( {
        username:req.body.username,
        password:req.body.password,
        randomId:randomId //
      }).save((err,doc)=>{
         res.cookie('user',randomId,{path:'/'});
         res.status(200).send({data:req.body.username});
       });
    } else {
      res.status(501).send({err:'密码不正确'})
    }
    if(err){
      res.status(501).send({err:'数据库操作有误'})
    }
  })
});

router.post('/',(req,res)=>{
  new Menus(req.body).save((err)=>{
    if(err) {
      res.status(404).send('fail');
    } else {
      res.status(200).send('success');
    }
  });
});

router.get('/:id', (req, res)=> {
  Menus.findOne({_id: req.params.id}, (err, doc)=> {
    res.status(200).send(doc);
  });
});




module.exports = router;
// export default router;