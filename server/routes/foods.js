import express from 'express';
import { getFood, getAllFoods, updateFood, deleteFood, createFood, deleteFoods, getFoodCategories } from '../controllers/foods.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//CREATE
router.post('/', createFood);

//READ
router.get('/categories', getFoodCategories);
router.get('/:id', getFood);
router.get('/', getAllFoods);

//UPDATE
router.put('/:id', updateFood);

//DELETE
router.delete('/many/:ids', deleteFoods);
router.delete('/:id', deleteFood);

export default router;
