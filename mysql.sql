CREATE TABLE luminews_db.RSSFeed (
	id varchar(100) NULL,
	creator varchar(100) NULL,
	title varchar(255) NULL,
	link varchar(255) NULL,
	pubDate DATETIME NULL,
	contentEncoded TEXT NULL,
	encodedSnippet TEXT NULL,
	dcCreator varchar(255) NULL,
	content TEXT NULL,
	contentSnippet TEXT NULL,
	guid varchar(255) NULL,
	isoDate DATE NULL,
	imageLink varchar(255) NULL,
	CONSTRAINT RSSFeed_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


CREATE TABLE luminews_db.RSSUrl (
	id VARCHAR(100) NULL,
	title varchar(100) NULL,
	url varchar(100) NULL,
	CONSTRAINT RSSUrl_PK PRIMARY KEY (id)
)

ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


