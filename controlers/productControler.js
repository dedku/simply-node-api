const Product = require('../model/productsModel.js')

const { getPostData } = require('../utility')

async function getProducts(req, res) {
    try{
        const products = await Product.findAll()

        res.statusCode = 200
        res.setHeader('Content-Type', "application/json")
        res.end(JSON.stringify(products))

    }catch(error){
        console.log(error)
    }
}

async function getProduct(req, res, id) {
    try{
        const product = await Product.findById(id)
        if(!product) {

            res.statusCode = 404
            res.setHeader('Content-Type', "application/json")
            res.end(JSON.stringify({message: 'Product not found'}))

        } else {

            res.statusCode = 200
            res.setHeader('Content-Type', "application/json")
            res.end(JSON.stringify(product))

        }

    }catch(error){
        console.log(error)
    }
}

async function createProduct(req, res) {
    try{
        const body = await getPostData(req)

        const { title, description, price} = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.statusCode = 201
        res.setHeader('Content-Type', "application/json")
        return res.end(JSON.stringify(newProduct))


    }catch(error){
        console.log(error)
    }
}

async function updateProduct(req, res, id) {
    try{
        const product = await Product.findById(id)

        if(!product) {
            res.statusCode = 404
            res.setHeader('Content-Type', "application/json")
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {

            const body = await getPostData(req)

            const { title, description, price} = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.statusCode = 200
            res.setHeader('Content-Type', "application/json")
            return res.end(JSON.stringify(updProduct))

        }



    }catch(error){
        console.log(error)
    }
}

async function deleteProduct(req, res, id) {
    try{
        const product = await Product.findById(id)
        if(!product) {

            res.statusCode = 404
            res.setHeader('Content-Type', "application/json")
            res.end(JSON.stringify({message: 'Product not found'}))

        } else {

            await Product.remove(id)
            res.statusCode = 200
            res.setHeader('Content-Type', "application/json")
            res.end(JSON.stringify({message: `Product ${id} removed.`}))

        }

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}