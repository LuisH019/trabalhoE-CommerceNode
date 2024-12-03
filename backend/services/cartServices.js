const db = require('../models');

class CartService {
    constructor(UserModel, CartItemModel, ProductModel) {
        this.User = UserModel;
        this.CartItem = CartItemModel;
        this.Product = ProductModel;
    }

    async addItem(idUser, idProduct, quantity = 1) {
        try {
            const product = await this.Product.findByPk(idProduct);

            if (!product || product.stock < quantity) {
                throw new Error('Produto não disponível em estoque');
            }

            const user = await this.User.findByPk(idUser);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            const existingItem = await this.CartItem.findOne({
                where: { idUser, idProduct }
            });

            if (existingItem) {
                await existingItem.update({ quantity: existingItem.quantity + quantity });

                await existingItem.update({ partialTotalCost: existingItem.quantity * product.price});
            } 
            else {
                await this.CartItem.create({
                    idUser: idUser,
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

    async findAllItems(idUser) {
        try {
            const cartItems = await this.CartItem.findAll({where: {idUser:idUser}});

            return cartItems? cartItems : null;
        } catch (error) {
            throw error;
        }
    }

    async removeItem(idUser, idProduct) {
        try {
            const cartItem = await this.CartItem.findOne({
                where: { idUser, idProduct }
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