import Router from 'koa-router'
import mirrorState from '../controllers/stateCtrl'
const router = new Router()
router.prefix('/api')

router.get('/state', mirrorState)

export default router
