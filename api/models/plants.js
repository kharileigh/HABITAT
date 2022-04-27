const db = require('../dbConfig/init');

module.exports = class Plant {
    constructor(data){
        this.plantId = data.plantId;
        this.plant_name = data.plant_name;
        this.nickname = data.nickname;
        this.frequency = data.frequency;
        this.count = data.count;
        this.updatedon = data.updatedon;
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let plantData = await db.query('SELECT * FROM plants;');
                let plants = plantData.rows.map(p => new Plant(p));
                resolve (plants);
            } catch (err) {
                reject('Plants not found');
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let plantData = await db.query(`SELECT * FROM plants WHERE plantid = $1;`, [ id ]);
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
                const { plant_name, nickname, frequency, count } = plant;
                console.log(plant);
                let createdPlant = await db.query(`INSERT INTO plants (plant_name, nickname, frequency, count) VALUES ($1, $2, $3, $4) RETURNING *;`, [plant_name, nickname, frequency, count]);
                let newPlant = new Plant(createdPlant.rows[0]);
                console.log(newPlant);
                resolve  (newPlant);
            } catch (err) {
                console.log(err);
                reject('Plant could not be created');
            }
        });
    };


    static update(plant) {
        return new Promise (async (resolve, reject) => {
            try {
                const { plant_name, nickname, frequency, count, plantid } = plant;
                let updatedPlantData = await db.query(`UPDATE plants 
                                                       SET plant_name = $1,
                                                       nickname = $2,
                                                       frequency = $3,
                                                       count = $4
                                                       WHERE plantid = $5;`, [ plant_name, nickname, frequency, count, plantid ]);
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
                const result = await db.query('DELETE FROM plants WHERE plantid = $1 RETURNING *;', [ this.plantid ]);
                resolve('Plant was deleted')
            } catch (err) {
                reject('Plant could not be deleted')
                console.log(err)
            }
        })
    };
};