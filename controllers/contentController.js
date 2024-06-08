const Content = require('../models/Content');

const createContent = async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content.' });
  }
};

const getAllContents = async (req, res) => {
  try {
    const contents = await Content.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get contents.' });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found.' });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get content.' });
  }
};

const updateContent = async (req, res) => {
  try {
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContent) {
      return res.status(404).json({ error: 'Content not found.' });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content.' });
  }
};

const deleteContent = async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return res.status(404).json({ error: 'Content not found.' });
    }
    res.status(200).json({ message: 'Content deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content.' });
  }
};

module.exports = {
  createContent,
  getAllContents,
  getContentById,
  updateContent,
  deleteContent
};
