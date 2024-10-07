var express = require('express'); //para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index'); //para a rota do index
var usersRouter = require('./routes/users'); //para a rota do users
var productsRouter = require('./routes/products'); //para a rota do products
var cartRouter = require('./routes/cart'); //para a rota do cart
var paymentRouter = require('./routes/payment'); //para a rota do payment

var app = express(); //ativa a api com o express

app.use(logger('dev'));
app.use(express.json()); //permite ouso do json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //cria a rota do index
app.use('/users', usersRouter);
app.use('/products', productsRouter); //cria a rota do products
app.use('/cart', cartRouter); //cria a rota do cart
app.use('/payment', paymentRouter); //cria a rota do payment


// Sincronizando o Sequelize (em dev)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ alter: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
        .then(() => {
            console.log('Banco de dados sincronizado');
        })
        .catch(err => {
            console.error('Erro ao sincronizar o banco de dados:', err);
        });
}

//iniciar o servido com o app.js na porta 8080
var port = 8080;
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
module.exports = app;
