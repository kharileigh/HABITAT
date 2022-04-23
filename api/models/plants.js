const db = require('../dbConfig/init');

module.exports = class Plant {
    constructor(data){
        this.id = data.id;
        this.name = data.name};


    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                console.log("is this working")
                let plantData = await db.query('SELECT * FROM Plants');
                let plants = plantData.rows.map(p => new Plant(p));
                resolve (plants);
            } catch (err) {
                reject('Plants not found');
                console.log(err);
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let plantData = await db.query(`SELECT Plants.*, Users.username, Trackers.habits
                                                    FROM books         
                                                    JOIN Trackers ON Plants.id = Trackers.plantId
                                                    WHERE Plants.id = $1;`, [ id ]);
                let book = new Book(bookData.rows[0]);
                resolve (book);
            } catch (err) {
                reject('Book not found');
            }
        });
    };

};

