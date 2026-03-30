import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DailyMealPlan, WorkoutPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";

export const generateMealPlan = async (profile: UserProfile): Promise<DailyMealPlan> => {
  const prompt = `Generate a healthy, single-day diet plan for a person with the following profile:
  - Age: ${profile.age}
  - Height: ${profile.height}cm
  - Current Weight: ${profile.weight}kg
  - Target Weight: ${profile.targetWeight}kg
  - Gender: ${profile.gender}
  - Activity Level: ${profile.activityLevel}
  - Dietary Restrictions: ${profile.dietaryRestrictions || "None"}

  The goal is weight loss. Include calorie counts and macros. Return JSON.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          daySummary: { type: Type.STRING, description: "A brief motivational summary of today's nutrition strategy." },
          totalCalories: { type: Type.NUMBER },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, description: "Breakfast, Lunch, Dinner, or Snack" },
                name: { type: Type.STRING, description: "Name of the dish" },
                calories: { type: Type.NUMBER },
                protein: { type: Type.STRING, description: "e.g., 20g" },
                carbs: { type: Type.STRING, description: "e.g., 40g" },
                fat: { type: Type.STRING, description: "e.g., 10g" },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate meal plan");
  }

  return JSON.parse(response.text) as DailyMealPlan;
};

export const generateWorkoutPlan = async (profile: UserProfile): Promise<WorkoutPlan> => {
  const prompt = `Create a workout routine for today for a person with these stats:
  - Weight: ${profile.weight}kg
  - Activity Level: ${profile.activityLevel}
  
  Focus on fat burning and strength maintenance. Return JSON.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          focusArea: { type: Type.STRING, description: "e.g., Full Body, HIIT, Cardio" },
          difficulty: { type: Type.STRING },
          estimatedDuration: { type: Type.STRING },
          warmup: { type: Type.STRING },
          cooldown: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING },
                duration: { type: Type.STRING, description: "If applicable, e.g., 30 sec" },
                notes: { type: Type.STRING, description: "Form tips" }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate workout plan");
  }

  return JSON.parse(response.text) as WorkoutPlan;
};

export const chatWithAi = async (message: string, context: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: `Context: You are a helpful, encouraging weight loss coach. User profile context: ${context}.
    
    User Question: ${message}`,
  });
  
  return response.text || "Sorry, I couldn't formulate a response right now.";
};
