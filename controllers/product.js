const { request, response } = require('express');
const parseJson = require('parse-json');
const { Firestore } = require('@google-cloud/firestore');

const putProduct = (req = request, res = response) => {

    const message = req.body;

    //const decodedMessage = message ? parseJson(Buffer.from(message, 'base64')) : null;
    const { sku, attributes } = parseJson(message.value);

    res.json({
        sku,
        attributes
    });
}

const patchProduct = async (req = request, res = response) => {

    const message = req.body;
    const db = new Firestore();
    //const decodedMessage = message ? parseJson(Buffer.from(message, 'base64')) : null;
    const { sku, attributes } = parseJson(message.value);

    const productRef = db.collection('cl').doc('products').collection('products').doc({ sku: '123456' });
    const doc = await productRef.get();

    if (!doc.exists) {
        throw new Error(`El producto no esta existe`);
    }

    // Find by SKU.


    // If exists update/patch.
    res.json({
        doc: doc.data()
    });
}

const postProduct = async (req = request, res = response) => {

    const message = req.body;
    const db = new Firestore();

    const product = parseJson(message.value);
    
    //const { country } = parseJson(message.headers[1]);
    // message.headers[1].value.toString() charCoder String.fromCharCode(67,76)
    let doc;
    let productRef;

    const collectionRef = db.collection('cl').doc('products').collection('products');

    const skuRef = await collectionRef.where('product.sku', '==', product.sku).get();

    if (skuRef.empty) {
        //throw new Error(`El producto no esta existe`);
        doc = await collectionRef.add({ product });

        res.json({
            _id: doc.id,
            msg: 'New Product'
        });
    } else {

        skuRef.forEach(prd => {
            //console.log(prd.id, '=>', prd.data());
            productRef = {
                _id: prd.id,
                data: prd.data().product
            }
        });

        res.json({
            msg: 'Existing Product',
            data: productRef
        });
    }


}


module.exports = {
    putProduct,
    patchProduct,
    postProduct
}