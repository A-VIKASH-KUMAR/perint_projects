const express = require('express');
const cors = require('cors');
const app = express()
const port = 3001
const corsOptions = {
  origin: 'http://localhost:1234',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}
app.use(cors(corsOptions))
app.use(express.json())
const productRoute = require("./src/routes/product.routes")
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/product",productRoute)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})