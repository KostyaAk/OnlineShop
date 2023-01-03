import { Brand as BrandMapping } from './mapping.js'

class Brand {
    async getAll() {
        const brands = await BrandMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return brands
    }

    async getOne(id) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('The brand was not found in the database')
        }
        return brand
    }

    async create(data) {
        const {name} = data
        const exist = await BrandMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Such a brand already exists')
        }
        const brand = await BrandMapping.create({name})
        return brand
    }

    async update(id, data) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('The brand was not found in the database')
        }
        const {name = brand.name} = data
        await brand.update({name})
        return brand
    }

    async delete(id) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('The brand was not found in the database')
        }
        await brand.destroy()
        return brand
    }
}

export default new Brand()
