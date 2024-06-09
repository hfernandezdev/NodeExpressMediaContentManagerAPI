const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Contents
 *   description: Gestión de contenidos multimedia
 */

/**
 * @swagger
 * /api/contents:
 *   post:
 *     summary: Crear un nuevo contenido
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título del contenido"
 *               description:
 *                 type: string
 *                 example: "Descripción del contenido"
 *               category_id:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               theme_id:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               type:
 *                 type: string
 *                 example: "image"
 *               url:
 *                 type: string
 *                 example: "http://example.com/path/to/content"
 *     responses:
 *       201:
 *         description: Contenido creado con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateToken, authorizeRoles('admin', 'creador'), contentController.createContent);

/**
 * @swagger
 * /api/contents:
 *   get:
 *     summary: Obtener todos los contenidos
 *     tags: [Contents]
 *     responses:
 *       200:
 *         description: Lista de contenidos
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
 *                   title:
 *                     type: string
 *                     example: "Título del contenido"
 *                   description:
 *                     type: string
 *                     example: "Descripción del contenido"
 *                   category_id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109cb"
 *                   theme_id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109cb"
 *                   type:
 *                     type: string
 *                     example: "image"
 *                   url:
 *                     type: string
 *                     example: "http://example.com/path/to/content"
 *                   created_by:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109cb"
 *                   created_at:
 *                     type: string
 *                     example: "2022-01-01T00:00:00.000Z"
 *                   updated_at:
 *                     type: string
 *                     example: "2022-01-01T00:00:00.000Z"
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido o expirado
 */
router.get('/', authenticateToken, contentController.getAllContents);


/**
 * @swagger
 * /api/content/{id}:
 *   get:
 *     summary: Obtener información de un contenido por ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contenido
 *     responses:
 *       200:
 *         description: Información del contenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 title:
 *                   type: string
 *                   example: "Introducción a la Física"
 *                 description:
 *                   type: string
 *                   example: "Contenido multimedia sobre la introducción a la física."
 *                 category_id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 theme_id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 type:
 *                   type: string
 *                   enum: [image, video, text]
 *                   example: "video"
 *                 url:
 *                   type: string
 *                   example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *                 created_by:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
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
 *         description: Contenido no encontrado
 */
router.get('/:id', authenticateToken, contentController.getContentById);

/**
 * @swagger
 * /api/contents/{id}:
 *   put:
 *     summary: Actualizar un contenido existente
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contenido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título del contenido"
 *               description:
 *                 type: string
 *                 example: "Descripción del contenido"
 *               category_id:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               theme_id:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               type:
 *                 type: string
 *                 example: "image"
 *               url:
 *                 type: string
 *                 example: "http://example.com/path/to/content"
 *     responses:
 *       200:
 *         description: Contenido actualizado con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authenticateToken, authorizeRoles('admin', 'creador'), contentController.updateContent);

/**
 * @swagger
 * /api/contents/{id}:
 *   delete:
 *     summary: Eliminar un contenido existente
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contenido
 *     responses:
 *       200:
 *         description: Contenido eliminado con éxito
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin'), contentController.deleteContent);

module.exports = router;
