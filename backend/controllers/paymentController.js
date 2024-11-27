class PaymentController {
    constructor(PaymentService){
        this.paymentService = PaymentService;
    }

    async paymentByPix (req, res){
        const {idUser, idCart} = req.query;

        try{
            const payment = await this.paymentService.pay(idUser, idCart, "pix");

            res.status(200).json(payment);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao pagar usando PIX.'});
        }
    }

    async paymentByCreditCard (req, res){
        const {idUser, idCart} = req.query;

        try{
            const payment = await this.paymentService.pay(idUser, idCart, "creditCard");

            res.status(200).json(payment);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao pagar usando cartão de crédito.'});
        }
    }

    async getTransaction (req, res){
        const {idPayment} = req.query;

        try{
            const payment = await this.paymentService.getTransaction(idPayment);

            res.status(200).json(payment);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao cosnultar a transação.'});
        }
    }

}

module.exports = PaymentController;