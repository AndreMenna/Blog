const { Router } = require('express');
const PostController = require('../controllers/PostController');
const router = Router();

const controller = new PostController();

router.get('/', (req, res) => controller.list(req, res));
router.get('/add-post', (req, res) => controller.renderAdd(req, res));
router.get('/posts/:id', (req, res) => controller.detail(req, res));
router.get('/edit/:id', (req, res) => controller.renderEdit(req, res));
router.get('/delete/:id', (req, res) => controller.delete(req, res));

router.post('/posts/', (req, res) => controller.create(req, res));
router.post('/posts/:id', (req, res) => controller.update(req, res));

module.exports = router;