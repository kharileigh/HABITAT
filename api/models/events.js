const db = require('../dbConfig/init');

module.exports = class Event {
    constructor(data){
        this.id = data.id;
        this.habitId = data.habitId;
        this.plantId = data.plantId;
        this.usersId = data.usersId;
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let eventData = await db.query('SELECT * FROM events;');
                let events = eventData.rows.map(e => new Event(e));
                resolve (events);
            } catch (err) {
                reject('Events not found');
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let eventData = await db.query(`SELECT plants.*, habits.*, users.*
FROM events
LEFT ON 

;`, [ id ]);
                let event = new Event(eventData.rows[0]);
                resolve (event);
            } catch (err) {
                reject('Plant not found');
                console.log(err);
            }
        });
    };

    static async create(plant){
        return new Promise (async (resolve, reject) => {
            try {
                console.log(plant)
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