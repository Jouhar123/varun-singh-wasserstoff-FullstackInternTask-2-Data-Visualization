const Dashboard = require('./Dash-Schema');

exports.createDashboardEntry = async (req, res) => {
  try {
    const newEntry = new Dashboard(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'New entry created successfully', data: newEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating entry', error: error.message });
  }
};

exports.getDashboardEntries = async (req, res) => {
  try {
    const entries = await Dashboard.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving entries', error: error.message });
  }
};

exports.getDashboardEntriesWithFilters = async (req, res) => {
  try {
    // Initialize an empty filters object
    const filters = {};

    // Dynamically add filters based on query parameters
    if (req.query.end_year) filters.end_year = req.query.end_year;
    if (req.query.intensity) filters.intensity = parseInt(req.query.intensity);
    if (req.query.sector) filters.sector = req.query.sector;
    if (req.query.topic) filters.topic = req.query.topic;
    if (req.query.insight) filters.insight = req.query.insight;
    if (req.query.url) filters.url = req.query.url;
    if (req.query.region) filters.region = req.query.region;
    if (req.query.start_year) filters.start_year = req.query.start_year;
    if (req.query.impact) filters.impact = req.query.impact;
    if (req.query.added) filters.added = new Date(req.query.added);
    if (req.query.published) filters.published = new Date(req.query.published);
    if (req.query.country) filters.country = req.query.country;
    if (req.query.relevance) filters.relevance = parseInt(req.query.relevance);
    if (req.query.pestle) filters.pestle = req.query.pestle;
    if (req.query.source) filters.source = req.query.source;
    if (req.query.title) filters.title = req.query.title;
    if (req.query.likelihood) filters.likelihood = parseInt(req.query.likelihood);

    // Retrieve dashboard entries that match the filters
    const entries = await Dashboard.find(filters);
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving entries', error: error.message });
  }
};


// app.get('/api/analyze/:key', async (req, res) => {
  exports.getKeyval = async (req, res) => {
    const { key } = req.params;
  
    // Validate if the key is a valid field
    const validFields = [
      'end_year', 'intensity', 'sector', 'topic', 'insight', 'url',
      'region', 'start_year', 'impact', 'added', 'published', 'country',
      'relevance', 'pestle', 'source', 'title', 'likelihood'
    ];
    
    if (!validFields.includes(key)) {
      return res.status(400).json({ message: 'Invalid key' });
    }
  
    try {
      // Use aggregation to get unique values for the specified key
      const uniqueValues = await Dashboard.aggregate([
        {
          $group: {
            _id: null,
            uniqueValues: { $addToSet: `$${key}` } 
          }
        },
        {
          $project: {
            _id: 0,
            uniqueValues: 1 
          }
        }
      ]);
  
      res.json(uniqueValues[0] ? uniqueValues[0].uniqueValues : []); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving unique values' });
    }
  };
  