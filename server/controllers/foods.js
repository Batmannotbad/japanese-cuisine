import { getDb } from '../index.js';
import { ObjectId } from 'mongodb';

const getFoodsColelction = () => {
    return getDb().collection('foods');
}

//CREATE
export const createFood = async (req, res) => {
    // if (req.user.isAdmin) {
        try {
            const {
                name,
                price,
                desc,
                picturePath,
                type,
            } = req.body;
            await getFoodsColelction().insertOne({
                name,
                price,
                desc,
                picturePath,
                type,
                isAvailable: true
            });
            res.status(201).json({ msg: "Created successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    // } else {
    //     res.status(403).json({ msg: 'Access denied' });
    // }
};

//READ
export const getFood = async (req, res) => {
    try {
        const food = await getFoodsColelction().findOne(
            {
                _id: new ObjectId(req.params.id)
            }
        );
        res.status(200).json(food);
    } catch (err) {
        res.status(500).json(err);
    }
};

//READ ALL
export const getAllFoods = async (req, res) => {
    try {
        const menu = await getFoodsColelction().find().toArray();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json(err);
    }
};

//READ FOOD CATEGORIES 
export const getFoodCategories = async (req, res) => {
    try {
        const categories = await getFoodsColelction().distinct("type");
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
export const updateFood = async (req, res) => {
    // if (req.user.isAdmin) {
        // const {
        //     name,
        //     price,
        //     desc,
        //     picturePath,
        //     type,
        //     isAvailable
        // } = req.body;
        try {
            await getFoodsColelction().updateOne(
                {
                    _id: new ObjectId(req.params.id)
                },
                {
                    $set: req.body
                }
            );
            res.status(200).json({ msg: "Updated successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    // } else {
    //     res.status(403).json({ msg: 'Access denied' })
    // }
};

//DELETE
export const deleteFood = async (req, res) => {
    // if (req.user.isAdmin) {
        try {
            await getFoodsColelction().deleteOne(
                {
                    _id: new ObjectId(req.params.id)
                }
            );
            res.status(200).json({ msg: "Deleted successfully" })
        } catch (err) {
            res.status(500).json(err);
        }
    // } else {
    //     res.status(403).json({ msg: 'Access denied' });
    // }
};

//DELETE MANY
export const deleteFoods = async (req, res) => {
    // if (req.user.isAdmin) {
        const list = req.params.ids;
        const ids = list.split('_');
        let idList = [];
        ids.forEach(item => {
            const id = new ObjectId(item)
            idList.push(id)
        });
        
        try {
            await getFoodsColelction().deleteMany(
                {
                    _id: { $in: idList }
                }
            );
            res.status(200).json({ msg: "Deleted successfully" })
        } catch (err) {
            res.status(500).json(err);
        }
    //  } else {
    //     res.status(403).json({ msg: 'Access denied' });
    // }
};