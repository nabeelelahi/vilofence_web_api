const baseController = require('../baseControllers')
const { client } = require('../../config/db')

const collection = 'lead';
const database = 'vilofence';

const get = async (req, res) => {
    try {

        const data = await client.db(database).collection(collection).aggregate([
            { $match: req.query || {} },
            {
                $lookup: {
                    from: 'product',
                    let: { product: "$product" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$product"] } }, }
                    ],
                    as: "product"
                }
            },
            {
                $lookup: {
                    from: 'category',
                    let: { category: "$category" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$category"] } }, }
                    ],
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: 'gate',
                    let: { gate: "$gate" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$gate"] } }, }
                    ],
                    as: "gate"
                }
            },
        ]).toArray()

        data.forEach(item => {
            if (item.category && item.category.length) {
                item.category = item.category[0]
            }
            if (item.product && item.product.length) {
                item.product = item.product[0]
            }
            if (item.gate && item.gate.length) {
                item.gate = item.gate[0]
            }
        })

        baseController.sendResponse(res, 200, `Record retrieved successfully`, data)
    } catch (err) {
        console.log(err)
        baseController.sendResponse(res, 400, 'Something went wrong', err)
    }
}

const create = async (req, res) => {
    try {
        const data = await baseController.insertDoc(collection, req.body)
        // const data = await baseController.getDocs(collection, req.query)
        baseController.sendResponse(res, 200, `Record created successfully`, data.ops[0])
    } catch (err) {
        baseController.sendResponse(res, 400, 'Something went wrong', err)
    }
}

const update = async (req, res) => {
    try {
        const data = await baseController.updateDoc(collection, req.query, req.body)
        baseController.sendResponse(res, 200, `Record updated successfully`, data)
    } catch (err) {
        baseController.sendResponse(res, 400, 'Something went wrong', err)
    }
}

const remove = async (req, res) => {
    try {
        const data = await baseController.deleteDoc(collection, req.query)
        baseController.sendResponse(res, 200, `Record removed successfully`, data)
    } catch (err) {
        baseController.sendResponse(res, 400, 'Something went wrong', err)
    }
}


module.exports = {
    get,
    create,
    update,
    remove
}