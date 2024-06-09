const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin'), themeController.createTheme);
router.get('/', authenticateToken, themeController.getAllThemes);
router.get('/:id', authenticateToken, themeController.getThemeById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), themeController.updateTheme);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), themeController.deleteTheme);

module.exports = router;
