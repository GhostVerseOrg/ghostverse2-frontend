export async function POST(req: Request) {
  const body = await req.json();

  return new Response(
    JSON.stringify({ hello_your_data_is_this: 'raw -> : ' + body.name }),
    {
      status: 200,
    },
  );
}
