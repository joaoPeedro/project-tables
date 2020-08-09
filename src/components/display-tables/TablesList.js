import React, {useState, useEffect}  from 'react'
import firebase from '../../configs/firebase';
import Icon from '@material-ui/core/Icon';
import { Edit, Delete,  } from '@material-ui/icons';


const useTables = () => {
  
    const [tables, setTables] = useState([]);

    useEffect(() => {
      console.log("entrei");
      const unsubscribe = firebase
        .firestore()
        .collection("tables")
        .onSnapshot(
          //{includeMetadataChanges: true}, // só após alteração no server
          (snapshot) => {
          // debugger;
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

const TablesList = (props) => {
  
  const { handleChangeScreen } = props;

    const tables = useTables()

    console.log(tables)
    return (
      <ul className="table-list">
        <li className="table-header">
          <div><h6>Title</h6></div>
        </li>
        {tables.map((table) => (
          <li key={table.id} className="table-item">
            <div className="table-name">
              <p>{table.configs.title && table.configs.title}</p>
            </div>
            <div>
              <span onClick={( )=> handleChangeScreen("editTables", {idTable : table.id})}>
                <Edit />
              </span>
            </div>
            <div>
              <span>
                <Delete />
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
}

export default TablesList;