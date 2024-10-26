    import Resource from '../models/Resource.js';


    export const getResources = async (req, res) => {
        try {
        const resources = await Resource.find();
        res.json(resources);
     }catch (error) {
        res.status(500).json({ error: error.message });
        }
    };

    export const createResource = async (req, res) => {
        const { title, description } = req.body;
        try {
        const resource = new Resource({
            title,
            description,
            user_id: req.user.id,
        });
        await resource.save();
        res.status(201).json({ message: 'Recurso creado exitosamente' });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    };
