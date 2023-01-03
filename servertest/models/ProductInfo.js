import { ProductInfo as ProductInfoMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'

class ProductInfo {
    async getAll(productId) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const info = await ProductInfoMapping.findAll({where: {productId}})
        return info
    }

    async getOne(productId, id) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const info = await ProductInfoMapping.findOne({where: {productId, id}})
        if (!info) {
            throw new Error('Product information not found in the database')
        }
        return info
    }

    async create(productId, data) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const {amount, size} = data
        const info = await ProductInfoMapping.create({amount, size, productId})
        return info
    }

    async update(productId, id, data) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const info = await ProductInfoMapping.findOne({where: {productId, id}})
        if (!info) {
            throw new Error('Product information not found in the database')
        }
        const {amount = info.amount, size = info.size} = data
        await info.update({amount, size})
        return info
    }

    async delete(productId, id) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const info = await ProductInfoMapping.findOne({where: {productId, id}})
        if (!info) {
            throw new Error('Product information not found in the database')
        }
        await info.destroy()
        return info
    }
}

export default new ProductInfo()
