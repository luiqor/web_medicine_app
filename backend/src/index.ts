import cors from 'cors'
import path from 'path'
import { createConnection } from 'typeorm';
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { ProductEntity } from './entities/ProductEntity'
import express from 'express';
import { orderRouter } from './routers/orderRouter';
import bodyParser from 'body-parser'
import { OrderEntity } from './entities/OrderEntity';
import { OrderItemEntity } from './entities/OrderItemEntity';
import { Request, Response } from 'express';

createConnection({
  name: "default",
  type: "postgres",
  url: "postgres://szshjcgh:R4LjFJNoeA2qyZ6XQ1aWFtjQ0LOLgVh8@trumpet.db.elephantsql.com/szshjcgh", 
  synchronize: true,
  logging: true,
  entities: [ProductEntity, OrderEntity, OrderItemEntity]
})
.then(() => {
  console.log('Database connected')
})
.catch((error) => console.log(error))


const app = express()
app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173']
  })
)

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)
app.use('/api/create_order', orderRouter)
app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
})


const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})


