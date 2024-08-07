import axios from "axios";

export const generateCaption = async (caption, task) => {
  try {
    var prompt =
      `Modify the caption to ${task}: ${caption}. Respond with only the modified caption and nothing else.`;
    
    console.log("Data passed to the AI:- ", prompt);
    const response = await axios.post(
      "http://localhost:3002/api/ai/generateCaption",
      {
        prompt: prompt,
      }
    );
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("There was a problem with the axios operation:", error);
    throw error;
  }
};


