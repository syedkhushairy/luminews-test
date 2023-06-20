const pool = require('../database/db.js');

class RSSUrl {
    constructor(url, title) {
        this._url = url;
        this._title = title;
    }

    get url() {
        return this._url;
    }

    set url(url) {
        try {
            url = new URL(string);
            this._url = url;

        } catch (_) {
            throw new Error('Invalid URL value.');
        }
    }

    get title() {
        return this._title;
    }

    set title(title) {
        if (!title) throw new Error('Invalid Title value.');

        title = title.trim();
        if (title === '') throw new Error('Invalid Title value.');

        this._title = title;
    }


    async save() {
        const sql = `INSERT INTO RSSUrl (id, title, url) VALUES (UUID(), "${this._title}", "${this._url}")`;
        await pool.execute(sql);
    }

    static async find() {
        const sql = 'SELECT * FROM RSSUrl';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findByUrl(url) {
        const sql = `SELECT * FROM RSSUrl where url = "${url}"`;
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }
    static async findByIdAndUpdate(id, options) {
        const sql = `UPDATE RSSUrl SET url = "${options.url}", title = "${options.title}" WHERE id = "${id}"`;
        const [rows, fields] = await pool.execute(sql);
        return rows.changedRows;
    }

    static async findByIdAndDelete(id) {
        const sql = `DELETE FROM RSSUrl WHERE id = "${id}"`;
        const [rows, fields] = await pool.execute(sql);
        return rows.affectedRows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM RSSUrl WHERE id = "${id}"`;
        const [row, fields] = await pool.execute(sql)
        return row;
    }
}

module.exports = RSSUrl;