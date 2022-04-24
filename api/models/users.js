const db = require('../dbConfig/init');

module.exports = class User {
    constructor(data){
        this.id = data.id;
        this.username = data.username;
        this.password = data.password
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                console.log("is this working")
                let userData = await db.query('SELECT username FROM Users');
                let users = userData.rows.map(u => new User(u));
                resolve (users);
            } catch (err) {
                reject('Users not found');
                console.log(err);
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT * FROM WHERE id = $1;`, [ id ]);
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject('User not found');
                console.log(err);
            }
        });
    };

    static async create(user){
        return new Promise (async (resolve, reject) => {
            try {
                const { username, password } = userData;
                let createdUser = await db.query(`INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING *;`, [ username, password ]);
                let newUser = new User(createdUser.rows[0]);
                resolve  (newUser);
            } catch (err) {
                reject('User could not be created');
                console.log(err);
            }
        });
    };

    static update(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const { username, password, id } = data;
                let updatedUserData = await db.query(`UPDATE Users 
                                                       SET username = $1, password = $2
                                                       WHERE id = $3;`, [ username, password, id ]);
                let updatedUser = new User(updatedUserData.rows[0]);
                resolve (updatedUser);
            } catch (err) {
                reject('Error updating User');
                console.log(err);
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM Users WHERE id = $1 RETURNING *;', [ this.id ]);
                resolve('User was deleted')
            } catch (err) {
                reject('User could not be deleted')
                console.log(err)
            }
        })
    };
}