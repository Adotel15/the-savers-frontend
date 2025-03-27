import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const getPrompt = () => {
  return `
  Act as an expert in schedule optimization for physical retail stores and generate a recommendation system based on foot traffic data. You will receive an array of objects indicating the store's opening hours and the foot traffic for each time slot (possible values: "low", "medium", "high"). Generate at least 3 optimal time slots for customers to pick up their orders, prioritizing slots with lower foot traffic while balancing recommendations across the day.
  
  Your output must:
  1. Be a valid JSON array of objects.
  2. Each object must only have two properties: "hour" (string) and "recommended" (boolean).
  3. Include all the hours from the input array.
  4. Do not provide any explanation, text, or code other than the JSON array.
  
  Example Input:
  [
    { "hour": "8:00 AM", "affluence": "medium" },
    { "hour": "9:00 AM", "affluence": "low" },
    { "hour": "10:00 AM", "affluence": "high" }
  ]
  
  Example Output:
  [
    { "hour": "8:00 AM", "recommended": false },
    { "hour": "9:00 AM", "recommended": true },
    { "hour": "10:00 AM", "recommended": false }
  ]
    `.trim();
};

const mockStores = {
  ["0548"]: [
    { hour: "09:00", affluenceLevel: "low" },
    { hour: "10:00", affluenceLevel: "low" },
    { hour: "11:00", affluenceLevel: "low" },
    { hour: "12:00", affluenceLevel: "low" },
    { hour: "13:00", affluenceLevel: "medium" },
    { hour: "14:00", affluenceLevel: "medium" },
    { hour: "15:00", affluenceLevel: "medium" },
    { hour: "16:00", affluenceLevel: "medium" },
    { hour: "17:00", affluenceLevel: "high" },
    { hour: "18:00", affluenceLevel: "high" },
    { hour: "19:00", affluenceLevel: "high" },
    { hour: "20:00", affluenceLevel: "high" },
  ],
};

const getStoreData = (storeId) => {
  // TODO: This function calls google analytics to get the store data in realtime
  return mockStores[storeId];
};

const constructPrompt = (shopSchedule) => {
  return `${getPrompt()}\nInput data:${JSON.stringify(shopSchedule)}`;
};

export const handler = async (event) => {
  const client = new BedrockRuntimeClient({ region: "us-east-1" });

  const storeId = event.queryStringParameters?.storeId;
  const shopSchedule = getStoreData(storeId);

  const prompt = constructPrompt(shopSchedule);

  try {
    const command = new InvokeModelCommand({
      modelId: "meta.llama3-8b-instruct-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    const response = await client.send(command);
    const responseString = new TextDecoder().decode(response.body);
    if (!responseString) throw new Error("No response from model");

    const generationContent = JSON.parse(responseString).generation;
    if (!generationContent) throw new Error("No response from model");

    const splitOutput = generationContent.split("Output JSON:")[1].trim();
    const endIndex = splitOutput.indexOf("]") + 1;
    const formattedData = splitOutput.substring(0, endIndex);

    return {
      statusCode: 200,
      body: formattedData,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
