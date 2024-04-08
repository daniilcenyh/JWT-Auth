const userService = require("../service/user-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error")

class UserController {
    async registration(req,res,next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("ошибка валидации", errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email,password);
            //хранение REFRESH токена в cookies
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

            //функция возвращает токены и информацию и пользователе
            return res.json(userData);
        } catch(erorr) {
            next(erorr)
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
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            //перенос пользователя после активации на страницу клиентской части сайта
            return res.redirect(process.env.CLIENT_URL)
        } catch(erorr) {
            next(erorr)
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