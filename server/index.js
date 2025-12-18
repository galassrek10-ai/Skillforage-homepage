import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-preview-09-2025'
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

app.post('/api/generate', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY in environment' })

    const model = req.body.model || GEMINI_MODEL
    const url = `${API_BASE}/${model}:generateContent?key=${apiKey}`

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body.payload || req.body)
    })

    const data = await resp.json()
    return res.status(resp.status || 200).json(data)
  } catch (e) {
    console.error('Proxy error', e)
    return res.status(500).json({ error: e.message })
  }
})

app.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}`)
})
