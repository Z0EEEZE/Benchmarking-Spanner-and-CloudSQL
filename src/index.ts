import express from 'express';
import { AppDataSource } from './data-source';
import { Product } from './entity/product';
import { Order } from './entity/order';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established!");
    })
    .catch((error) => console.log("DB Error:", error));

// READ function: Get a product by its ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneBy({ product_id: req.params.id });
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// WRITE function: Update an order's quantity
app.put('/orders/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        if (typeof quantity !== 'number') {
            return res.status(400).send('Invalid quantity provided');
        }

        const order = await Order.findOneBy({ order_id: req.params.id });

        if (order) {
            order.quantity = quantity;
            await order.save();
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
