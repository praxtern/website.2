export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { name, phone, message } = req.body || {}
    const accessKey = process.env.WEB3FORMS_KEY
    if (!accessKey) return res.status(500).json({ error: 'Missing server key' })

    const payload = {
      access_key: accessKey,
      subject: 'Japan Tours inquiry',
      name,
      phone,
      message,
      redirect: '',
    }

    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await r.json()
    if (r.ok && data.success) return res.status(200).json({ success: true })
    return res.status(502).json({ success: false, upstream: data })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: (err && err.message) || err })
  }
}
