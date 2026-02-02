import { NextRequest, NextResponse } from 'next/server';
import { createTrip } from '@/features/trips/trips';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const trip = await createTrip(body);
    return NextResponse.json(trip);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}