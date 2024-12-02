const db = require('../models');
const auth = require('../auth');

class UserServices{
    constructor(UserModel, CartModel){
        this.User = UserModel;
        this.Cart = CartModel;
    }

    async create (email, birthDate, password){
        try{
            const newUser = await this.User.create({
                email:email,
                birthDate:birthDate,
                password:password
            });

            const newCart = await this.Cart.create({
                idUser:newUser.dataValues.id
            });

            return newUser? newUser : null;
        }
        catch (error){
            throw error;
        }
    }

    async findAll (){
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers? AllUsers : null;
        }
        catch(error){
            throw error;
        }
    }

    async findById (id){
        try{
            const User = await this.User.findByPk(id);
            return User? User : null;
        }
        catch(error){
            throw error;
        }
    }

    async login (email, password){
        try {
            const User = await this.User.findOne({
                where : {email}
            });

            if(User){
                const token = await auth.generateToken(User);
                User.dataValues.Token = token;
                User.dataValues.password = '';
            }

            return User? User : null;
        }
        catch(error){
            throw error;
        }
    }

    async logout (token){
        try {
            await auth.invalidateToken(token);
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = UserServices;