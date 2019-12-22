import uuidv4 from 'uuid/v4';
import model from '../db';
import Helper from '../middlewares/helper';

const {
    Order
} = model

const logs = {
    getAllOrder: async (res, res) => {
        try {
            const orders = await Order.findAll({})
            if (!orders) {
                return res.status(200).json({
                    msg: 'Order history is empty'
                });
            }

            const data = [];
            for (let i = 0; i < orders.length; i++) {
                const order = order[i];
                const food = await Helper.checkMenu(order.menu_id);
                data.push(Object.assign(order, {
                    food
                }))
            }

            return res.status(200).json({
                TYPE: 'GET',
                count: data.length,
                status: 200,
                msg: 'List of orders',
                data
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    },

    addNewOrder: async (req, res) => {
        const {
            menuId,
            quantity
        } = req.body
        try {
            const findMenu = await Helper.checkMenu(menuId);
            if (!findMenu) return res.status(403).json({
                msg: 'Error, No such menu'
            })

            const data = await Order.create({
                id: uuidv4(),
                menu_id: findMenu.id,
                user_id: req.user.id,
                quantity,
                amount: quantity * findMenu.price,
                payment: 'pending',
                status: 'new'
            })

            return res.status(200).json({
                TYPE: 'POST',
                status: 200,
                msg: 'Order created successfully',
                data
            });
        } catch (err) {
            res.status(400).json({
                msg: err
            });
        }
    },

    getSingleOrder: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const data = await Order.findOne({
                where: {
                    id
                }
            })
            if (!data) {
                return res.status(404).json({
                    msg: 'Not Found'
                });
            }

            return res.status(200).json({
                TYPE: 'GET',
                msg: 'Request successful',
                data
            });

        } catch (err) {
            res.status(500).json({
                msg: err
            })
        }
    },

    updateQuantity: async (req, res) => {
        const {
            id
        } = req.params
        const quantity = req.body.quantity
        try {
            const findId = await Order.findOne({
                where: {
                    id
                }
            })
            if (!findId) return res.status(403).json({
                msg: 'Error, No such order'
            })
            // find menu to obtain price
            const findMenu = await Helper.checkMenu(findId.menu_id);

            const data = await Order.update({
                quantity,
                amount: quantity * findMenu.price
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({
                TYPE: 'PUT',
                status: 200,
                msg: 'Order updated successfully',
                data
            });
        } catch (err) {
            res.status(400).json({
                msg: err
            });
        }
    },

    updateStatus: (req, res) => {
        let {
            status
        } = req.body;
        try {
            if (status === null || status === undefined) {
                status = 'new';
            }

            const data = await Order.update({
                status
            }, {
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json({
                TYPE: 'PATCH',
                status: 200,
                message: 'Order status updated successfully',
                data
            });
        } catch (err) {
            res.status(400).json({
                msg: err
            });
        }
    },

    updateUserOrders: async (req, res) => {
        const {
            address,
            email,
            phone
        } = req.body;
        try {
            let {
                status
            } = req.body;
            if (status === null || status === undefined) {
                status = 'new';
            }

            const data = await Order.update({
                address,
                email,
                phone,
                status,
                orderedDate: new Date(),
                payment: 'paid'
            }, {
                where: {
                    user_id: req.user.id
                }
            })

            return res.status(200).json({
                TYPE: 'PUT',
                status: 200,
                message: 'Food ordered successfully',
                data
            });
        } catch (err) {
            res.status(500).json({
                msg: err
            })
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const findId = await Order.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!findId) return res.status(403).json({
                msg: 'Error, No such order'
            })

            await Order.destroy({
                where: {
                    id
                }
            })

            return res.status(200).json({
                TYPE: 'DELETE',
                status: 200,
                msg: 'Order Deleted successfully'
            });
        } catch (err) {
            res.status(400).json({
                msg: err
            });
        }
    },

    totalPendingPayment: async (req, res) => {
        try {
            let pending = 0
            let paid = 0
            const datas = Order.findAll({})
            if (!datas) {
                return res.status(404).json({
                    msg: 'No sale has been made'
                });
            }

            for (let i = 0; i < data.length; i++) {

            }

            await datas.map(data => {
                if (data.payment === 'pending') {
                    pending += data.amount
                }
                if (data.payment === 'paid') {
                    paid += data.amount
                }

                return;
            })
            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                total: {
                    pending,
                    paid
                },
                msg: 'Total sales update'
            });
        } catch (err) {
            return res.status(400).json({
                msg: err
            });
        }
    }
}

export default logs;