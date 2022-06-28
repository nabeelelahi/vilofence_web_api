const baseController = require('../baseControllers')
const { client } = require('../../config/db')

const collection = 'lead';
const database = 'vilofence';
const aggregrateCollection = 'product'

const get = async (req, res) => {
    try {

        const data = await client.db(database).collection(collection).aggregate([
            { $match: req.query || {} },
            {
                $lookup: {
                    from: aggregrateCollection,
                    let: { fenceHeight: "$fenceHeight" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$fenceHeight"] } }, }
                    ],
                    as: "fenceHeight"
                }
            },
            {
                $lookup: {
                    from: aggregrateCollection,
                    let: { fenceColor: "$fenceColor" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$fenceColor"] } }, }
                    ],
                    as: "fenceColor"
                }
            },
            {
                $lookup: {
                    from: aggregrateCollection,
                    let: { fenceStyle: "$fenceStyle" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$fenceStyle"] } }, }
                    ],
                    as: "fenceStyle"
                }
            },
            {
                $lookup: {
                    from: aggregrateCollection,
                    let: { fenceType: "$fenceType" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$slug", "$$fenceType"] } }, }
                    ],
                    as: "fenceType"
                }
            },
        ]).toArray()

        data.forEach(item => {
            console.log(item)
            if (item.fenceHeight && item.fenceHeight.length) {
                item.fenceHeight = item.fenceHeight[0]
            }
            if (item.fenceColor && item.fenceColor.length) {
                item.fenceColor = item.fenceColor[0]
            }
            if (item.fenceStyle && item.fenceStyle.length) {
                item.fenceStyle = item.fenceStyle[0]
            }
            if (item.fenceType && item.fenceType.length) {
                item.fenceType = item.fenceType[0]
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
        baseController.sendResponse(res, 200, `Record created successfully`, data)
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