const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestión de autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
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
 *                 example: "lector"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Nombre de usuario o correo ya existen
 *       500:
 *         description: Error del servidor
 */
router.post('/register', authController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticar un usuario
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa, retorna un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Usuario o contraseña incorrectos
 *       500:
 *         description: Error del servidor
 */
router.post('/login', authController.loginUser);

module.exports = router;
