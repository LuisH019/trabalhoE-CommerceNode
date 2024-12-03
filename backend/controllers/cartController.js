class CartController {
    constructor(CartService){
        this.cartService = CartService;
    }

    async addItem (req, res){
        const { idUser, idProduct } = req.query;

        try {
            await this.cartService.addItem(idUser, idProduct);
            res.status(200).json({ message: 'Item adicionado com sucesso ao carrinho.' });
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao adicionar um novo item ao carrinho.' });
        }
    }

    async findAllItems (req, res){
        const { idUser } = req.query;

        try {
            const cartItems = await this.cartService.findAllItems(idUser);
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar os items do carrinho.' });
        }
    }

    async removeItem (req, res){
        const { idUser, idProduct } = req.query;

        try {
            await this.cartService.removeItem(idUser, idProduct);
            res.status(200).json({ message: 'Item removido com sucesso do carrinho.' });
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao remover o item do carrinho.' });
        }
    }
}

module.exports = CartController;
