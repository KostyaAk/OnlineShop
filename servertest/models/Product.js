import { Product as ProductMapping } from './mapping.js'
import { ProductProp as ProductPropMapping } from './mapping.js'
import { ProductInfo as ProductInfoMapping } from './mapping.js'
import { Brand as BrandMapping } from './mapping.js'
import { Category as CategoryMapping } from './mapping.js'
import FileService from '../services/File.js'

class Product {
    async getAll(options) {
        const {categoryId, brandId, limit, page} = options
        const offset = (page - 1) * limit
        const where = {}
        if (categoryId) where.categoryId = categoryId
        if (brandId) where.brandId = brandId
        const products = await ProductMapping.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {model: BrandMapping, as: 'brand'},
                {model: CategoryMapping, as: 'category'}
            ],
            order: [
                ['name', 'ASC'],
            ],
        })
        return products
    }

    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                {model: ProductPropMapping, as: 'props'},
                {model: ProductInfoMapping, as: 'info'},
                {model: BrandMapping, as: 'brand'},
                {model: CategoryMapping, as: 'category'},
            ]
        })
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        return product
    }

    async create(data, img) {
        // поскольку image не допускает null, задаем пустую строку
        const image = FileService.save(img) ?? ''
        const {name, price, categoryId = null, brandId = null} = data
        const product = await ProductMapping.create({name, price, image, categoryId, brandId})
        if (data.props) { // свойства товара
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        if (data.infos) { //  Информация о товаре
            const inform = JSON.parse(data.infos)
            for (let info of inform) {
                await ProductInfoMapping.create({
                    amount: info.amount,
                    size: info.size,
                    productId: product.id
                })
            }
        }
        // возвращать будем товар со свойствами и информацией
        const created = await ProductMapping.findByPk(product.id, {
            include: [
                {model: ProductPropMapping, as: 'props'},
                {model: ProductInfoMapping, as: 'info'}
            ]
        })
        return created
    }

    async update(id, data, img) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                {model: ProductPropMapping, as: 'props'},
                {model: ProductInfoMapping, as: 'info'}
            ]
        })
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && product.image) {
            FileService.delete(product.image)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            name = product.name,
            price = product.price,
            categoryId = product.categoryId,
            brandId = product.brandId,
            image = file ? file : product.image
        } = data
        await product.update({name, price, categoryId, image, brandId})
        if (data.props) { // свойства товара
            // удаляем старые и добавляем новые
            await ProductPropMapping.destroy({where: {productId: id}})
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        if (data.infos) { // Информация о товаре
            // удаляем старые и добавляем новые
            await ProductInfoMapping.destroy({where: {productId: id}})
            const info = JSON.parse(data.infos)
            for (let inf of info) {
                await ProductPropMapping.create({
                    amount: inf.amount,
                    size: inf.size,
                    productId: product.id
                })
            }
        }
        // обновим объект товара, чтобы вернуть свежие данные
        await product.reload()
        return product
    }

    async delete(id) {
        const product = await ProductMapping.findByPk(id)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        if (product.image) { // удаляем изображение товара
            FileService.delete(product.image)
        }
        await product.destroy()
        return product
    }

    async isExist(id) {
        const basket = await ProductMapping.findByPk(id)
        return basket
    }
}

export default new Product()
