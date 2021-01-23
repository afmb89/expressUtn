var express = require('express');
var router = express.Router();
var productosController = require('../controllers/productsController');

/* GET users listing. */
router.get('/', productosController.getAll);
router.get('/paginate', productosController.getAllPaginate);
router.get('/tags/:id', productosController.getByTags);
router.get('/:id', productosController.getById);
router.post('/', productosController.create);
router.put('/:id', productosController.update);
router.delete('/:id', productosController.delete);

module.exports = router;
