const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Category = require('../models/Category');
const Theme = require('../models/Theme');
const Content = require('../models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/media_content_manager_db', { auth: { username: "admin", password: "1234" } })
  .then(() => {
    console.log('Conectado a MongoDB');
    populateDatabase();
  }).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
  });

const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    username: 'lector1',
    email: 'lector1@example.com',
    password: 'password123',
    role: 'lector'
  },
  {
    username: 'creador1',
    email: 'creador1@example.com',
    password: 'password123',
    role: 'creador'
  }
];

const categories = [
  {
    name: 'Imágenes',
    description: 'Categoría para imágenes',
    cover_image: 'https://example.com/image-category.jpg'
  },
  {
    name: 'Videos',
    description: 'Categoría para videos',
    cover_image: 'https://example.com/video-category.jpg'
  },
  {
    name: 'Textos',
    description: 'Categoría para textos',
    cover_image: 'https://example.com/text-category.jpg'
  }
];

const themes = [
  {
    name: 'Ciencias',
    allowed_content: {
      images: true,
      videos: true,
      texts: true
    }
  },
  {
    name: 'Matemáticas',
    allowed_content: {
      images: true,
      videos: false,
      texts: true
    }
  },
  {
    name: 'Deportes',
    allowed_content: {
      images: true,
      videos: true,
      texts: false
    }
  }
];

const contents = [
  {
    title: 'Imagen de Ciencia',
    description: 'Una imagen relacionada con la ciencia.',
    category_id: null,
    theme_id: null,
    type: 'image',
    url: 'https://example.com/science-image.jpg',
    created_by: null
  },
  {
    title: 'Video de Matemáticas',
    description: 'Un video explicando conceptos matemáticos.',
    category_id: null,
    theme_id: null,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=example',
    created_by: null
  },
  {
    title: 'Texto de Deportes',
    description: 'Un documento de texto sobre deportes.',
    category_id: null,
    theme_id: null,
    type: 'text',
    url: 'https://example.com/sports-text.txt',
    created_by: null
  }
];

async function populateDatabase() {
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Theme.deleteMany({});
    await Content.deleteMany({});

    const userPromises = users.map(async user => {
      user.password = await bcrypt.hash(user.password, 10);
      return new User(user).save();
    });
    const createdUsers = await Promise.all(userPromises);
    console.log('Users created:', createdUsers);

    const categoryPromises = categories.map(category => new Category(category).save());
    const createdCategories = await Promise.all(categoryPromises);
    console.log('Categories created:', createdCategories);

    const themePromises = themes.map(theme => new Theme(theme).save());
    const createdThemes = await Promise.all(themePromises);
    console.log('Themes created:', createdThemes);

    contents[0].category_id = createdCategories[0]._id;
    contents[0].theme_id = createdThemes[0]._id;
    contents[0].created_by = createdUsers[2]._id;

    contents[1].category_id = createdCategories[1]._id;
    contents[1].theme_id = createdThemes[1]._id;
    contents[1].created_by = createdUsers[2]._id;

    contents[2].category_id = createdCategories[2]._id;
    contents[2].theme_id = createdThemes[2]._id;
    contents[2].created_by = createdUsers[2]._id;

    const contentPromises = contents.map(content => new Content(content).save());
    const createdContents = await Promise.all(contentPromises);
    console.log('Contenidos creados:', createdContents);

    console.log('Base de datos poblada con éxito.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    mongoose.connection.close();
  }
}
