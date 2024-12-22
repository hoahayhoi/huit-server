const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const auth = require('./src/middleware/auth')
const apiRoutes = require('./src/routes')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


app.use(
  cors({
    origin: ['http://localhost:3000', 'https://huit-client.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
)

app.options('*', cors())

const port = process.env.PORT || 8080

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

app.use(auth)
app.use('/api/v1', apiRoutes)
// Đặt giới hạn tối đa cho JSON payload

app.listen(port, () => {
  console.log(`Server is running on port ${port} with cors enable`)
})
