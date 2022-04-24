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
                let plantData = await db.query(`SELECT Plants.*, Trackers.habits
                                                    FROM Plants         
                                                    JOIN Trackers ON Plants.id = Trackers.plantId
                                                    WHERE Plants.id = $1;`, [ id ]);
                let plant = new Plant(plantData.rows[0]);
                resolve (plant);
            } catch (err) {
                reject('Plant not found');
                console.log(err);
            }
        });
    };

    static async create(plant){
        return new Promise (async (resolve, reject) => {
            try {
                let createdPlant = await db.query(`INSERT INTO Plants (plant_name) VALUES ($1) RETURNING *;`, [plant]);
                let newPlant = new Plant(createdPlant.rows[0]);
                resolve  (newPlant);
            } catch (err) {
                reject('Plant could not be created');
                console.log(err);
            }
        });
    };

    static update(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const {plantName, id} = data;
                let updatedPlantData = await db.query(`UPDATE Plants 
                                                       SET plant_name = $1 
                                                       WHERE id = $2;`, [ plantName, id ]);
                let updatedPlant = new Plant(updatedPlantData.rows[0]);
                resolve (updatedPlant);
            } catch (err) {
                reject('Error updating Plant');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM Plants WHERE id = $1 RETURNING *;', [ this.id ]);
                resolve('Plant was deleted')
            } catch (err) {
                reject('Plant could not be deleted')
                console.log(err)
            }
        })
    };
};