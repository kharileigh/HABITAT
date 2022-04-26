const db = require('../dbConfig/init');

module.exports = class Tracker {
    constructor(data){
        this.id = data.id;
        this.habit = data.habit;
        this.count = data.count;
        this.frequency = data.frequency;
        this.created_on = data.created_on;
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                console.log("is this working")
                let trackerData = await db.query('SELECT * FROM trackers');
                let trackers = trackerData.rows.map(t => new Tracker(t));
                resolve (trackers);
            } catch (err) {
                reject('Trackers not found');
                console.log(err);
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let TrackerData = await db.query(`SELECT * FROM trackers WHERE id = $1;`, [ id ]);
                let Track = new Tracker(TrackerData.rows[0]);
                resolve (Track);
            } catch (err) {
                reject('Tracker not found');
                console.log(err);
            }
        });
    };

    static async create(track){
        return new Promise (async (resolve, reject) => {
            try {
                const { habit, count, frequency } = track;
                let createdTracker = await db.query(`INSERT INTO Trackers (habit, count, frequency) VALUES ($1, $2, $3) RETURNING *;`, [ habit, count, frequency ]);
                let newTracker = new Tracker(createdTracker.rows[0]);
                resolve  (newTracker);
            } catch (err) {
                reject('Tracker could not be created');
                console.log(err);
            }
        });
    };

    static update(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const { habit, count, id } = data;
                let updatedTrackerData = await db.query(`UPDATE Trackers 
                                                       SET habits = $1, count = $2, 
                                                       WHERE id = $3;`, [ habit, count, id ]);
                let updatedTracker = new Tracker(updatedTrackerData.rows[0]);
                resolve (updatedTracker);
            } catch (err) {
                reject('Error updating Tracker');
                console.log(err);
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM Trackers WHERE id = $1 RETURNING *;', [ this.id ]);
                resolve('Tracker was deleted')
            } catch (err) {
                reject('Tracker could not be deleted')
                console.log(err)
            }
        })
    };
};