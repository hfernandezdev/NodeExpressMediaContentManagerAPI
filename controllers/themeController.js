const Theme = require('../models/Theme');

const createTheme = async (req, res) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    res.status(201).json(theme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create theme.' });
  }
};

const getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get themes.' });
  }
};

const getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found.' });
    }
    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get theme.' });
  }
};

const updateTheme = async (req, res) => {
  try {
    const updatedTheme = await Theme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTheme) {
      return res.status(404).json({ error: 'Theme not found.' });
    }
    res.status(200).json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update theme.' });
  }
};

const deleteTheme = async (req, res) => {
  try {
    const deletedTheme = await Theme.findByIdAndDelete(req.params.id);
    if (!deletedTheme) {
      return res.status(404).json({ error: 'Theme not found.' });
    }
    res.status(200).json({ message: 'Theme deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete theme.' });
  }
};

module.exports = {
  createTheme,
  getAllThemes,
  getThemeById,
  updateTheme,
  deleteTheme
};
