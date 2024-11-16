import Report from '../models/Report.js';



// Crear reporte
export const createReport = async (req, res) => {
  const { description, type_report, anonimo } = req.body;

  try {
    if (!description || !type_report) {
      return res.status(400).json({ message: 'Descripción y tipo de reporte son requeridos' });
    }

    const report = new Report({
      description,
      type_report,
      reporting_user_id: req.user.id,
      anonimo,
    });

    await report.save();
    res.status(201).json({ message: 'Reporte creado exitosamente', report });
  } catch (error) {
    console.error('Error al crear reporte:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener reportes
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reporting_user_id', 'name email');
    res.json(reports);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: error.message });
  }
};
// Obtener un reporte por ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.json(report);
  } catch (error) {
    console.error('Error al obtener reporte por ID:', error);
    res.status(500).json({ message: 'Error al obtener reporte' });
  }
};

// Actualizar estado de un reporte
export const updateReportStatus = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del reporte desde la URL
  const { status } = req.body; // Obtiene el nuevo estado desde el cuerpo de la solicitud

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    // Actualizar el estado del reporte
    report.status = status;
    await report.save();

    res.json({ message: 'Estado del reporte actualizado correctamente', report });
  } catch (err) {
    console.error('Error al actualizar estado del reporte:', err);
    res.status(500).json({ message: 'Error al actualizar estado del reporte' });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    console.error('Error al obtener todos los reportes:', error);
    res.status(500).json({ message: 'Error al obtener todos los reportes' });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const userId = req.user.id; // El ID del usuario autenticado (asegúrate de que `req.user` esté correctamente poblado)
    const reports = await Report.find({ createdBy: userId }); // Encuentra los reportes creados por este usuario
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error al obtener los reportes del usuario:', error);
    res.status(500).json({ message: 'Error al obtener los reportes del usuario' });
  }
};

