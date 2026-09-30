import Lead from '../models/Lead.js';
import { sendLeadEmails } from '../services/emailService.js';

const createLeadAndNotify = async (leadData) => {
  const lead = await Lead.create(leadData);

  try {
    const results = await sendLeadEmails(lead);
    results.forEach((result) => {
      if (result.status === 'rejected') {
        console.error('Lead email delivery failed:', result.reason.message);
      }
    });
  } catch (error) {
    console.error('Lead email delivery is not configured:', error.message);
  }

  return lead;
};

export const submitLead = async (req, res) => {
  const { name, businessName, email, phone, serviceRequired, budget, projectDescription } = req.body;

  const lead = await createLeadAndNotify({
    name,
    businessName,
    email,
    phone,
    serviceRequired,
    budget,
    projectDescription,
  });


  res.status(201).json({
    message: 'Your enquiry has been submitted successfully.',
    lead,
  });
};

export const getLeads = async (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (status && status !== 'All') {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { businessName: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Lead.countDocuments(filter);
  const leads = await Lead.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  res.json({ leads, total, page: Number(page), pages: Math.ceil(total / Number(limit)) || 1 });
};

export const updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!lead) return res.status(404).json({ message: 'Lead not found.' });

  res.json({ lead, message: 'Lead updated successfully.' });
};

export const deleteLead = async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found.' });
  res.json({ message: 'Lead deleted successfully.' });
};

export const getLeadStats = async (req, res) => {
  const totalLeads = await Lead.countDocuments();
  const newLeads = await Lead.countDocuments({ status: 'New' });
  const totalProjects = await (await import('../models/Project.js')).default.countDocuments();
  const publishedProjects = await (await import('../models/Project.js')).default.countDocuments({ published: true });
  const totalServices = await (await import('../models/Service.js')).default.countDocuments();
  const totalSolutions = await (await import('../models/Solution.js')).default.countDocuments();

  const leadsByService = await Lead.aggregate([
    { $group: { _id: '$serviceRequired', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
  const recentProjects = await (await import('../models/Project.js')).default.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    totalLeads,
    newLeads,
    totalProjects,
    publishedProjects,
    totalServices,
    totalSolutions,
    leadsByService,
    recentLeads,
    recentProjects,
  });
};

export const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const lead = await createLeadAndNotify({
    name,
    email,
    serviceRequired: subject || 'General enquiry',
    projectDescription: message,
    source: 'Website contact form',
  });

  res.status(201).json({ lead, message: 'Message received successfully.' });
};
