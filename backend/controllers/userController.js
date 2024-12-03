class UserController {
    constructor(UserService){
        this.userService = UserService;
    }

    async createUser(req, res){
        const {username, email, birthDate, password} = req.body;
        try{
            const newUser = await this.userService.create(username, email, birthDate, password);
            res.status(200).json(newUser);
            res.send();
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao gravar um novo usuario.'});
        }
    }

    async findAllUsers(req, res){
        try{
            const AllUsers = await this.userService.findAll();
            res.status(200).json(AllUsers);
        }
        catch (error){
            res.status(500).json({error: 'Ocorreu um erro ao localizar os usuarios.'})
        }
    }

    async findUserById(req, res){
        const {id} = req.query;

        try{
            const User = await this.userService.findById(id);
            res.status(200).json(User)
        }
        catch (error){
            res.status(500).json({error: 'Ocorreu um erro ao localizar o usuario pelo ID.'})
        }
    }

    async login (req, res){
        const {email, password} = req.body;

        try{
            const User = await this.userService.login(email, password);
            res.status(200).json(User)
        }
        catch (error){
            res.status(500).json({error: 'Erro ao logar o usuário.'})
        }
    }

    async logout (req, res){
        const token = req.headers['authorization'].split(' ')[1];
        
        try{
            await this.userService.logout(token);
            res.status(200)
        }
        catch (error){
            res.status(500).json({error: 'Erro ao logar o usuário.'})
        }
    }
}

module.exports = UserController;