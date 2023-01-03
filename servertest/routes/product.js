import express from 'express'
import ProductController from '../controllers/Product.js'
import ProductPropController from '../controllers/ProductProp.js'
import ProductInfoController from '../controllers/ProductInfo.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

//Товары

// список товаров выбранной категории и выбранного бренда
router.get('/getall/categoryId/:categoryId([0-9]+)/brandId/:brandId([0-9]+)', ProductController.getAll)
// список товаров выбранной категории
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
// список товаров выбранного бренда
router.get('/getall/brandId/:brandId([0-9]+)', ProductController.getAll)
// список всех товаров каталога
router.get('/getall', ProductController.getAll)
// получить один товар каталога
router.get('/getone/:id([0-9]+)', ProductController.getOne)
// создать товар каталога — нужны права администратора
router.post('/create', authMiddleware, adminMiddleware, ProductController.create)
// обновить товар каталога  — нужны права администратора
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.update)
// удалить товар каталога  — нужны права администратора
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.delete)


//Свойства

// список свойств товара
router.get('/:productId([0-9]+)/property/getall', ProductPropController.getAll)
// одно свойство товара
router.get('/:productId([0-9]+)/property/getone/:id([0-9]+)', ProductPropController.getOne)
// создать свойство товара
router.post('/:productId([0-9]+)/property/create', authMiddleware, adminMiddleware, ProductPropController.create)
// обновить свойство товара
router.put('/:productId([0-9]+)/property/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductPropController.update)
// удалить свойство товара
router.delete(
    '/:productId([0-9]+)/property/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductPropController.delete)

// список информации о товаре
router.get('/:productId([0-9]+)/info/getall', ProductInfoController.getAll)
// одна информация о товара
router.get('/:productId([0-9]+)/info/getone/:id([0-9]+)', ProductInfoController.getOne)
// создать информацию о товаре
router.post('/:productId([0-9]+)/info/create', authMiddleware, adminMiddleware, ProductInfoController.create)
// обновить информацию о товаре
router.put('/:productId([0-9]+)/info/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductInfoController.update)
// удалить информацию о товаре
router.delete('/:productId([0-9]+)/info/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductInfoController.delete)

export default router
