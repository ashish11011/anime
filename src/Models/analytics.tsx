// models/Analytics.js
import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  url: String,
  referrer: String,
  deviceType: String,
  ip: String, // Store IP address
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AnalyticsModel =
  mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);

export default AnalyticsModel;
