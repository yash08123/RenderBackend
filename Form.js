import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  questions: { type: Array, required: true }, // Add validation
  headerImage: { type: String, required: true },
});

const Form = mongoose.model('Form', formSchema);

export default Form; // Export the model
