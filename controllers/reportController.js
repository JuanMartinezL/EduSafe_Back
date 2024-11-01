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
