import { BasketProduct as BasketProductMapping } from './mapping.js'
import { Basket as BasketMapping } from './mapping.js'

class BasketProduct {
    async getAll(basketId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('The basket was not found in the database')
        }
        const items = await BasketProductMapping.findAll({where: {basketId}})
        return items
    }

    async getOne(basketId, productId, size_product) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('The basket was not found in the database')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId, size_product}})
        if (!item) {
            throw new Error('The product is not in the basket')
        }
        return item
    }

    async create(basketId, size_product, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('The basket was not found in the database')
        }
        const {quantity = 1} = data
        const item = await BasketProductMapping.create({basketId, productId, quantity, size_product})
        return item
    }

    async update(basketId, productId, size_product, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('The basket was not found in the database')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId, size_product}})
        if (!item) {
            throw new Error('The product is not in the basket')
        }
        if (data.quantity) {
            await item.update({quantity})
        } else if (data.increment) {
            await item.increment('quantity', {by: data.increment})
        } else if (data.decrement) {
            await item.decrement('quantity', {by: data.decrement})
        }
        return item
    }

    async delete(basketId, productId, size_product) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('The basket was not found in the database')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId, size_product}})
        if (!item) {
            throw new Error('The product is not in the basket')
        }
        await item.destroy()
        return item
    }
}

export default new BasketProduct()
