const db = require('../models');

class PaymentService {
    constructor(PaymentModel, CartItemModel) {
        this.Payment = PaymentModel;
        this.CartItem = CartItemModel
    }

    async pay(idUser, idCart, paymentMethod) {
        try {
            const cartItems = await this.CartItem.findAll({where: {idCart:idCart}});

            if (!idCart || !cartItems) {
                throw new Error('Carrinho vazio ou não encontrado');
            }
            
            const totalCost = await this.CartItem.sum('partialTotalCost', {where: {idCart:idCart}});

            if (paymentMethod !== 'pix' && paymentMethod !== 'creditCard') {
                throw new Error('Método de pagamento inválido');
            }

            const paymentStatus = 'concluded';

            const newPayment = await this.Payment.create({
                idUser,
                idCart,
                totalCost,
                paymentMethod,
                status: paymentStatus
            });
            
            await this.CartItem.destroy({where: {idCart:idCart}});

            return newPayment;
        } 
        catch (error) {
            throw error;
        }
    }

    async getTransaction(idPayment) {
        try {
            const payment = await this.Payment.findByPk(idPayment);

            return payment? payment : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;
