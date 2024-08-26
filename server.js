const { configDotenv } = require('dotenv');
const express = require('express');
const app = express();
configDotenv()


app.use(express.json());
app.use(express.static('public'))

const port = process.env.PORT || 5000

app.post('/home', (req, res) => {
  const { startTime, endTime, text } = req.body
  if (!startTime || !endTime || !text) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const typingSpeed = calculateTypingSpeed(startTime, endTime, text.length)
  res.json({ typingSpeed });
});

function calculateTypingSpeed(startTime, endTime, textLength) {
  const timeTaken = (endTime - startTime) / 1000;
  const speed = (textLength / timeTaken) * 60; 
  return speed.toFixed(2);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
