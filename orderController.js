const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const razorpay = new Razorpay({
    key_id: 'rzp_test_9qr0yuIvVRsWmo',
    key_secret: 'xxx'
});

const OrderController = {
    createOrder: (req, res) => {
        const userId = req.userId;
        const options = {
            amount: 50000, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${userId}`
        };
        razorpay.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error creating order', details: err });
            }
            Order.create(order.id, userId, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving order' });
                }
                res.status(201).json({ orderId: order.id });
            });
        });
    },
    updateOrderStatus: async (req, res) => {
        const { orderId, paymentId, status } = req.body;
        const newStatus = status === 'success' ? 'SUCCESSFUL' : 'FAILED';
        Order.updateStatus(orderId, newStatus, paymentId, async (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating order status' });
            }
            if (newStatus === 'SUCCESSFUL') {
                await User.updatePremiumStatus(req.userId, true);
            }
            res.status(200).json({ message: 'Order status updated' });
        });
    }
};

module.exports = OrderController;