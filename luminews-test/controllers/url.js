const RSSUrl = require('../models/RSSUrl');

async function addRSSUrl(req, res) {
    const { title, url } = req.body;
    try {
        if(!isValidUrl(url)) {
            throw "notUrl"
        } 
        const row = await RSSUrl.findByUrl(url);
        if(row.length === 1) {
            return res.status(500).send({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: "URL already saved",
                data: null,
            });
        }

        const rssUrl = new RSSUrl(
            url,
            title,
        );
        await rssUrl.save();

        return res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            message: 'Successfully created a RSS Url.',
            data: null,
        });
    } catch (err) {
        if(err === "notUrl") {
            return res.status(500).send({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: "Not a valid url",
                data: null,
            });
        }
        return res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
}

async function updateRSSUrl(req, res) {
    const { id } = req.params;
    const { title, url } = req.body;
    try {
        if(!isValidUrl(url)) {
            throw "notUrl"
        } 
        const row = await RSSUrl.findByUrl(url);
        if(row.length === 1) {
            return res.status(500).send({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: "URL already saved",
                data: null,
            });
        }
        const changedRows = await RSSUrl.findByIdAndUpdate(id, { title, url });
        if (changedRows === 1) {
            return res.status(202).send({
                statusCode: 202,
                statusMessage: 'Accepted',
                message: 'Successfully updated a user.',
                data: null,
            });
        } else {
            throw 'notFound';
        }

    } catch (err) {
        if(err === "notUrl") {
            return res.status(500).send({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: "Not a valid url",
                data: null,
            });
        }
        err === 'notFound'
        ? res.status(404).json({ errors: [{ statusCode: 404, statusMessage: 'Not Found', message: 'Invalid ID' }] }):
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
}

async function deleteRSSUrl(req, res) {
    const { id } = req.params;

    try {
        const affectedRows = await RSSUrl.findByIdAndDelete(id);

        if(affectedRows === 1) {
            res.send({
                statusCode: 200,
                statusMessage: 'Ok',
                message: 'Successfully deleted a RSS url.',
            });
        } else {
            throw 'notFound'
        }
        
    } catch (err) {
        err === 'notFound'
        ? res.status(404).json({ errors: [{ statusCode: 404, statusMessage: 'Not Found', message: 'Invalid ID' }] }):
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
}

async function get(req, res) {
    const { id } = req.params;
    try {
        const rssURL = await RSSUrl.findById(id);
        if(rssURL.length == 0 ){
            throw 'notFound'
        }
        return res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved the RSSUrl.',
            data: rssURL,
        });
    } catch (err) {
      err === 'notFound'
        ? res.status(404).json({ errors: [{ statusCode: 404, statusMessage: 'Not Found', message: 'Invalid ID' }] })
        : res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}

async function getAll(req, res) {
    try {

        const rssURLs = await RSSUrl.find();

        return res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the RSS Urls.',
            data: rssURLs,
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}

function isValidUrl(url) {
    try { 
        return Boolean(new URL(url)); 
    }
    catch(e){ 
        return false; 
    }
}

module.exports = {
    addRSSUrl,
    updateRSSUrl,
    deleteRSSUrl,
    get,
    getAll
};