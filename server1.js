import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google's Generative AI module
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/chatbot1/backend',async(req,res)=>{
    console.log(req.body.history)
    console.log(req.body.message)   
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const chat=model.startChat({
        history:req.body.chatHistory,
    })
    const msg=req.body.message
    const result= await chat.sendMessage(msg)
    const response= await result.response
    const text=response.text()

    res.send(text)
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
