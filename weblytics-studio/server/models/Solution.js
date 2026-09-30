import mongoose from 'mongoose';
import slugify from 'slugify';

const solutionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    industry: { type: String, required: true },
    description: { type: String, required: true },
    services: [{ type: String }],
    image: { type: String, default: '' },
    benefits: [{ type: String }],
  },
  { timestamps: true }
);

solutionSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Solution = mongoose.model('Solution', solutionSchema);
export default Solution;
