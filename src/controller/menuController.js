import uuidv4 from 'uuid/v4';
import model from '../db';
import cloudinary from '../middlewares/cloudinaryConfig';

const {
    Menu
} = model

const logs = {
    getAllMenu: async (req, res) => {
        try {
            const data = await Menu.findAll({})

            if (data.length < 1) {
                return res.status(200).json({
                    message: 'Menu is empty'
                });
            }

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                count: data.length,
                message: 'List of foods in cart',
                data
            });
        } catch (err) {
            return res.status(500).json({
                msg: err
            })
        }

    },

    getSingleFood: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const data = await Menu.findOne({
                where: {
                    id
                }
            })
            if (!data) {
                return res.status(404).json({
                    message: 'Not Found'
                });
            }

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                message: 'Request successful',
                data
            });
        } catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    },

    addFood: async (req, res) => {
        const {
            name,
            price
        } = req.body
        try {
            if (!name || !price) {
                return res.status(400).json({
                    msg: 'Fields is not allowed to be empty'
                })
            }
            let image = null;
            if (!req.file) {
                image = req.imagepath;
            } else {
                image = req.file.path;
            }
            console.log('image', image)
            const returnImage = await cloudinary.uploader.upload(image)

            const data = await Menu.create({
                id: uuidv4(),
                name,
                price,
                image: returnImage.secure_url
            })

            return res.status(201).json({
                TYPE: 'POST',
                status: 201,
                message: 'Food added successfully',
                data
            });
        } catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    },

    updateFood: async (req, res) => {
        const {
            id
        } = req.params
        try {
            let image = null;
            if (!req.file) {
                image = req.imagepath;
            } else {
                image = req.file.path;
            }

            const returnImage = await cloudinary.uploader.upload(image)

            const data = await Menu.update({
                name: req.body.name,
                price: req.body.price,
                image: returnImage.secure_url
            }, {
                returning: true,
                where: {
                    id
                }
            })
            console.log(data)
            return res.status(201).json({
                TYPE: 'PUT',
                status: 201,
                message: 'Food updated successfully',
                data: data[1][0]
            });
        } catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    },

    deleteFood: async (req, res) => {
        const {
            id
        } = req.params
        try {
            const findId = await Menu.findOne({
                where: {
                    id
                }
            })
            if (!findId) return res.status(403).json({
                msg: 'Unknown request'
            })

            await Menu.destroy({
                where: {
                    id
                }
            })

            return res.status(200).json({
                TYPE: 'DELETE',
                status: 200,
                message: 'Food Deleted successfully'
            });
        } catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    }
}

export default logs;