import { NextRequest, NextResponse } from 'next/server';
import { createTrip } from '@/features/trips/trips';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const trip = await createTrip(body);
    return NextResponse.json(trip);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}