const jwt = require("jsonwebtoken");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const TokenModel = require("../models/token-models")

class TokenService {
    ///генерация JWT токена
    generateTokens(payload) {
        ///генерация ACCESS токена
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: "30m"})
        ///генерация REFRESH токена 
        const refreshToken = jwt.sign(payload,JWT_REFRESH_SECRET, {expiresIn: "30d"})

        //отдаем оба токена
        return {
            accessToken,
            refreshToken
        }
    }

    //сохранение токенов в базу данных
    async saveToken(userID, refreshToken) {
        //проваеркка на наличие по такому useriD токен в базе данных
        const tokenData = await TokenModel.findOne({ user: userID })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            //обновляем новый refresh токен в базу данных
            return tokenData.save();
        }
        //случай когда пользователь логинится первый раз
        const token = await TokenModel.create({ user: userID, refreshToken });
        return token;
    }

}

module.exports = new TokenService();