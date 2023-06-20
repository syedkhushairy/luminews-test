const Parser = require('rss-parser');
const parser = new Parser();
const RSSUrl = require('../models/RSSUrl');
const RSSFeed = require('../models/RSSFeed');

async function get(req, res) {
    const { id } = req.params;
    try {
        const rssFeed = await RSSFeed.findById(id);
        if (rssFeed.length == 0) {
            throw 'notFound'
        }
        return res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved the RSS Feed.',
            data: {
                title: rssFeed.title,
                image: rssFeed.linkImage,
                publishedDate: rssFeed.pubdate,
                title: rssFeed.link,
            },
        });
    } catch (err) {
        err === 'notFound'
            ? res.status(404).json({ errors: [{ statusCode: 404, statusMessage: 'Not Found', message: 'Invalid ID' }] })
            : res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}

async function getAll(req, res) {
    try {
        const rssFeeds = await RSSFeed.find();

        return res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the RSS Urls.',
            data: rssFeeds,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}

async function save() {
    const rssUrls = await RSSUrl.find();
    rssUrls.forEach(async (rssUrl) => {
        const feed = await parser.parseURL(rssUrl.url);
        feed.items.forEach(async (item) => {
            const key = Object.keys(item);
            const row = await RSSFeed.findByGuid(item[key[9]]);
            if (row.length === 1) {
                return;
            }
            //i have hardcoded to get the value
            //could find a better way
            //where we could store the key itself as well in the rssUrl to be use here
            const rssFeed = new RSSFeed(
                item[key[0]],
                item[key[1]],
                item[key[2]],
                item[key[3]],
                item[key[4]],
                item[key[5]],
                item[key[6]],
                item[key[7]],
                item[key[8]],
                item[key[9]],
                item[key[10]],
            )
            await rssFeed.save()
        })
    });
}


module.exports = {
    get,
    getAll,
    save
};

