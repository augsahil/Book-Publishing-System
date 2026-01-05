import { connectDB } from './db/mongoose'
import User from './models/user.model'

connectDB().then(async () => {
  await User.deleteMany()
  await User.create([
    { name: 'Admin', role: 'admin', apiKey: 'admin123' },
    { name: 'Reviewer', role: 'reviewer', apiKey: 'reviewer123' },
  ])
  console.log('Seeded users')
  process.exit(0)
})
