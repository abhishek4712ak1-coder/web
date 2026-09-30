import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Solution from '../models/Solution.js';
import FAQ from '../models/FAQ.js';
import Testimonial from '../models/Testimonial.js';
import Blog from '../models/Blog.js';

export const getServices = async (req, res) => {
  const services = await Service.find({ active: true }).sort({ order: 1, createdAt: -1 });
  res.json({ services });
};

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ service, message: 'Service created successfully.' });
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) return res.status(404).json({ message: 'Service not found.' });
  res.json({ service, message: 'Service updated successfully.' });
};

export const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found.' });
  res.json({ message: 'Service deleted successfully.' });
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ published: true }).sort({ createdAt: -1 });
  res.json({ projects });
};

export const getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ projects });
};

export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ project, message: 'Project created successfully.' });
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) return res.status(404).json({ message: 'Project not found.' });
  res.json({ project, message: 'Project updated successfully.' });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  res.json({ message: 'Project deleted successfully.' });
};

export const getSolutions = async (req, res) => {
  const solutions = await Solution.find().sort({ createdAt: -1 });
  res.json({ solutions });
};

export const createSolution = async (req, res) => {
  const solution = await Solution.create(req.body);
  res.status(201).json({ solution, message: 'Solution created successfully.' });
};

export const updateSolution = async (req, res) => {
  const solution = await Solution.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!solution) return res.status(404).json({ message: 'Solution not found.' });
  res.json({ solution, message: 'Solution updated successfully.' });
};

export const deleteSolution = async (req, res) => {
  const solution = await Solution.findByIdAndDelete(req.params.id);
  if (!solution) return res.status(404).json({ message: 'Solution not found.' });
  res.json({ message: 'Solution deleted successfully.' });
};

export const getFAQs = async (req, res) => {
  const faqs = await FAQ.find({ active: true }).sort({ order: 1, createdAt: -1 });
  res.json({ faqs });
};

export const createFAQ = async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ faq, message: 'FAQ created successfully.' });
};

export const updateFAQ = async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!faq) return res.status(404).json({ message: 'FAQ not found.' });
  res.json({ faq, message: 'FAQ updated successfully.' });
};

export const deleteFAQ = async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) return res.status(404).json({ message: 'FAQ not found.' });
  res.json({ message: 'FAQ deleted successfully.' });
};

export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
  res.json({ testimonials });
};

export const createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ testimonial, message: 'Testimonial created successfully.' });
};

export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found.' });
  res.json({ testimonial, message: 'Testimonial updated successfully.' });
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found.' });
  res.json({ message: 'Testimonial deleted successfully.' });
};

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 });
  res.json({ blogs });
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ blogs });
};

export const createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ blog, message: 'Blog created successfully.' });
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) return res.status(404).json({ message: 'Blog not found.' });
  res.json({ blog, message: 'Blog updated successfully.' });
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found.' });
  res.json({ message: 'Blog deleted successfully.' });
};
