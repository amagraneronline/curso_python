
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePythonCode(code: string, challenge: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza el siguiente código Python del alumno comparándolo con el desafío propuesto.
      
      Desafío: ${challenge}
      Código del alumno:
      \`\`\`python
      ${code}
      \`\`\`
      
      Proporciona:
      1. Una simulación de la salida (output) si se ejecutara.
      2. Feedback constructivo (¿está bien?, ¿cómo mejorar?).
      3. Un booleano indicando si cumple el objetivo del desafío.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            output: { type: Type.STRING, description: 'Simulación de la salida del terminal' },
            feedback: { type: Type.STRING, description: 'Consejos para el alumno' },
            isSuccess: { type: Type.BOOLEAN, description: 'True si el código resuelve el desafío' }
          },
          required: ['output', 'feedback', 'isSuccess']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error analyzing code with Gemini:", error);
    return {
      output: "Error al procesar el código.",
      feedback: "No se pudo conectar con el tutor de IA. Inténtalo de nuevo.",
      isSuccess: false
    };
  }
}
