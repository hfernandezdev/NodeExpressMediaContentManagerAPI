const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin'), categoryController.createCategory);
router.get('/', authenticateToken, categoryController.getAllCategories);
router.get('/:id', authenticateToken, categoryController.getCategoryById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), categoryController.updateCategory);
router.delete('/:id', authenticateToken, authorizeRoles('admin'),  categoryController.deleteCategory);

module.exports = router;
