import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function analyzeText(prompt: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
        });

        return response.choices[0].message.content || 'No analysis available';
    } catch (error) {
        console.error("Error analyzing text:", error);
        throw new Error("Failed to analyze text");
    }
}
