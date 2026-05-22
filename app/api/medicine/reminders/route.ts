import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Medicine from '@/models/Medicine'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const medicines = await Medicine.find({ userId, active: true })
      .sort({ nextDoseTime: 1 })
      .lean()

    return NextResponse.json({ medicines })
  } catch (error) {
    console.error('Get Medicines Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medicines' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const data = await request.json()
    const medicine = await Medicine.create(data)

    return NextResponse.json({ medicine }, { status: 201 })
  } catch (error) {
    console.error('Create Medicine Error:', error)
    return NextResponse.json(
      { error: 'Failed to create medicine reminder' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB()
    
    const { medicineId, taken, takenAt } = await request.json()
    
    const medicine = await Medicine.findByIdAndUpdate(
      medicineId,
      {
        $push: {
          history: {
            takenAt: takenAt || new Date(),
            taken,
          },
        },
        lastTaken: taken ? new Date() : undefined,
      },
      { new: true }
    )

    return NextResponse.json({ medicine })
  } catch (error) {
    console.error('Update Medicine Error:', error)
    return NextResponse.json(
      { error: 'Failed to update medicine' },
      { status: 500 }
    )
  }
}
