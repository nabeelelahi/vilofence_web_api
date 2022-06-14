const { client } = require('../../config/db')

const database = 'vilofence';

async function getDocs(collection, condition = {}) {

    try {

        const result = await client.db(database).collection(collection).find(condition).toArray()

        if (result) {
            return !result.length ? [] : result.length === 1 ? result[0] : result
        }
        else {
            return {}
        }

    }
    catch (err) {
        return err
    }

}

async function insertDoc(collection, payload = {}) {

    try {

        payload.slug = generateSlug()

        const result = await client.db(database).collection(collection).insertOne(payload)

        return result.toJSON()

    }
    catch (err) {
        return err
    }

}

async function updateDoc(collection, condition = {}, payload = {}) {

    try {

        const result = await client.db(database).collection(collection)
            .findOneAndUpdate(condition, { $set: payload });

        return result;

    }
    catch (err) {
        return err
    }

}

async function updateDoc(collection, condition = {}, payload = {}) {

    try {

        const result = await client.db(database).collection(collection)
            .findOneAndUpdate(condition, { $set: payload });

        return result;

    }
    catch (err) {
        return err
    }

}

async function deleteDoc(collection, condition = {}) {

    try {

        const result = await client.db(database).collection(collection).findOneAndDelete(condition);

        return result;

    }
    catch (err) {

        return err;

    }

}

function sendResponse(res, code = 200, message = "success", data = {}) {

    const response = {
        code,
        message,
        data
    }

    return res.status(200).send(response)

}

function generateSlug() {
    const date = new Date().getTime()
    const rand = Number(Math.random() * 1000).toFixed(3)
    const slug = date + '_' + rand
    return slug
}

module.exports = {
    getDocs,
    insertDoc,
    updateDoc,
    deleteDoc,
    sendResponse,
    generateSlug
}