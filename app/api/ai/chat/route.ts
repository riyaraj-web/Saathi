import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const systemPrompt = `You are Saathi, a compassionate AI companion for elderly people in India. 
    You speak with warmth, respect, and patience. You understand that your users may:
    - Have limited tech experience
    - Value traditional wisdom and family connections
    - May feel lonely or isolated
    - Need encouragement and emotional support
    
    Your role is to:
    - Provide companionship and emotional support
    - Help with daily wellness check-ins
    - Remind about medicines gently
    - Suggest meaningful activities
    - Encourage family connections
    - Share uplifting thoughts and wisdom
    
    Always respond in simple, clear language. Be warm, respectful, and encouraging.
    Keep responses concise (2-3 sentences) unless asked for more detail.
    
    User context: ${JSON.stringify(context)}`

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Namaste! I am Saathi, your caring companion. I am here to listen, support, and help you stay healthy and connected. How can I help you today?' }],
        },
      ],
    })

    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      message: text,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    )
  }
}
