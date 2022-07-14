const express = require('express');
const debug = require('debug')('app:authRouter');
const {MongoClient} = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) =>{
    //res.json(req.body);
    //Create a new user
    const {username, email, password} = req.body;
    debug('username is ' + username);
    const url = 'mongodb+srv://dbuser:gc9hvX02oGLl1gVS@store.kt3znkc.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'store';

    ( async function addUser(){
        let client; 
        try{
            debug('entered tyy!!!');
            client = await MongoClient.connect(url);
            debug('connected to db!!');

            const db = client.db(dbName);
            const user = {username, email, password};
            const results = await db.collection('users').insertOne(user);
            debug(results);
            debug (results.ops);
            req.login(user, () => {
                res.redirect('/auth/profile');
              });

        }catch(error){
            debug(error);
        }
        client.close();
    })();
    
});

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );

authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
});

module.exports = authRouter;