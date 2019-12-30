import uuidv4 from 'uuid/v4';
import model from '../db';
import Helper from '../middlewares/helper';

const {
    Order
} = model

const logs = {
    getAllOrder: async (req, res) => {
        try {
            const orders = await Order.findAll({})
            if (!orders) {
                return res.status(200).json({
                    msg: 'Order history is empty'
                });
            }

            const data = [];
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i].dataValues;
                const food = await Helper.checkMenu(order.menu_id);
                const user = await Helper.findUserById(order.user_id)
                data.push(Object.assign(order, {
                    food,
                    user
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
            console.log(err)
            return res.status(500).json({
                msg: err
            });
        }
    },

    addNewOrder: async (req, res) => {
        const {
            menuId
        } = req.body
        try {
            const quantity = 1
            if (!menuId) {
                return res.status(400).json({
                    msg: 'Field is not allowed to be empty'
                })
            }
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
            console.log(err)
            res.status(500).json({
                msg: err
            });
        }
    },

    getSingleOrder: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const data = [];
            const findOne = await Order.findOne({
                where: {
                    id
                }
            })
            if (!findOne) {
                return res.status(404).json({
                    msg: 'Not Found'
                });
            }


            const order = findOne.dataValues;
            const food = await Helper.checkMenu(order.menu_id);
            const user = await Helper.findUserById(order.user_id)
            data.push(Object.assign(order, {
                food,
                user
            }))


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
            if (!quantity) {
                return res.status(400).json({
                    msg: 'Field must not be empty'
                })
            }
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
                returning: true,
                where: {
                    id
                }
            })

            return res.status(200).json({
                TYPE: 'PUT',
                status: 200,
                msg: 'Order updated successfully',
                data: data[1][0]
            });
        } catch (err) {
            res.status(400).json({
                msg: err
            });
        }
    },

    updateStatus: async (req, res) => {
        const {
            id
        } = req.params
        let {
            status
        } = req.body;
        try {
            if (status === null || status === undefined) {
                status = 'new';
            }

            const findId = await Order.findOne({
                where: {
                    id
                }
            })
            if (!findId) return res.status(403).json({
                msg: 'Error, No such order'
            })

            const data = await Order.update({
                status
            }, {
                returning: true,
                where: {
                    id
                }
            })

            return res.status(200).json({
                TYPE: 'PATCH',
                status: 200,
                msg: 'Order status updated successfully',
                data: data[1][0]
            });
        } catch (err) {
            console.log(err)
            res.status(400).json({
                msg: err
            });
        }
    },
    getUserHistory: async (req, res) => {
        try {
            const rows = await Order.findAll({
                where: {
                    user_id: req.user.id
                }
            })
            if (!rows) {
                return res.status(404).json({
                    msg: 'Cart is empty'
                });
            }

            const data = [];
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i].dataValues;
                const food = await Helper.checkMenu(row.menu_id);

                data.push(Object.assign(row, {
                    food
                }));
            }
            return res.status(200).json({
                TYPE: 'GET',
                msg: 'Request successful',
                status: 200,
                data
            });
        } catch (err) {
            return res.status(400).json({
                err
            });
        }
    },
    updateUserOrders: async (req, res) => {
        const {
            address,
            email,
            phone
        } = req.value.body;
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
                returning: true,
                where: {
                    user_id: req.user.id
                }
            })

            return res.status(200).json({
                TYPE: 'PUT',
                status: 200,
                msg: 'Thank you for shopping with us. Check the menu page to order for more',
                data: data[1]
            });
        } catch (err) {
            res.status(500).json({
                msg: err
            })
        }
    },

    deleteOrder: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const findId = await Order.findOne({
                where: {
                    id
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
            const datas = await Order.findAll({})
            if (!datas) {
                return res.status(404).json({
                    msg: 'No sale has been made'
                });
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
            console.log(err)
            return res.status(500).json({
                msg: err
            });
        }
    }
}

export default logs;