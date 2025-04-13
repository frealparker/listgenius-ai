import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a Depop and eBay listing expert. Generate catchy titles, descriptions, and tags.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  });

  res.status(200).json({ listing: completion.data.choices[0].message.content });
}
