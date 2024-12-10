const express = require('express');
const cors = require('cors');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

app.post('/api/generate-story', async (req, res) => {
  try {
    const { title } = req.body;
    
    const prompt = `Generate a short, imaginative story (around 50-100 words) about ${title}. 
    The story should be creative, engaging, and have a touch of magic or wonder.`;

    const input = {
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    };

    const command = new InvokeModelCommand(input);
    const response = await bedrock.send(command);
    
    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const story = responseBody.content[0].text;

    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
