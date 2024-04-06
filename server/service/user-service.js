const UserModel = require("../models/user-models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const emailService = require("./email-service");
const TokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");

class UserService {
    //логика регистрации пользователя
    async registration(email, password) {
        //проверка есть ли такой пользлователь по { email }
        const candidate = await UserModel.findOne({ email });
        if (candidate ) {
            throw new Error(`пользователь с таким почтовым адресом ${email} уже есть`)
        }

        ///шифровка пароля 
        const hashPassword = await bcrypt.hash(password,3)

        //генерация ссылки для активации аккаунта
        const activationLink = uuid.v4();

        //сохраням поллзователя в базу данных
        const user = await UserModel.create({ email,password: hashPassword,activationLink: activationLink });

        //отправка { activationLink } пользователю на его { email }
        await emailService.sendActivationEmail(email,activationLink);

        const userDTO = new UserDto(user); //id , email, isActivated
        //генерируем токены 
        const tokens = TokenService.generateTokens({...userDTO});

        //сохраням refresh токен в базу данных
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { 
            ...tokens,
            user: userDTO
        }
    }
}

module.exports = new UserService()