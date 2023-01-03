import BasketModel from '../models/Basket.js'
import AppError from '../errors/AppError.js'

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class Basket {
    async getOne(req, res, next) {
        try {
            let basket;
            if (req.signedCookies.basketId !== 'undefined') {
                basket = await BasketModel.getOne(parseInt(req.signedCookies.basketId))
            } else {
                basket = await BasketModel.create()
            }
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async appendSize(req, res, next) {
        try {
            let basketId

            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const {productId, quantity, size_product} = req.params
            const basket = await BasketModel.appendSize(basketId, productId, quantity, size_product)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async increment(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            const {productId, quantity, size_product} = req.params
            const basket = await BasketModel.increment(basketId, productId, quantity, size_product)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async decrement(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            const {productId, quantity, size_product} = req.params
            const basket = await BasketModel.decrement(basketId, productId, quantity, size_product)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            const basket = await BasketModel.remove(basketId, req.params.productId, req.params.size_product)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            const basket = await BasketModel.clear(basketId)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Basket()