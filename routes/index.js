import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main/index');
});

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get('/users', async (req, res) => {
  try {
    // Use the Axios instance attached to the request object
    const response = await req.axiosMiddleware.get('/users', {
      headers: {
        Accept: 'application/json', // Explicitly accept JSON
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
