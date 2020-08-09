import React, { useState } from "react";

import Header from "./Header";
import Upload from "./Upload";
import CrudTable from "./CrudTable";
import DisplayTables from "./display-tables/DisplayTables";
import EditTable from "./edit-table/EditTable";

const App = (props) => {
  const [screen, setScreen] = useState("home");
  const [tableToEdit, setTableToEdit] = useState();

  const handleChangeScreen = (screenToRender, idTable) => {
    console.log(screenToRender, idTable);
    idTable ? setTableToEdit(idTable.idTable) : null;
    setScreen(screenToRender);
  };

  const ScreenToRender = (props) => {
    const { handleChangeScreen } = props;
    
    let componentRendered;

    switch (screen) {
      case "displayTables":
        componentRendered = (
          <DisplayTables handleChangeScreen={handleChangeScreen} />
        );
        break;
      case "upload":
        componentRendered = <Upload />;
        break;
      case "crudTable":
        componentRendered = <CrudTable />;
        break;
      case "editTable":
        componentRendered = <EditTable idTable={tableToEdit} handleChangeScreen={handleChangeScreen}/>;
        break;
      default:
        componentRendered = (
          <DisplayTables handleChangeScreen={handleChangeScreen} />
          // <EditTable idTable={tableToEdit} handleChangeScreen={handleChangeScreen}/>
        );
    }

    return componentRendered;
  };

  return (
    <article className="container">
      <Header handleChangeScreen={handleChangeScreen} />

      <section className="main-content">
        <ScreenToRender handleChangeScreen={handleChangeScreen} />
      </section>
    </article>
  );
};

export default App;
