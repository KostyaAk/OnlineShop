import ProductInfoModel from '../models/ProductInfo.js'
import AppError from '../errors/AppError.js'

class ProductInfo {
    async getAll(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Order id not specified')
            }
            const info = await ProductInfoModel.getAll(req.params.productId)
            res.json(info)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Order id not specified')
            }
            if (!req.params.id) {
                throw new Error('Property id not specified')
            }
            const info = await ProductInfoModel.getOne(req.params.productId, req.params.id)
            res.json(info)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('The product ID is not specified')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('There is no data to create')
            }
            const info = await ProductInfoModel.create(req.params.productId, req.body)
            res.json(info)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('The product ID is not specified')
            }
            if (!req.params.id) {
                throw new Error('Property id not specified')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('No data to update')
            }
            const info = await ProductInfoModel.update(req.params.productId, req.params.id, req.body)
            res.json(info)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('The product ID is not specified')
            }
            if (!req.params.id) {
                throw new Error('Property id not specified')
            }
            const info = await ProductInfoModel.delete(req.params.productId, req.params.id)
            res.json(info)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ProductInfo()
