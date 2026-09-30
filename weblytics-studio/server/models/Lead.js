import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    businessName: { type: String, default: '' },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    serviceRequired: { type: String, required: true },
    budget: { type: String, default: '' },
    projectDescription: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'In Progress', 'Converted', 'Closed', 'Lost'],
      default: 'New',
    },
    notes: { type: String, default: '' },
    source: { type: String, default: 'Website form' },
  },
  { timestamps: true }
);

leadSchema.index({ email: 1, createdAt: -1 });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
