import type { Handler } from '@netlify/functions'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? ''

// Light style to detailed prompt mapping
const STYLE_PROMPTS: Record<string, string> = {
  'Christmas (Red & Green)': 'vibrant red and green LED lights along the roofline and eaves, classic Christmas color scheme with alternating red and green glowing bulbs',
  'Warm White Classic': 'elegant warm white LED lights along the roofline and eaves, soft golden-white glow creating a cozy and sophisticated look',
  'Halloween (Orange & Purple)': 'spooky orange and purple LED lights along the roofline and eaves, Halloween color scheme with glowing orange and deep purple lights',
  'Fourth of July (Red, White & Blue)': 'patriotic red, white, and blue LED lights along the roofline and eaves, Fourth of July color scheme with American flag colors glowing brightly',
  "Valentine's Day (Pink & Red)": 'romantic pink and red LED lights along the roofline and eaves, Valentine\'s Day color scheme with soft pink and deep red glowing lights',
  "St. Patrick's Day (Green)": 'festive bright green LED lights along the roofline and eaves, St. Patrick\'s Day color scheme with vivid emerald green glowing lights',
  'Easter (Pastel Rainbow)': 'cheerful pastel rainbow LED lights along the roofline and eaves, Easter color scheme with soft pastel pink, blue, yellow, and purple glowing lights',
  'Custom Color Party': 'multicolor LED lights along the roofline and eaves, vibrant rainbow of colors including red, orange, yellow, green, blue, and purple glowing lights',
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  if (!OPENAI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI API key not configured' }) }
  }

  let body: { imageData?: string; lightStyle?: string }
  try {
    body = JSON.parse(event.body ?? '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { imageData, lightStyle = 'Christmas (Red & Green)' } = body

  if (!imageData) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Image data is required' }) }
  }

  // Extract base64 data from data URL
  const base64Match = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/)
  if (!base64Match) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid image data format' }) }
  }

  const imageBase64 = base64Match[2]
  const lightDescription = STYLE_PROMPTS[lightStyle] ?? STYLE_PROMPTS['Christmas (Red & Green)']

  try {
    // Step 1: Use GPT-4o Vision to analyze the house
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'high',
                },
              },
              {
                type: 'text',
                text: `Analyze this house photo and describe it in detail for an image generation prompt. Include: architectural style, color of the house, roofline shape (gable, hip, flat, etc.), number of visible stories, presence of eaves/overhangs, garage if visible, and any notable architectural features. Be specific and concise. Format as a single descriptive paragraph suitable for DALL-E image generation. Do not include any commentary, just the description.`,
              },
            ],
          },
        ],
      }),
    })

    if (!visionResponse.ok) {
      const errText = await visionResponse.text()
      console.error('Vision API error:', visionResponse.status, errText)
      throw new Error(`Vision API error: ${visionResponse.status}`)
    }

    const visionData = await visionResponse.json()
    const houseDescription = visionData.choices?.[0]?.message?.content ?? 'a residential house'

    // Step 2: Generate the visualization with DALL-E 3
    const dallePrompt = `Photorealistic exterior photograph of ${houseDescription}. The house has ${lightDescription} installed along the entire roofline and eaves. The lights are glowing brightly and beautifully. It is nighttime or dusk, making the lights stand out dramatically. The lights are evenly spaced, professionally installed, and look stunning. The overall image should look like a real photograph, not a rendering. High quality, sharp, detailed, beautiful architectural photography.`

    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: dallePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        style: 'natural',
      }),
    })

    if (!dalleResponse.ok) {
      const errText = await dalleResponse.text()
      console.error('DALL-E API error:', dalleResponse.status, errText)
      throw new Error(`DALL-E API error: ${dalleResponse.status}`)
    }

    const dalleData = await dalleResponse.json()
    const imageUrl = dalleData.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('No image URL in DALL-E response')
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        imageUrl,
        houseDescription,
        lightStyle,
      }),
    }
  } catch (err) {
    console.error('Visualization error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to generate visualization', details: String(err) }),
    }
  }
}
