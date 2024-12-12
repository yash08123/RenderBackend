import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Form from './Form.js'; // Import model only

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/mydb`, {
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Form Backend</title>
      </head>
      <body>
        <h1>Welcome to the Form Sammy Backend!</h1>
        <p>Use the <code>/forms</code> endpoint to submit form data.</p>
        <p>Example POST request:</p>
        <pre>
          POST /forms
          {
            "questions": ["Naam ky hai aapka?", "Kaha tak padhe hai app?"],
            "headerImage": "https://example.com/image.png"
          }
        </pre>
      </body>
    </html>
  `);
});


app.post('/forms', async (req, res) => {
  try {
    const { questions, headerImage } = req.body;

    // Validation
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).send({ message: 'Questions must be an array' });
    }
    if (!headerImage || typeof headerImage !== 'string') {
      return res.status(400).send({ message: 'HeaderImage must be a string' });
    }

    const newForm = new Form({ questions, headerImage });
    await newForm.save();
    res.status(201).send(newForm);
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
