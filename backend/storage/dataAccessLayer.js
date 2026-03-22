"use strict";

const { MESSAGES } = require("./statusCodes");
const Database = require("./database");
const sql = require("./sqlStatements.json");

const options = require("../config/options.json");

module.exports = class Datastorage {
  constructor() {
    this.db = new Database(options);
  }

    getAll(key) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await this.db.doQuery(sql.getAll, [key]);
          if (result.queryResult.length > 0) {
            resolve(result.queryResult[0]);
          } else {
            resolve(MESSAGES.NOT_FOUND(key));
          }
        } catch (err) {
          reject(MESSAGES.PROGRAM_ERROR());
        } 
      });
    }

    getAllLabelsForUser(key) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await this.db.doQuery(sql.getAllLabelsForUser, [key]);
          if (result.queryResult.length > 0) {
            resolve(result.queryResult[0]);
          } else {
            resolve(MESSAGES.NOT_FOUND(key));
          }
        } catch (err) {
          reject(MESSAGES.PROGRAM_ERROR());
        }
      });
    }

    getLabelsPerEntry(key) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await this.db.doQuery(sql.getLabelsPerEntry, [key]);
          if (result.queryResult.length > 0) {
            resolve(result.queryResult[0]);
          } else {
            resolve(MESSAGES.NOT_FOUND(key));
          }
        } catch (err) {
          reject(MESSAGES.PROGRAM_ERROR());
        }
      });
    }

    insertUser(resource) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!resource.id === Number && !resource.id.trim()) {
            reject(MESSAGES.NOT_INSERTED());
          } else {
            await this.db.doQuery(sql.addUser, [
              resource.name,
              +resource.id,
            ]);
            resolve(MESSAGES.INSERT_OK(resource.id));
          }
        } catch (err) {
          console.log(err);
          reject(MESSAGES.NOT_INSERTED());
        }
      });
    }

  
    insertUserData(resource) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!resource.id === Number && !resource.id.trim()) {
            reject(MESSAGES.NOT_INSERTED());
          } else {
            await this.db.doQuery(sql.addUserData, [
              +resource.age,
              +resource.partnersAge,
              +resource.id
            ]);
            resolve(MESSAGES.INSERT_OK( resource.id));
          }
        } catch (err) {
          console.log(err);
          reject(MESSAGES.NOT_INSERTED());
        }
      });
    }

    insertUserAndUserData(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!resource.id === Number && !resource.id.trim()) {
          reject(MESSAGES.NOT_INSERTED());
        } else {
          await this.db.doQuery(sql.linkUserAndUserData, [
            +resource.userId,
            +resource.userDataId,
            +resource.id
          ]);
          resolve(MESSAGES.INSERT_OK(resource.id ));
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  insertDiaryEntry(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!resource.id === Number && !resource.id.trim()) {
          reject(MESSAGES.NOT_INSERTED());
        } else {
          await this.db.doQuery(sql.insertDiaryEntry, [
            resource.text,
            +resource.userId,
            resource.dateAndTime,
            +resource.id
          ]);
          resolve(MESSAGES.INSERT_OK( resource.id));
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  insertLabel(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!resource.id === Number && !resource.id.trim()) {
          reject(MESSAGES.NOT_INSERTED());
        } else {
          await this.db.doQuery(sql.addLabel, [
            +resource.labelId,
            +resource.diaryId,
            +resource.id
          ]);
          resolve(MESSAGES.INSERT_OK(resource.id));
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }
};
  /*
  update(key, resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (key && resource) {
          if (resource[PRIMARY_KEY] != key) {
            reject(MESSAGES.KEYS_DO_NOT_MATCH());
          } else {
            const resultGet = await this.db.doQuery(sql.get, [key]);
            if (resultGet.queryResult.length > 0) {
              const result = await this.db.doQuery(sql.update, [
                resource.name,
                +resource.age,
                resource.speed,
                +resource.weightKg,
                +resource.number,
              ]);
              if (result.queryResult.rowsChanged === 0) {
                resolve(MESSAGES.NOT_UPDATED());
              } else {
                resolve(MESSAGES.UPDATE_OK());
              }
            } else {
              this.insert(resource)
                .then((status) => resolve(status))
                .catch((err) => reject(err));
            }
          }
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  remove(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(sql.remove, [key]);
        if (result.queryResult.rowsChanged === 1) {
          resolve(MESSAGES.DELETE_OK());
        } else {
          resolve(MESSAGES.NOT_FOUND());
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};
*/