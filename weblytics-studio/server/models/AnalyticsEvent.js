import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    page: { type: String, default: '' },
    label: { type: String, default: '' },
    metadata: { type: Object, default: {} },
    sessionId: { type: String, default: '' },
  },
  { timestamps: true }
);

analyticsEventSchema.index({ createdAt: -1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);
export default AnalyticsEvent;
