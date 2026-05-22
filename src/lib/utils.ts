export const wipeStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
  indexedDB.databases().then(dbs => dbs.forEach(db => db.name && indexedDB.deleteDatabase(db.name)));
};