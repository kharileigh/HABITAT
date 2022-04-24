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
                let trackerData = await db.query('SELECT * FROM Trackers');
                let trackers = trackerData.rows.map(t => new Tracker(t));
                resolve (trackers);
            } catch (err) {
                reject('Trackers not found');
                console.log(err);
            }
        });
    };
};