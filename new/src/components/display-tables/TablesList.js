import React, {useState, useEffect}  from 'react'
import firebase from '../../configs/firebase';
import Icon from '@material-ui/core/Icon';
import { Edit, Delete, EditOutlined, } from '@material-ui/icons';
import {Modal} from "../ui/components"
import { Button } from '@material-ui/core';


const useTables = () => {
  
  const [tables, setTables] = useState([]);

    useEffect(() => {
      console.log("entrei");
      const unsubscribe = firebase
        .firestore()
        .collection("tables")
        .onSnapshot(
          {includeMetadataChanges: true}, // só após alteração no server
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
  
  const [tableToRemove, setTableToRemove] = useState({
    tableId: "",
    tableTitle: ""
  });
  const [showModal, setShowModal] = useState(false);

  const tables = useTables(); // bd connection
  

const handleShowModal = (tableId, tableTitle) => {
  setShowModal(true);
  setTableToRemove({
    tableId: tableId,
    tableTitle: tableTitle
  });
}
  const handleDeleteTable = () => {
  
    firebase
      .firestore()
      .collection("tables")
      .doc(tableToRemove.tableId)
      .delete()
      .then(function () {
        setTableToRemove({
          tableId: "",
          tableTitle: ""
        });
        setShowModal(false);
    })
    .catch(function (error) {
      console.log("Error deleting table:", error);
    });
 
}

    // console.log(tables)
  return (
      <>
      <ul className="table-list">
        <li className="table-header">
          <div><h6>Title</h6></div>
        </li>
        {tables.map((table, idx) => (
          <li key={table.id} className="table-item">
            <div className="table-name">
              <p>{table.configs.title && table.configs.title}</p>
            </div>
            <div className="table-controller">
              {table.configs.isEditing === false ? 
                <span className="controller" onClick={( )=> handleChangeScreen("editTable", {idTable : table.id})}>
                <EditOutlined />
                </span> :
                <span className="controller-disabled" >
                <Edit />
              </span>
              }
              
            </div>
            <div className="table-controller">
              <span className="controller" onClick={()=> handleShowModal(table.id, table.configs.title )}>
                <Delete />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Modal showModal={showModal} type="small" >
        <span>
          <h4>Tem a certeza que pretende apagar a seguinte tabela:</h4>
          <br />
          <p>{tableToRemove.tableTitle}</p>
        </span>
        <ul className="links">
          <li><Button variant="contained" onClick={() => setShowModal(false)}>Cancelar</Button></li>
          <li><Button
            variant="contained"
            color="primary"
            onClick={() => handleDeleteTable()}
          > Confirmar </Button></li>
        </ul>
        
        
      </Modal>
      </>
    );
}

export default TablesList;