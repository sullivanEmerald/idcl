import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accountNumber = searchParams.get('account_number');
    const bankCode = searchParams.get('bank_code');

    if (!accountNumber || !bankCode) {
      return NextResponse.json(
        { error: 'Account number and bank code are required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET}`
        }
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error validating account:', error);
    return NextResponse.json(
      { error: 'Failed to validate account' },
      { status: 500 }
    );
  }
}