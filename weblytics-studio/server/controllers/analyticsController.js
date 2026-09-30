import Lead from '../models/Lead.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';

export const getAnalyticsSummary = async (req, res) => {
  const monthlyLeads = await Lead.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const leadsByService = await Lead.aggregate([
    { $group: { _id: '$serviceRequired', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const projectCategories = await Project.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const services = await Service.find({ active: true }).limit(10).sort({ order: 1 });

  res.json({
    monthlyLeads,
    leadsByService,
    projectCategories,
    services,
  });
};
