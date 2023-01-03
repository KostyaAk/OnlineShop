import { ProductProp as ProductPropMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class ProductProp {
    async getAll(productId) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const properties = await ProductPropMapping.findAll({where: {productId}})
        return properties
    }

    async getOne(productId, id) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const property = await ProductPropMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('The product property was not found in the database')
        }
        return property
    }

    async create(productId, data) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const {name, value} = data
        const property = await ProductPropMapping.create({name, value, productId})
        return property
    }

    async update(productId, id, data) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const property = await ProductPropMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('The product property was not found in the database')
        }
        const {name = property.name, value = property.value} = data
        await property.update({name, value})
        return property
    }

    async delete(productId, id) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const property = await ProductPropMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('The product property was not found in the database')
        }
        await property.destroy()
        return property
    }
}

export default new ProductProp()
