module.exports = {
    mongo: {
        db: process.env.MONGO_DB || "gourmandishdb",
        dbTest: "gourmandishdb_test",
        host: process.env.MONGO_HOST || "127.0.0.1",
        port: process.env.MONGO_PORT || "27017",
        user: process.env.MONGO_USER || "root",
        pw: process.env.MONGO_PW || "root",
        ssl: process.env.MONGO_SSL || false,
    },
};