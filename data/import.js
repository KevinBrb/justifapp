const db = require("../app/database");

const collection = db.then(db => db.collection('user'));

(async () => {
    (await collection).insertOne({ email: 'foo@bar.com' });

    console.log('Données importées');
})();