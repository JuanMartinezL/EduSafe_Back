import Report from '../models/Report.js';

export const createReport = async (req, res) => {
  const { description, type_report, anonimo } = req.body;
  try {
    const report = new Report({
      description,
      type_report,
      reporting_user_id: req.user.id,
      anonimo,
    });
    await report.save();
    res.status(201).json({ message: 'Reporte creado exitosamente👍' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reporting_user_id');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
