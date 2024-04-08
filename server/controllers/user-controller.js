const userService = require("../service/user-service");

class UserController {
    async registration(req,res,next) {
        try{
            const { email, password } = req.body;
            const userData = await userService.registration(email,password);
            //хранение REFRESH токена в cookies
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

            //функция возвращает токены и информацию и пользователе
            return res.json(userData);
        } catch(erorr) {
            console.log("ошибка при регистрации")
        }
    }

    async login(req,res,next) {
        try{

        } catch(erorr) {

        }
    }

    async logout(req,res,next) {
        try{

        } catch(erorr) {

        }
    }

    async activate(req,res,next) {
        try{

        } catch(erorr) {

        }
    }

    async refresh(req,res,next) {
        try{

        } catch(erorr) {

        }
    }

    async getUsers(req,res,next) {
        try{
            // res.json(['123','456'])
        } catch(erorr) {

        }
    }
}

module.exports = new UserController();