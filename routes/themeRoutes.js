const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Themes
 *   description: Gestión de temáticas de contenido
 */

/**
 * @swagger
 * /api/themes:
 *   post:
 *     summary: Crear una nueva temática
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ciencias"
 *               allowed_content:
 *                 type: object
 *                 properties:
 *                   images:
 *                     type: boolean
 *                     example: true
 *                   videos:
 *                     type: boolean
 *                     example: false
 *                   texts:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       201:
 *         description: Temática creada con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateToken, authorizeRoles('admin'), themeController.createTheme);

/**
 * @swagger
 * /api/themes:
 *   get:
 *     summary: Obtener todas las temáticas
 *     tags: [Themes]
 *     responses:
 *       200:
 *         description: Lista de temáticas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109cb"
 *                   name:
 *                     type: string
 *                     example: "Ciencias"
 *                   allowed_content:
 *                     type: object
 *                     properties:
 *                       images:
 *                         type: boolean
 *                         example: true
 *                       videos:
 *                         type: boolean
 *                         example: false
 *                       texts:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido o expirado
 */
router.get('/', authenticateToken, themeController.getAllThemes);

/**
 * @swagger
 * /api/themes/{id}:
 *   get:
 *     summary: Obtener información de una temática por ID
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la temática
 *     responses:
 *       200:
 *         description: Información de la temática
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 name:
 *                   type: string
 *                   example: "Ciencias"
 *                 allowed_content:
 *                   type: object
 *                   properties:
 *                     images:
 *                       type: boolean
 *                       example: true
 *                     videos:
 *                       type: boolean
 *                       example: false
 *                     texts:
 *                       type: boolean
 *                       example: true
 *                 created_at:
 *                   type: string
 *                   example: "2022-01-01T00:00:00.000Z"
 *                 updated_at:
 *                   type: string
 *                   example: "2022-01-01T00:00:00.000Z"
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Temática no encontrada
 */
router.get('/:id', authenticateToken, themeController.getThemeById);

/**
 * @swagger
 * /api/themes/{id}:
 *   put:
 *     summary: Actualizar una temática existente
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la temática
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ciencias"
 *               allowed_content:
 *                 type: object
 *                 properties:
 *                   images:
 *                     type: boolean
 *                     example: true
 *                   videos:
 *                     type: boolean
 *                     example: true
 *                   texts:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       200:
 *         description: Temática actualizada con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Temática no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authenticateToken, authorizeRoles('admin'), themeController.updateTheme);

/**
 * @swagger
 * /api/themes/{id}:
 *   delete:
 *     summary: Eliminar una temática existente
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la temática
 *     responses:
 *       200:
 *         description: Temática eliminada con éxito
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Temática no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin'), themeController.deleteTheme);

module.exports = router;
