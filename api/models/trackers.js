const db = require('../dbConfig/init');

module.exports = class Tracker {
    constructor(data){
        this.id = data.id;
        this.habits = data.habits;
        this.count = data.count;
        this.habit_date = data.habit_date;
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
                let TrackerData = await db.query(`SELECT * FROM WHERE id = $1;`, [ id ]);
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
                const { habit, count, habit_date } = track;
                let createdTracker = await db.query(`INSERT INTO Trackers (habit, count, habit_date) VALUES ($1, $2, $3) RETURNING *;`, [ habit, count, habit_date ]);
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
                const { habit, count, habit_date, id } = data;
                let updatedTrackerData = await db.query(`UPDATE Trackers 
                                                       SET habits = $1, count = $2, habit_date = $3
                                                       WHERE id = $4;`, [ habit, count, habit_date, id ]);
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