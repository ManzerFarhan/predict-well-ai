
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client with your API key
const genAI = new GoogleGenerativeAI('AIzaSyDzLWIPFPesO-mW81myJNBdEbQGuY6dJVk');

export const getGeminiResponse = async (message: string): Promise<string> => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate content based on the user's message
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Sorry, there was an error processing your request.';
  }
};
