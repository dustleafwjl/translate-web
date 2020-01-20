import KoaRouter from 'koa-router'
import { translateByGet, test, translateAll } from './service'
const router = new KoaRouter()


router.get("/translate", translateByGet)
router.get("/www", test)
router.get("/translateall", translateAll)

export default router