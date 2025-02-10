import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function analyzeText(text: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Analyze the following README content." }, { role: "user", content: text }],
            max_tokens: 150,
          });

        return response.choices[0].message.content || 'No analysis available';
    } catch (error) {
        console.error("Error analyzing text:", error);
        throw new Error("Failed to analyze text");
    }
}
