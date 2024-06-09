const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías de contenido
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
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
 *                 example: "Imágenes"
 *               description:
 *                 type: string
 *                 example: "Categoría de imágenes"
 *               cover_image:
 *                 type: string
 *                 example: "/path/to/cover_image.jpg"
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateToken, authorizeRoles('admin'), categoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
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
 *                     example: "Imágenes"
 *                   description:
 *                     type: string
 *                     example: "Categoría de imágenes"
 *                   cover_image:
 *                     type: string
 *                     example: "/path/to/cover_image.jpg"
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido o expirado
 */
router.get('/', authenticateToken, categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener información de una categoría por ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Información de la categoría
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
 *                   example: "Imágenes"
 *                 description:
 *                   type: string
 *                   example: "Categoría para contenido de imágenes"
 *                 cover_image:
 *                   type: string
 *                   example: "https://example.com/cover_image.jpg"
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
 *         description: Categoría no encontrada
 */
router.get('/:id', authenticateToken, categoryController.getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Imágenes"
 *               description:
 *                 type: string
 *                 example: "Categoría de imágenes actualizada"
 *               cover_image:
 *                 type: string
 *                 example: "/path/to/cover_image_updated.jpg"
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authenticateToken, authorizeRoles('admin'), categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin'),  categoryController.deleteCategory);

module.exports = router;
