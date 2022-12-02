import { Router } from "express";
import {
    saveProduct,
    checkOut
} from '../controllers/products.controllers.js'

const router = Router();

router.post('/checkOut', checkOut)
router.post('/saveProduct', saveProduct)

export default router;