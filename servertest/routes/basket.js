import express from 'express'
import BasketController from '../controllers/Basket.js'

const router = new express.Router()

router.get('/getone', BasketController.getOne)
router.put('/product/:productId([0-9]+)/appendSize/:quantity([0-9]+)/:size_product([0-9]+)', BasketController.appendSize)
router.put('/product/:productId([0-9]+)/increment/:quantity([0-9]+)/:size_product([0-9]+)', BasketController.increment)
router.put('/product/:productId([0-9]+)/decrement/:quantity([0-9]+)/:size_product([0-9]+)', BasketController.decrement)
router.put('/product/:productId([0-9]+)/remove/:size_product([0-9]+)', BasketController.remove)
router.put('/clear', BasketController.clear)

export default router
