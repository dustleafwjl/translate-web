import Koa from 'koa'
import BodyParse from 'koa-bodyparser'

import db from './mongodb/mongodb'

import router from './router'
import TranslateDao from './Dao/TranslateDao'



const app = new Koa()

db.then(res => {
    app.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
        await next();
    })
    // try {
    //     TranslateDao.insertTranslateIndex({text: "good", to: "en", from: "zh-CN"})
    // } catch (error) {
        
    // }
    app.use(BodyParse())
    app.use(router.routes())
})



app.listen(8082)
console.log("service start!")