const express = require('express');
const axios = require('axios');
const router = express.Router();

router.use(express.json({
  limit: '10mb',
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf.toString(encoding));
    } catch (err) {
      res.status(400).json({ error: 'Invalid JSON payload' });
      throw new Error('Invalid JSON payload');
    }
  },
}));

router.post('/upload-data', async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);

    const apiResponse = await axios.post('http://localhost:3000/api/posts', formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response from API:', apiResponse.data);

    return res.status(apiResponse.status).json(apiResponse.data);

  } catch (error) {
    console.error('Error uploading data:', error);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data.error || 'Error from API',
        details: error.response.data,
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
