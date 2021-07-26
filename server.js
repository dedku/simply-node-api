const http = require('http');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controlers/productControler.js')

const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET'){
        getProducts(req,res)
    } else if(req.url.match(/\/api\/products\/([a-z0-9-]+)/) && req.method === 'GET'){

       const id = req.url.split('/')[3]
       getProduct(req, res, id)

    } else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if(req.url.match(/\/api\/products\/([a-z0-9-]+)/) && req.method === 'PUT'){

        const id = req.url.split('/')[3]
        updateProduct(req, res, id)

    } else if(req.url.match(/\/api\/products\/([a-z0-9-]+)/) && req.method === 'DELETE'){

        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)

    } else {

        res.statusCode = 404
        res.setHeader('Content-Type', "application/json")
        res.end(JSON.stringify({message: 'Not found'}))

    }
})


const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
