import Koa from 'koa'
import KoaRouter from 'koa-router'
import BodyParse from 'koa-bodyparser'

import { translateByGet } from './service'


const router = new KoaRouter()

const app = new Koa()


app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    await next();
})


router.get("/translate", translateByGet)

app.use(BodyParse())
app.use(router.routes())
app.listen(8081)
console.log("service start!")