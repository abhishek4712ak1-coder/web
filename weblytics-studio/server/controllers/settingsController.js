import WebsiteSettings from '../models/WebsiteSettings.js';

export const getWebsiteSettings = async (req, res) => {
  let settings = await WebsiteSettings.findOne();

  if (!settings) {
    settings = await WebsiteSettings.create({});
  }

  res.json({ settings });
};

export const updateWebsiteSettings = async (req, res) => {
  const settings = await WebsiteSettings.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  res.json({ settings, message: 'Website settings updated successfully.' });
};
