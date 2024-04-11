const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
api_key = process.env.API_KEY


app.get('/search', async (req, res) => {

        const { filter, page } = req.query;

        console.log(filter, page);

        const url = `https://api.themoviedb.org/3/` + filter;
        const params = { api_key, page };
        console.log(url);
        console.log(params);

        try {
            const response = await axios.get(url, { params });
            console.log(response.data);
            res.json(response.data);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error fetching data from TMDB' });
        }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
