class ProductController {
    constructor(ProductService){
        this.productService = ProductService;
    }

    async createProduct(req, res){
        const {name, description, price, stock} = req.body;
        try{
            const newProduct = await this.productService.create(name, description, price, stock);
            res.status(200).json(newProduct);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao gravar um novo produto.'});
        }
    }

    async findAllProducts(req, res){
        try{
            const AllProducts = await this.productService.findAll();
            res.status(200).json(AllProducts);
        }
        catch (error){
            res.status(500).json({error: 'Ocorreu um erro ao localizar os produtos.'})
        }
    }

    async findProductById(req, res){
        const {id} = req.query;

        try{
            const Product = await this.productService.findById(id);
            res.status(200).json(Product)
        }
        catch (error){
            res.status(500).json({error: 'Ocorreu um erro ao localizar o produto pelo ID.'})
        }
    }

    async updateProduct(req, res){
        const {name, description, price, stock} = req.body;
        const {id} = req.query;

        try{
            const Product = await this.productService.update(id, name, description, price, stock);
            res.status(200).json(Product);
        }
        catch (error){
            res.status(500).json({error: 'Ocorreu um erro ao editear o produto.'})
        }
    }

    async deleteProduct(req, res){
        const {id} = req.query;

        try{
            const Product = await this.productService.delete(id);
            res.status(200).json(Product);
        }
        catch (error){
            res.status(500).json({error: 'Ocorreu um erro ao deletar o produto.'})
        }
    }
}

module.exports = ProductController;