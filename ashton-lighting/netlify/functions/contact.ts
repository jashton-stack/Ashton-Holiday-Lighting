import type { Handler } from '@netlify/functions'

const GHL_API_KEY     = 'pit-0bef9f8d-3517-4695-b692-48e2994921b6'
const GHL_LOCATION_ID = 'tlHhUo40JX0SwVD1xPZ2'

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let body: Record<string, string>
  try {
    body = JSON.parse(event.body ?? '{}')
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { firstName, lastName, email, phone, interest, message } = body

  if (!firstName || !email) {
    return { statusCode: 400, body: 'First name and email are required' }
  }

  try {
    const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName,
        lastName,
        email,
        phone,
        source: 'Website Contact Form',
        tags: ['website-lead'],
        customFields: [
          { key: 'interest', field_value: interest ?? '' },
          { key: 'message',  field_value: message  ?? '' },
        ],
      }),
    })

    if (res.ok || res.status === 201) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) }
    } else {
      const text = await res.text()
      console.error('GHL error:', res.status, text)
      return { statusCode: 500, body: 'GHL API error' }
    }
  } catch (err) {
    console.error('Fetch error:', err)
    return { statusCode: 500, body: 'Internal server error' }
  }
}
