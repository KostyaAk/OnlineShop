# Technical Design of the project
## Controllers classes

### class Basket
#### function getOne
    * input: basketId
    * output: basket
        * This function accepts the user's request for further data processing
#### function appendsize
    * input: basketId, productId, quantity, size_product
    * output: basket
        * This function accepts the user's request for further data processing
#### function create
    * input: none
    * output: basket
        * This function accepts the user's request for further data processing
#### function increment
    * input: basketId, productId, quantity, size_product
    * output: basket
        * This function accepts the user's request for further data processing
#### function decrement
    * input: basketId, productId, quantity, size_product
    * output: basket
        * This function accepts the user's request for further data processing
#### function delete 
    * input: basketId
    * output: basket
        * This function accepts the user's request for further data processing
#### function remove
    * input: basketId, productId, size_product
    * output: basket
        * This function accepts the user's request for further data processing
#### function clear
    * input: basketId
    * output: basket
        * This function accepts the user's request for further data processing

### class BasketProduct
#### function getOne
    * input: basketId, productId, size_product
    * output: basket item
        * This function accepts the user's request for further data processing
#### function getAll
    * input: basketId
    * output: basket items
        * This function accepts the user's request for further data processing
#### function create
    * input: basketId, size_product, data
    * output: basket item
        * This function accepts the user's request for further data processing
#### function update
    * input: basketId, productId, size_product, data
    * output: basket item
        * This function accepts the user's request for further data processing
#### function delete
    * input: basketId, productId, size_product
    * output: basket item
        * This function accepts the user's request for further data processing

### class Brand
#### function getOne
    * input: id
    * output: brand
        * This function accepts the user's request for further data processing
#### function getAll
    * input: none
    * output: brands
        * This function accepts the user's request for further data processing
#### function create
    * input: data
    * output: brand
        * This function accepts the user's request for further data processing
#### function update
    * input: data, id
    * output: brand
        * This function accepts the user's request for further data processing
#### function delete
    * input: id
    * output: brand
        * This function accepts the user's request for further data processing

### class Category
#### function getOne
    * input: id
    * output: category
        * This function accepts the user's request for further data processing
#### function getAll
    * input: none
    * output: categories
        * This function accepts the user's request for further data processing
#### function create
    * input: data
    * output: category
        * This function accepts the user's request for further data processing
#### function update
    * input: data, id
    * output: category
        * This function accepts the user's request for further data processing
#### function delete
    * input: id
    * output: category
        * This function accepts the user's request for further data processing

### class Order
#### function getOne
    * input: userId = null
    * output: order
        * This function accepts the user's request for further data processing
#### function getAll
    * input: id, userId = null
    * output: orders
        * This function accepts the user's request for further data processing
#### function create
    * input: data
    * output: created
        * This function accepts the user's request for further data processing
#### function delete
    * input: id
    * output: order
        * This function accepts the user's request for further data processing

### class Product
#### function getAll
    * input: options
    * output: products
        * This function accepts the user's request for further data processing
#### function getOne
    * input: id
    * output: product
        * This function accepts the user's request for further data processing
#### function create
    * input: data, img
    * output: product
        * This function accepts the user's request for further data processing
#### function update
    * input: id, data, img
    * output: product
        * This function accepts the user's request for further data processing
#### function delete
    * input: id
    * output: product
        * This function accepts the user's request for further data processing

### class ProductInfo
#### function getAll
    * input: productId
    * output: info
        * This function accepts the user's request for further data processing
#### function getOne
    * input: id, productId
    * output: info
        * This function accepts the user's request for further data processing
#### function create
    * input: productId, data 
    * output: info
        * This function accepts the user's request for further data processing
#### function update
    * input: productId, id, data
    * output: info
        * This function accepts the user's request for further data processing
#### function delete
    * input: productId, id
    * output: info
        * This function accepts the user's request for further data processing

### class ProductProp
#### function getAll
    * input: productId
    * output: properties
        * This function accepts the user's request for further data processing
#### function getOne
    * input: id, productId
    * output: property
        * This function accepts the user's request for further data processing
#### function create
    * input: productId, data 
    * output: property
        * This function accepts the user's request for further data processing
#### function update
    * input: productId, id, data
    * output: property
        * This function accepts the user's request for further data processing
#### function delete
    * input: productId, id
    * output: property
        * This function accepts the user's request for further data processing

### class Rating
#### function getOne
    * input: productId, userId
    * output: rating
        * This function accepts the user's request for further data processing
#### function create
    * input: productId, userId, rate
    * output: rating
        * This function accepts the user's request for further data processing

### class User
#### function getAll
    * input: none
    * output: users
        * This function accepts the user's request for further data processing
#### function getOne
    * input: id
    * output: user
        * This function accepts the user's request for further data processing
#### function getByEmail
    * input: email
    * output: user
        * This function accepts the user's request for further data processing
#### function create
    * input: data
    * output: user
        * This function accepts the user's request for further data processing
#### function update
    * input: data, id
    * output: user
        * This function accepts the user's request for further data processing
#### function delete
    * input: id
    * output: user
        * This function accepts the user's request for further data processing

### class File
#### function save
    * input: file
    * output: filename
#### function delete
    * input: file
    * output: none

### Some other functions
#### function decode
    * input: token
    * output: none
        * this fucntion check token on valid
#### function auth
    * input: request
    * output: none
        * this fucntion check user on authorization, if the user is not authorized, the error "authorization required" appears
#### function admin
    * input: request
    * output: none
        * checks the user's role, whether he is an admin or not. If not, it does not allow to execute this request
#### function ErrorHandler
    * input: request
    * output: none
        * a function for catching errors during requests
#### function makeJwt
    * input: id, email, role
    * output: jwt.sign
        * this function create json web token for user

### class User (controller) (All other functions of controllers are similar to this class)
#### function signup
    * input: request
    * output: token
#### function login
    * input: request
    * output: token
#### function check
    * input: request
    * output: token
#### function getAll
    * input: request
    * output: users
#### function getOne
    * input: request
    * output: user
#### function create
    * input: request
    * output: user
#### function update
    * input: request
    * output: user
#### function delete
    * input: request
    * output: user