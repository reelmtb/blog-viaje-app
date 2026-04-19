import { NextRequest, NextResponse } from 'next/server';
import { joinTrip } from '@/features/trips/trips';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  console.log("SERVER LOG TEST: " + Date.now())
  try {
    const { code } = await params;
    const body = await req.json();
    console.log('code:', code);
    console.log('Request body:', body);

    const result = await joinTrip({
      code,
      user_id: body.user_id,
      destinations: body.destinations,
      availabilities: body.availabilities?.map((a: { start_date: string; end_date: string }) => ({
        start_date: new Date(a.start_date),
        end_date: new Date(a.end_date),
      })),
      max_cost: body.max_cost,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log('Error joining trip:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message === 'Trip not found' ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
