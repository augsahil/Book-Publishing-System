import { Router } from 'express'
import User from '../models/user.model'

const router = Router()

// LOGIN
router.post('/login', async (req, res) => {
  const { name, apiKey } = req.body

  const user = await User.findOne({ name, apiKey })
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  })
})

// ME
router.get('/me', async (req, res) => {
  const apiKey = req.headers['x-api-key'] as string
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' })
  }

  const user = await User.findOne({ apiKey })
  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' })
  }

  res.json({
    id: user._id,
    name: user.name,
    role: user.role,
  })
})

export default router
