import KoaRouter from 'koa-router'
import { translateByGet, test, translateAll, getTranslateById, getTranslateHistory } from './service'
const router = new KoaRouter()


router.get("/translate", translateByGet)
router.get("/www", test)
router.get("/translateall", translateAll)

router.get("/gettranslateById", getTranslateById)
router.get("/translatehistory", getTranslateHistory)

export default router