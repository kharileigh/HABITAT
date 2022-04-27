const db = require('../dbConfig/init');

module.exports = class Event {
    constructor(data){
        this.id = data.id;
        this.habitId = data.habitid;
        this.plantId = data.plantid;
        this.usersId = data.usersid;
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let eventData = await db.query(`SELECT * FROM events;`);
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
                let eventData = await db.query(`SELECT * FROM events WHERE id = $1;`, [ id ]);
                let event = new Event(eventData.rows[0]);
                resolve (event);
            } catch (err) {
                reject('Event not found');
                console.log(err);
            }
        });
    };

    static async findAllById(data){
        return new Promise (async (resolve, reject) => {
            try {
                const { plantId, habitId, userId } = data;
                let eventData = await db.query(`SELECT *
                                                FROM events
                                                LEFT JOIN plants ON events.plantId = plants.plantId
                                                LEFT JOIN habits ON events.habitId = habits.habitId
                                                LEFT JOIN users ON events.userId = users.userId
                                                WHERE events.plantId = $1 
                                                AND events.habitId = $2 AND events.userId = $3;`, [ plantId, habitId, userId ]);
                let event = new Event(eventData.rows[0]);
                resolve (event);
            } catch (err) {
                reject('Event not found');
                console.log(err);
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM events WHERE id = $1 RETURNING *;', [ this.id ]);
                resolve('Event was deleted')
            } catch (err) {
                reject('Event could not be deleted')
                console.log(err)
            }
        })
    };
};