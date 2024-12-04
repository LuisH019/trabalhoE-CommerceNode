class SupplierController {
    constructor(SupplierService) {
        this.supplierService = SupplierService;
    }

    async createSupplier(req, res) {
        const { name } = req.body;
        try {
            const newSupplier = await this.supplierService.create(name);
            res.status(200).json(newSupplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao gravar um novo produto.' });
        }
    }

    async findAllSuppliers(req, res) {
        try {
            const AllSuppliers = await this.supplierService.findAll();
            res.status(200).json(AllSuppliers);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar os produtos.' });
        }
    }

    async findSupplierById(req, res) {
        const { id } = req.query;

        try {
            const Supplier = await this.supplierService.findById(id);
            res.status(200).json(Supplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar o produto pelo ID.' });
        }
    }

    async updateSupplier(req, res) {
        const { name } = req.body;
        const { id } = req.query;

        try {
            const Supplier = await this.supplierService.update(id, name);
            res.status(200).json(Supplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao editar o produto.' });
        }
    }

    async deleteSupplier(req, res) {
        const { id } = req.query;

        try {
            const Supplier = await this.supplierService.delete(id);
            res.status(200).json(Supplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao deletar o produto.' });
        }
    }
}

module.exports = SupplierController;
