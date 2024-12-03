const db = require('../models');

class PaymentService {
    constructor(PaymentModel, CartItemModel) {
        this.Payment = PaymentModel;
        this.CartItem = CartItemModel
    }

    async pay(idUser, paymentMethod) {
        try {
            const cartItems = await this.CartItem.findAll({where: {idUser:idUser}});

            if (!idUser || !cartItems) {
                throw new Error('Carrinho vazio ou não encontrado');
            }
            
            const totalCost = await this.CartItem.sum('partialTotalCost', {where: {idUser:idUser}});

            if (paymentMethod !== 'pix' && paymentMethod !== 'creditCard') {
                throw new Error('Método de pagamento inválido');
            }

            const paymentStatus = 'concluded';

            const newPayment = await this.Payment.create({
                idUser,
                totalCost,
                paymentMethod,
                status: paymentStatus
            });
            
            await this.CartItem.destroy({where: {idUser:idUser}});

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
