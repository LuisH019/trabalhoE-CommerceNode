const db = require('../models');
const auth = require('../auth');

class SupplierServices{
    constructor(SupplierModel){
        this.Supplier = SupplierModel;
    }

    async create (name){
        try{
            const newSupplier = await this.Supplier.create({
                name:name,
            });

            return newSupplier? newSupplier : null;
        }
        catch (error){
            throw error;
        }
        
    }
    async findAll (){
        try{
            const AllSuppliers = await this.Supplier.findAll();
            return AllSuppliers? AllSuppliers : null;
        }
        catch(error){
            throw error;
        }
    }

    async findById (id){
        try{
            const Supplier = await this.Supplier.findByPk(id);
            return Supplier? Supplier : null;
        }
        catch(error){
            throw error;
        }
    }

    async update (id, name){
        try{
            const supplierToUpdate = await this.findById(id);

            await supplierToUpdate.update({
                name: name,
            });

            return supplierToUpdate? supplierToUpdate : null;
        }
        catch(error){
            throw error;
        }
    }

    async delete (id) {
        try{
            const supplierToDelete = await this.findById(id)

            await supplierToDelete.destroy();

            return supplierToDelete? supplierToDelete : null;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = SupplierServices;