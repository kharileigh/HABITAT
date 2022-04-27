const db = require('../dbConfig/init');

/**
 * An app user
 */
class User {

    /**
     * Creates a new User object
     * 
     * @param {object} data User details from the database 
     */
    constructor (data) {
        this.id = data.user_id;
        this.username = data.user_name;
        this.password = data.user_password;
        this.email = data.user_email;
        this.role = data.user_role;
    }


    /**
     * @returns {object} Non-sensitive user details 
     */
    get details () {
        return {
            id : this.id,
            username : this.username,
            role : this.role
        }
    }

    /**
     * Extracts an array of User objects from the database
     * 
     * @returns {Promise} A promise that resolves to an array of User instances
     */
    static getAll() {
        return new Promise( async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM user_account;`);
                const users = result.rows.map(r => new User(r));
                resolve(users);
            } catch (err) {
                reject(err);
            }
        })
    }

    /**
     * Registers a new user
     * 
     * @param {object} data An object describing a user
     * @returns {Promise} A promise that resolves to a User object
     */
    static create(data) {
        return new Promise( async (resolve, reject) => {
            try {
                const result = await db.query(`INSERT INTO user_account (
                                                user_name,
                                                user_password,
                                                user_email,
                                                user_role
                                            ) VALUES (
                                                $1, $2, $3, $4
                                            ) RETURNING *;`,
                                              [data.username,
                                               data.password,
                                               data.email,
                                               data.role]);
                const user = new User(result.rows[0]);
                resolve(user);
            } catch (err) {
                let error = { code : 500, message : err.message };
                if (err.hasOwnProperty("constraint")) {
                    switch (err["constraint"]) {
                        case "duplicate_username":
                            error = { code : 400, message : "Username already in use" };
                            break;
                        case "duplicate_email":
                            error = { code : 400, message : "Email already in use" };
                            break;
                        case "username_length":
                            error = { code : 400, message : "Username length must be between 3 and 30 characters" };
                            break;
                    }
                }
                reject(error);
            }
        })
    }

    /**
     * Returns a user object matching a given username
     * 
     * @param {string} username the username to search for
     * @returns {object} A user object
     */
    static getUserByUsername (username) {
        return new Promise ( async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT *
                FROM user_account
                WHERE user_name = $1;`, [username]);

                if (result.rows.length != 1) {
                    throw {code : 404, message : "Unable to locate user"};
                }

                const user = new User(result.rows[0]);
                resolve(user);

            } catch (err) {

                // Handle unanticipated Postgres errors
                if (typeof err.code == "string") {
                    err = { code : 500, message : err.message };
                }
                console.log(err);
                reject (err);
            }
        })
    }

    static deleteUserByUsername (username) {
        return new Promise ( async (resolve, reject) => {
            try {
                const result = await db.query(`DELETE
                                                FROM user_account
                                                WHERE user_name = $1
                                                RETURNING user_name;`, [username]);
                resolve('User was deleted!')

            } catch (err) {

                // Handle unanticipated Postgres errors
                if (typeof err.code == "string") {
                    err = { code : 500, message : err.message };
                }
                
                console.log(err);
                reject (err);

            }
        })
    }
}

module.exports = User;