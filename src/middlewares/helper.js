import joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model';

const helper = {
    // generate hashed password for user
    hashPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    // check password validation
    comparePassword: (password, hashPassword) =>
        bcrypt.compareSync(password, hashPassword),
    // check for exxisting email
    existEmail: email => User.findOne({
        where: {
            email
        }
    }),
    // generate token
    genToken: user => {
        const token = jwt.sign({
                iss: 'codeSecret',
                sub: user.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            process.env.JWT_SECRET
        );

        return token;
    },
    /**Validate user schems */
    validateBody: schema => (req, res, next) => {
        const result = joi.validate(req.body, schema);

        if (result.error)
            return res.status(400).json({
                msg: result.error
            });

        // check if req.value
        if (!req.value) req.value = {};
        req.value['body'] = result.value;
        next();
    },

    schemas: {
        authSchema: joi.object().keys({
            name: joi.string().required(),
            email: joi
                .string()
                .email()
                .required(),
            password: joi.string().required()
        }),
        signSchema: joi.object().keys({
            email: joi
                .string()
                .email()
                .required(),
            password: joi.string().required()
        })
    }
};

export default helper;