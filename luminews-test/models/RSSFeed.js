const pool = require('../database/db.js');
const moment = require('moment');
class RSSFeed {
    constructor(creator, title, link, pubDate, contentEncoded, encodedSnippet, dcCreator, content, contentSnippet, guid, isoDate) {
        var re = /<img[^>]+src="(https:\/\/([^">]+)|http:\/\/([^">]+))/g
        this._creator = creator;
        this._title = title;
        this._link = link;
        this._pubDate = moment(pubDate).format('YYYY-MM-DD HH:MM:SS');
        this._contentEncoded = contentEncoded.replace(/(\r\n|\n|\r)/gm, "").replace(/[\\$'"]/g, "\\$&").trim();
        this._encodedSnippet = encodedSnippet.replace(/(\r\n|\n|\r)/gm, "").replace(/[\\$'"]/g, "\\$&").trim();
        this._dcCreator = dcCreator;
        this._content = content.replace(/(\r\n|\n|\r)/gm, "").replace(/[\\$'"]/g, "\\$&").trim();
        this._contentSnippet = contentSnippet.replace(/(\r\n|\n|\r)/gm, "").replace(/[\\$'"]/g, "\\$&").trim();
        this._guid = guid;
        this._isoDate = moment(isoDate).format('YYYY-MM-DD');
        this._imageLink = re.exec(contentEncoded)[1];
    }


    async save() {
        const sql = `INSERT INTO RSSFeed (id, creator, title, link, pubDate, contentEncoded, encodedSnippet, dcCreator, content, contentSnippet, guid, isoDate, imageLink) 
        VALUES (UUID(), "${this._creator}", "${this._title}", "${this._link}", "${this._pubDate}", "${this._contentEncoded}", "${this._encodedSnippet}", "${this._dcCreator}", "${this._content}", "${this._contentSnippet}", "${this._guid}", "${this._isoDate}", "${this._imageLink}")`;
        await pool.execute(sql);
    }

    static async find() {
        const sql = 'SELECT title, imageLink, pubDate, link FROM RSSFeed';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM RSSFeed WHERE id = "${id}"`;
        const [row, fields] = await pool.execute(sql)
        return row;
    }

    static async findByGuid(str) {
        const sql = `SELECT * FROM RSSFeed WHERE guid = "${str}"`;
        const [row, fields] = await pool.execute(sql)
        return row;
    }
}

module.exports = RSSFeed;