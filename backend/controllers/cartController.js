class CartController {
    constructor(CartService){
        this.cartService = CartService;
    }

    async addItem (req, res){
        const {idUser, idProduct} = req.query;

        try{
            await this.cartService.addItem(idUser, idProduct);

            res.status(200);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao adiconar um novo item ao carrinho.'});
        }
    }

    async findAllItems (req, res){
        const {idUser} = req.query;

        try{
            const cartItems = await this.cartService.findAllItems(idUser);
            
            res.status(200).json(cartItems);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao localizar os items do carrinho.'});
        }
    }

    async removeItem (req, res){
        const {idUser, idProduct} = req.query;

        try{
            await this.cartService.removeItem(idUser, idProduct);
            
            res.status(200).json();
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao remover o item do carrinho.'});
        }
    }

}

module.exports = CartController;