const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario123"
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [lector, creador, admin]
 *                 example: "lector"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El nombre de usuario o el correo electrónico ya están en uso
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateToken, authorizeRoles('admin'), userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener la lista de todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                   username:
 *                     type: string
 *                     example: "usuario123"
 *                   email:
 *                     type: string
 *                     example: "usuario@example.com"
 *                   role:
 *                     type: string
 *                     example: "lector"
 *                   created_at:
 *                     type: string
 *                     example: "2022-01-01T00:00:00.000Z"
 *                   updated_at:
 *                     type: string
 *                     example: "2022-01-01T00:00:00.000Z"
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 */
router.get('/', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener información de un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Información del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 username:
 *                   type: string
 *                   example: "usuario123"
 *                 email:
 *                   type: string
 *                   example: "usuario@example.com"
 *                 role:
 *                   type: string
 *                   example: "lector"
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
 *         description: Usuario no encontrado
 */
router.get('/:id', authenticateToken, authorizeRoles('admin'), userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario123"
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               role:
 *                 type: string
 *                 enum: [lector, creador]
 *                 example: "lector"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authenticateToken, authorizeRoles('admin'), userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: No tienes permisos para esta acción
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
