import Resource from '../models/Resource.js';

// Obtener recursos educativos
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('user_id', 'name email');
    res.json(resources);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ error: error.message });
  }
};

// Crear recurso educativo
export const createResource = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: 'Título y descripción son requeridos' });
    }

    const resource = new Resource({
      title,
      description,
      user_id: req.user.id,
    });

    await resource.save();
    res.status(201).json({ message: 'Recurso creado exitosamente', resource });
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ error: error.message });
  }
};
