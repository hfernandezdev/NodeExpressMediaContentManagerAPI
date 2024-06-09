const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'creador'), contentController.createContent);
router.get('/', authenticateToken, contentController.getAllContents);
router.get('/:id', authenticateToken, contentController.getContentById);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'creador'), contentController.updateContent);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), contentController.deleteContent);

module.exports = router;
