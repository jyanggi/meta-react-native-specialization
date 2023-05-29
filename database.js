import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('little_lemon');



export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists menuitems (
            id integer primary key autoincrement,
            name text,
            price decimal,
            description text,
            image text,
            category text)`
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    const query =  `insert into menuitems (name, price, description, image, category) values ${menuItems
      .map((item) =>
      `('${item.name}', '${item.price}', '${item.description.replace(/\'/g,"''")}', '${item.image}', '${item.category}')`).join(', ')}`;
    console.log(query);
    tx.executeSql(
     query,
      [],
      (tx, results) => {
        if (results.rowsAffected > 0 ) {
          console.log('Insert success');
        } else {
          console.log('Insert failed');
        }
      }
    );
  });
}

export async function filterByQueryAndCategories(q, activeCategories) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      const query = `select * from menuitems WHERE  category in (${activeCategories.map(c=> `'${c.toLowerCase()}'`).join(",")}) ${q?  `AND name like '%${q}%'`: ''} `;
      console.log(query);
      tx.executeSql(query, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
