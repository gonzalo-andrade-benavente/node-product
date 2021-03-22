const { Router } = require('express');
const { putProduct, patchProduct, postProduct } = require('../controllers/product');

const router = Router();

router.post('/', postProduct);

router.put('/', putProduct );

router.patch('/', patchProduct );

module.exports = router;