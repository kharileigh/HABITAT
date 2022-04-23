const db = require('../dbConfig/init');

module.exports = class Plant {
    constructor(data){
        this.id = data.id;
        this.plantName = data.plantName
    };
        
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
                let plant = new Plant(plantData.rows[0]);
                resolve (plant);
            } catch (err) {
                reject('Book not found');
                console.log(err);
            }
        });
    };

    static async create(plant){
        return new Promise (async (resolve, reject) => {
            try {
                let createdBook = await db.query(`INSERT INTO Plants (plant_name) VALUES ($1, $2, $3, $4) RETURNING *;`, [plant]);
                let newBook = new Book(createdBook.rows[0]);
                resolve  (newBook);
            } catch (err) {
                reject('Book could not be created');
                console.log(err);
            }
        });
    };
};

