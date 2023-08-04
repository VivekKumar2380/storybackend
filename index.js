const express = require('express');
const axios = require('axios');
const cors = require("cors")
const app = express();
app.use(cors())
const port = 5000;

const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());

app.post('/generate-story', async (req, res) => {
  try {
    const { genre } = req.body;
    const prompt = `Once upon a time in a ${genre} far away, there was a...`;
    
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt,
        max_tokens: 200,
        n: 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedStory = response.data.choices[0].text.trim();
    res.send({ story: generatedStory });
  } catch (error) {
    console.error('Error generating the story:', error);
    res.status(500).send('Error generating the story');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
