import { Basket as BasketMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { BasketProduct as BasketProductMapping } from './mapping.js'
import { ProductInfo as ProductInfoMapping} from './mapping.js'

const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.products = []
    if (basket.basket_products) {
        data.products = basket.basket_products.map(item => {
            let index = 0;
            for (let i = 0; i < item.product.info.length; i++) {
                if (item.product.info[i].size == item.size_product) index = i;
            }
            return {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                size_product: item.size_product,
                amount: item.product.info[index].amount
            }
        })
    }
    return data
}

class Basket {
    async getOne(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: BasketProductMapping, attributes: ['basketId', 'productId','size_product', 'quantity'],
                    include: [
                        {model: ProductMapping, attributes:  ['id', 'name', 'price'],
                        include: [{model: ProductInfoMapping, as: 'info', attributes:  ['amount', 'size']}]
                    }]
                }
            ]
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        return pretty(basket)
    }

    async create() {
        const basket = await BasketMapping.create()
        return pretty(basket)
    }

    async appendSize(basketId, productId, quantity, size_product) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: BasketProductMapping, attributes: ['basketId', 'productId','size_product', 'quantity'],
                    include: [{model: ProductMapping, attributes:  ['id', 'name', 'price'],
                    include: [{model: ProductInfoMapping, as: 'info', attributes:  ['amount', 'size']}]}]
                }
            ]
        })

        if (!basket) {
            basket = await BasketMapping.create()
        }
        // проверяем, есть ли уже этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId, size_product}
        })
        
        const product_info = await ProductInfoMapping.findOne({
            where: {productId:productId, size:size_product}
        })

        if(product_info.amount >= quantity) {
            if (basket_product) { // есть в корзине
                await basket_product.increment('quantity', {by: quantity})
            } else { // нет в корзине
                await BasketProductMapping.create({basketId, productId, quantity, size_product})
            }
            await product_info.decrement('amount', {by: quantity})
        }
        // обновим объект корзины, чтобы вернуть свежие данные
        await basket.reload()
        return pretty(basket)
    }

    async increment(basketId, productId, quantity, size_product) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: BasketProductMapping, attributes: ['basketId', 'productId','size_product', 'quantity'],
                    include: [{model: ProductMapping, attributes:  ['id', 'name', 'price'],
                    include: [{model: ProductInfoMapping, as: 'info', attributes:  ['amount', 'size']}]}]
                }
            ]
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        // проверяем, есть ли этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId, size_product}
        })
        const product_info = await ProductInfoMapping.findOne({
            where: {productId:productId, size:size_product}
        })
        if(product_info.amount >= quantity) {
            if (basket_product) {
                await basket_product.increment('quantity', {by: quantity})
                await product_info.decrement('amount', {by: quantity})
                // обновим объект корзины, чтобы вернуть свежие данные
                await basket.reload()
            }
        }
        return pretty(basket)
    }

    async decrement(basketId, productId, quantity, size_product) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: BasketProductMapping, attributes: ['basketId', 'productId','size_product', 'quantity'],
                    include: [{model: ProductMapping, attributes:  ['id', 'name', 'price'],
                    include: [{model: ProductInfoMapping, as: 'info', attributes:  ['amount', 'size']}]}]
                }
            ]
        })
        if (!basket) {
            basket = await Basket.create()
        }
        // проверяем, есть ли этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId, size_product}
        })

        const product_info = await ProductInfoMapping.findOne({
            where: {productId:productId, size:size_product}
        })

        if (basket_product) {
            if (basket_product.quantity > quantity) {
                await basket_product.decrement('quantity', {by: quantity})
            } else {
                await basket_product.destroy()
            }
            
            await product_info.increment('amount', {by: quantity})
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        }
        
        return pretty(basket)
    }

    async remove(basketId, productId, size_product) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: BasketProductMapping, attributes: ['basketId', 'productId','size_product', 'quantity'],
                    include: [{model: ProductMapping, attributes:  ['id', 'name', 'price'],
                    include: [{model: ProductInfoMapping, as: 'info', attributes:  ['amount', 'size']}]}]
                }
            ]
        })  
        if (!basket) {
            basket = await Basket.create()
        }
        // проверяем, есть ли этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId, size_product}
        })

        const product_info = await ProductInfoMapping.findOne({
            where: {productId:productId, size:size_product}
        })

        await product_info.increment('amount', {by: basket_product.quantity})

        if (basket_product) {
            await basket_product.destroy()
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        }
        return pretty(basket)
    }

    async clear(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (basket) {
            await BasketProductMapping.destroy({where: {basketId}})
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        } else {
            basket = await Basket.create()
        }
        return pretty(basket)
    }

    async delete(basketId) {
        const basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            throw new Error('The basket was not found in the database')
        }
        await basket.destroy()
        return pretty(basket)
    }
}

export default new Basket()
