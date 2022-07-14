const express = require('express');
const productsRouter = express.Router();
const debug = require('debug')('app:productsRouter');
const {MongoClient, ObjectId} = require('mongodb');


//read from db
productsRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://dbuser:gc9hvX02oGLl1gVS@store.kt3znkc.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'store';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB!!');

            const db = client.db(dbName);

            debug(db.collections[0]);

            const products = await db.collection('products').find().toArray();

            debug(products.length);

            res.render('products', {products});

        }catch(error)
        {
            debug(error.stack);
        }
        client.close();
    })();
});

 productsRouter.route('/:id').get((req, res) => {
    const url = 'mongodb+srv://dbuser:gc9hvX02oGLl1gVS@store.kt3znkc.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'store';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB to get the spicified product!!');
            debug(req.params.id);

            const db = client.db(dbName);

            const product = await db.collection('products').findOne({_id: new ObjectId(req.params.id)});

            res.render('product', {product});

        }catch(error)
        {
            debug(error.stack);
        }
        client.close();
    })();
}); 


module.exports = productsRouter;