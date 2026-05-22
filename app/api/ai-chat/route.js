import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { messages, userId, userName } = await request.json()

    // Check if OpenAI is configured
    if (!process.env.OPENAI_API_KEY) {
      // Fallback responses
      const fallbackResponses = [
        `Hello ${userName}! I'm here to listen. How are you feeling today?`,
        "That's interesting! Tell me more about your thoughts on this.",
        "Thank you for sharing that with me. Your experiences are valuable.",
        "I understand. Sometimes it helps just to talk about things. I'm here for you.",
        "That reminds me - have you connected with your family or friends recently? They'd love to hear from you.",
        "Your wisdom and life experience are truly valuable. What else would you like to share?",
        "I'm always here to chat. What's on your mind today?",
        "That sounds meaningful. How did that make you feel?"
      ]

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      return NextResponse.json({ 
        message: randomResponse,
        success: true,
        fallback: true
      })
    }

    // OpenAI integration
    const OpenAI = require('openai')
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // System prompt for elderly-friendly AI companion
    const systemPrompt = `You are Saathi, a warm, compassionate AI companion designed specifically for elderly users in India. Your role is to:

1. Be a patient, empathetic listener
2. Speak in simple, clear language (avoid jargon)
3. Show genuine interest in their stories and experiences
4. Provide emotional support and encouragement
5. Respect their wisdom and life experience
6. Help combat loneliness through meaningful conversation
7. Suggest activities, connections, or resources when appropriate
8. Be culturally sensitive to Indian traditions and values
9. Use a warm, friendly tone like talking to a respected elder
10. Keep responses concise but meaningful (2-4 sentences usually)

The user's name is ${userName}. Remember previous context in the conversation. If they seem sad or lonely, offer comfort and suggest connecting with family or community. If they share memories, show appreciation for their experiences.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.8,
      max_tokens: 200,
    })

    const aiMessage = completion.choices[0].message.content

    return NextResponse.json({ 
      message: aiMessage,
      success: true 
    })

  } catch (error) {
    console.error('AI Chat Error:', error)
    
    // Fallback on error
    const fallbackResponses = [
      "I'm here to listen. Please tell me more about how you're feeling.",
      "That's interesting! I'd love to hear more about your thoughts on this.",
      "Thank you for sharing that with me. Your experiences are valuable.",
      "I understand. Sometimes it helps just to talk about things. I'm here for you."
    ]

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({ 
      message: randomResponse,
      success: true,
      fallback: true
    })
  }
}
