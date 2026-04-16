export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [parseInt(process.env.BREVO_LIST_ID, 10)],
      updateEnabled: true,
    }),
  });

  if (response.ok || response.status === 204) {
    return res.status(200).json({ ok: true });
  }

  const data = await response.json().catch(() => ({}));
  if (response.status === 400 && data.code === 'duplicate_parameter') {
    return res.status(200).json({ ok: true, duplicate: true });
  }

  return res.status(500).json({ error: data.message || 'Unknown error' });
}
