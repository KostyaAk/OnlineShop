import { Rating as RatingMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { User as UserMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Rating {
    async getOne(productId, userId) {
        const product = await ProductMapping.findByPk(productId)
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const votes = await RatingMapping.count({where: {productId}})
        if (votes) {
            const rates = await RatingMapping.sum('rate', {where: {productId}})
            const userRate =  await RatingMapping.findOne({
                where: {
                    userId: userId, 
                    productId: productId
                }
            })
            if (userRate){
                return {rates, votes, rating: rates/votes, userRate: userRate.rate}
            }
            else {
                return {rates, votes, rating: rates/votes, userRate: 0}
            }
        }
        return {rates: 0, votes: 0, rating: 0, userRate: 0}
    }

    async create(userId, productId, rate) {
        const product = await ProductMapping.findByPk(productId)
        const check = await RatingMapping.findOne({
            where: {
                userId: userId, 
                productId: productId
            }
        })
        if (check) {
            throw new Error('You have already voted for this product')
        }
        if (!product) {
            throw new Error('The product was not found in the database')
        }
        const user = await UserMapping.findByPk(userId)
        if (!user) {
            throw new Error('The user was not found in the database')
        }
        const rating = await RatingMapping.create({userId, productId, rate})
        return rating
    }
}

export default new Rating()
