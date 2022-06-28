const baseController = require('../baseControllers')

const collection = 'user'

const get = async (req, res) => {
    try {
        const data = await baseController.getDocs(collection, req.query)
        baseController.sendResponse(res, 200, `Record retrieved successfully`, data)
    } catch (err) {
        baseController.sendResponse(res, 400, 'Something went wrong', err)
    }
}

const create = async (req, res) => {

    const { email } = req.body;

    try {
        const prevData = await baseController.getDocs(collection, { email })
        console.log(prevData)
        if (!prevData || !prevData?.length) {
            const data = await baseController.insertDoc(collection, req.body)
            baseController.sendResponse(res, 200, `Record created successfully`, data)
        }
        else {
            baseController.sendResponse(res, 200, `Email already exists!`, data)
        }
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

