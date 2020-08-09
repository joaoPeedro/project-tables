import React, { useState} from "react";

import Header from "./Header";
import Upload from "./Upload";
import CrudTable from "./CrudTable";
import DisplayTables from "./display-tables/DisplayTables";
import EditTable from "./edit-table/EditTable";

const TestComponent = (props) => {
  return (
    <div onClick={( )=> props.handleChangeScreen('editTables')} > test Máximo</div>
  )
  
}

const App = (props) => {

    const [screen, setScreen] = useState("home");

    const handleChangeScreen = (screenToRender) => {
        console.log(screenToRender)
        //setScreen(screenToRender);
      };


  const ScreenToRender = (props) => {
    const { handleChangeScreen } = props;
    console.log(props)
        let componentRendered;
    
        switch (screen) { 
          case "displayTables":
            componentRendered = <DisplayTables handleChangeScreen={handleChangeScreen}/>;
            break;
          case "upload":
            componentRendered = <Upload />;
            break;
          case "crudTable":
            componentRendered = <CrudTable />;
            break;
          case "editTable":
            // componentRendered = <EditTable idTable="test"/>;
            componentRendered = <TestComponent/>;
            break;
          default:
            componentRendered = <TestComponent/>;
        }
    
        return componentRendered;
      };


    return (

        <article className="container">

            <Header handleChangeScreen={handleChangeScreen}/>

            <section className="main-content">
               <ScreenToRender handleChangeScreen={handleChangeScreen}/>
            </section>
        </article>
        
    )
}

export default App;
