import type { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let body: { image?: string; mimeType?: string; style?: string; density?: string }
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { image, mimeType = 'image/jpeg', style = 'warm-white', density = 'full' } = body

  if (!image) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No image provided' }) }
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'AI service not configured. Please add your GEMINI_API_KEY to Netlify environment variables.',
      }),
    }
  }

  const styleDescriptions: Record<string, string> = {
    'warm-white':  'warm white LED lights with a soft golden-white glow',
    'cool-white':  'cool crisp white LED lights with a bright icy-white glow',
    'multicolor':  'vibrant multicolor LED lights cycling through red, green, blue, and gold',
    'red-green':   'classic Christmas red and green LED lights alternating along the roofline',
    'blue-white':  'elegant blue and white LED lights creating a winter wonderland effect',
  }
  const densityDescriptions: Record<string, string> = {
    'full':    'full roofline coverage with lights along every eave, gutter, and fascia board',
    'accent':  'accent lighting highlighting the peak of the roof and main architectural features only',
    'outline': 'complete outline of the entire home including roofline, windows, and doorway',
  }

  const lightStyle = styleDescriptions[style] || styleDescriptions['warm-white']
  const lightDensity = densityDescriptions[density] || densityDescriptions['full']

  const prompt = `You are a professional photo editor. Edit this home exterior photo to add permanent holiday LED lighting.

Add ${lightStyle} installed as ${lightDensity}.

Requirements:
- The lights must look like professionally installed commercial-grade permanent LED strip lights
- Mount the lights on the roofline, eaves, and fascia boards
- Make the lights glow realistically as if photographed at dusk or early evening
- The lighting effect should be photorealistic, not cartoon-like or illustrated
- Keep the home, landscaping, sky, and all other elements exactly the same
- Only add the lights and their natural glow/reflection on the home exterior
- The result must look like a real photograph taken after professional installation

Output a photorealistic edited version of the home with the holiday lights installed.`

  try {
    // Primary: Gemini 2.0 Flash with image generation (Nano Banana Pro)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: image,
                  },
                },
                { text: prompt },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            temperature: 1,
            topP: 0.95,
            topK: 40,
          },
        }),
      }
    )

    if (response.ok) {
      const data = await response.json()
      const parts = data?.candidates?.[0]?.content?.parts || []
      for (const part of parts) {
        if (part.inline_data?.data) {
          const imgMime = part.inline_data.mime_type || 'image/png'
          const imageUrl = `data:${imgMime};base64,${part.inline_data.data}`
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl, model: 'Nano Banana Pro (Gemini 2.0 Flash)' }),
          }
        }
      }
    }

    // Fallback: Imagen 3 with image editing
    const imagen3Response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-capability-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [
            {
              prompt,
              referenceImages: [
                {
                  referenceType: 'REFERENCE_TYPE_RAW',
                  referenceId: 1,
                  referenceImage: {
                    bytesBase64Encoded: image,
                    mimeType,
                  },
                },
              ],
            },
          ],
          parameters: {
            sampleCount: 1,
            aspectRatio: '1:1',
            safetyFilterLevel: 'block_few',
            personGeneration: 'allow_adult',
          },
        }),
      }
    )

    if (imagen3Response.ok) {
      const data = await imagen3Response.json()
      const imageData = data?.predictions?.[0]?.bytesBase64Encoded
      if (imageData) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageUrl: `data:image/png;base64,${imageData}`,
            model: 'Imagen 3',
          }),
        }
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'AI generation failed. Please try again or contact us directly for a free consultation.',
      }),
    }
  } catch (err) {
    console.error('Visualization error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'AI generation encountered an error. Please try again.',
      }),
    }
  }
}

export { handler }
