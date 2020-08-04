import React, {useState, useEffect}  from 'react'
import firebase from '../configs/firebase';

const useTables = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
      console.log("entrei");
      const unsubscribe = firebase
        .firestore()
        .collection("tables")
        .onSnapshot((snapshot) => {
          debugger;
          console.log("BD", snapshot.docs);
          console.log(
            "info BD",
            snapshot.docs[0],
            snapshot.docs[0].id,
            snapshot.docs[0].data()
          );

          const newTables = snapshot.docs.map((table) => ({
            id: table.id,
            ...table.data(),
          }));

          setTables(newTables);
        });

    //   firebase
    //     .firestore()
    //     .collection("tables")
    //     .add({
    //       configs: { ambient: "meo", active: true },
    //       content: "string com muita coisa",
    //     });

      //on did unmount unsubscribe the connection
      return () => unsubscribe();
    }, []);
    return tables
}

const TablesList = () => {

    const tables = useTables()

    console.log(tables)
    return (
      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            <p>{/* {table.configs} */}</p>
            <p>{table.content}</p>
          </li>
        ))}
      </ul>
    );
}

export default TablesList;