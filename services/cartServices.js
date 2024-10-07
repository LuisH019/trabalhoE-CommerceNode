const db = require('../models');

class CartService {
    constructor(CartModel, CartItemModel, ProductModel) {
        this.Cart = CartModel;
        this.CartItem = CartItemModel;
        this.Product = ProductModel;
    }

    async addItem(idCart, idProduct, quantity = 1) {
        try {
            const product = await this.Product.findByPk(idProduct);

            if (!product || product.stock < quantity) {
                throw new Error('Produto não disponível em estoque');
            }

            const cart = await this.Cart.findByPk(idCart);
            if (!cart) {
                throw new Error('Carrinho não encontrado');
            }

            const existingItem = await this.CartItem.findOne({
                where: { idCart, idProduct }
            });

            if (existingItem) {
                await existingItem.update({ quantity: existingItem.quantity + quantity });

                await existingItem.update({ partialTotalCost: existingItem.quantity * product.price});
            } 
            else {
                await this.CartItem.create({
                    idCart: idCart,
                    idProduct: idProduct,
                    quantity: quantity,
                    partialTotalCost: product.price
                });
            }

            await product.update({ stock: product.stock - quantity });

            return { message: 'Item adicionado ao carrinho com sucesso' };
        } catch (error) {
            throw error;
        }
    }

    async findAllItems(idCart) {
        try {
            const cartItems = await this.CartItem.findAll({where: {idCart:idCart}});

            return cartItems? cartItems : null;
        } catch (error) {
            throw error;
        }
    }

    async removeItem(idCart, idProduct) {
        try {
            const cartItem = await this.CartItem.findOne({
                where: { idCart, idProduct }
            });

            if (!cartItem) {
                throw new Error('Item não encontrado no carrinho');
            }

            const product = await this.Product.findByPk(idProduct);
            await product.update({ stock: product.stock + cartItem.quantity });

            await cartItem.destroy();

            return { message: 'Item removido do carrinho com sucesso' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;