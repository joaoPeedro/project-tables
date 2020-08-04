import React, { useState} from "react";

import Header from "./Header";
import Upload from "./Upload";
import CrudTable from "./CrudTable";
import DisplayTables from "./DisplayTables";

const App = (props) => {

    const [screen, setScreen] = useState("home");

    const handleChangeScreen = (screenToRender) => {
        console.log(screenToRender)
        setScreen(screenToRender);
      };


    const ScreenToRender = () => {
        let componentRendered;
    
        switch (screen) { 
          case "displayTables":
            componentRendered = <DisplayTables />;
            break;
          case "upload":
            componentRendered = <Upload />;
            break;
          case "crudTable":
            componentRendered = <CrudTable />;
            break;
          default:
            componentRendered = <Upload />;
        }
    
        return componentRendered;
      };


    return (

        <article className="container">

            <Header handleChangeScreen={handleChangeScreen}/>

            <section className="main-content">
               <ScreenToRender/>
            </section>
        </article>
        
    )
}

export default App;
