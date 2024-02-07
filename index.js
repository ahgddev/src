// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

let userDB = (database, value, uID) => {
  return new Promise((resolve, reject) => {
    resolve(database[value](uID));
    reject("This ID not in this Database.");
});
}

let userVault = (dbVault, uID) => {
  return new Promise((resolve, reject) => {
    resolve(dbVault(uID));
    reject("This ID is not in this Vault.");
});
}

let userDataProcess = (dataDB) => {
  let user = {name: dataDB.username,
  }
  return user
}

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
  // Part 1: The Scenario
  try {
    const returnedValue = await central(id);
    // let dbresult = await userDB(dbs, returnedValue, id);
    // let vaultresult = await userVault(vault, id);
      let userDataPromise = await Promise.all([
        userDB(dbs, returnedValue, id),
        userVault(vault, id)
      ]).then(([db, vault]) => {
        userDataProcess(db)
      });
      // console.log(promise)
      // await userDataProcess().then(promise => userDataProcess(promise))
    userDataPromise();
  } catch (error) {
    console.log("User does not exist")
  }
}

// Async function to perform execution of all promise

getUserData(1)
