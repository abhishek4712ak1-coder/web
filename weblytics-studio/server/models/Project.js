import mongoose from 'mongoose';
import slugify from 'slugify';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    industry: { type: String, required: true },
    technologies: [{ type: String }],
    featuredImage: { type: String, default: '' },
    gallery: [{ type: String }],
    projectUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Demo', 'Concept', 'Case Study', 'Live'],
      default: 'Demo',
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
