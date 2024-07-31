import axios from "axios";

export const sendPostRequest = async (prompt) => {
    try
    {
        prompt = "act as a caption generator and give similar and catchy caption with respect to :-" + prompt + "and only give the caption no extra info needed";
    const response = await axios.post(
      "http://localhost:11434/api/generate/",
        {
            model: "llama3",
            prompt: prompt,
            stream:false
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was a problem with the axios operation:", error);
    throw error;
  }
};

