const db = require('../models');
const auth = require('../auth');

class ProductServices{
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    async create (name, description, price, stock){
        try{
            const newProduct = await this.Product.create({
                name:name,
                description:description,
                price:price,
                stock:stock
            });

            return newProduct? newProduct : null;
        }
        catch (error){
            throw error;
        }
        
    }
    async findAll (){
        try{
            const AllProducts = await this.Product.findAll();
            return AllProducts? AllProducts : null;
        }
        catch(error){
            throw error;
        }
    }

    async findById (id){
        try{
            const Product = await this.Product.findByPk(id);
            return Product? Product : null;
        }
        catch(error){
            throw error;
        }
    }

    async update (id, name, description, price, stock){
        try{
            const productToUpdate = await this.findById(id);

            await productToUpdate.update({
                name: name,
                description: description,
                price: price,
                stock: stock
            });

            return productToUpdate? productToUpdate : null;
        }
        catch(error){
            throw error;
        }
    }

    async delete (id) {
        try{
            const productToDelete = await this.findById(id)

            await productToDelete.destroy();

            return productToDelete? productToDelete : null;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = ProductServices;