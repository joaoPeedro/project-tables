import React, { useEffect, useState, useReducer } from "react";
import firebase from "../../configs/firebase";
import Form from "@rjsf/material-ui";
import { PageTitle } from '../ui/components';

import Button from "@material-ui/core/Button";

const formReducer = (state, action) => {
  let newState = { ...state };
  console.log("newState", newState)
	switch(action.type) {
		case "SETCONFIGS": {
			// newState["configs"][action.payload.type] = action.payload.value;
			newState["configs"] = action.payload;
			break;
		} 
		case "SETCONTENT": {
      // newState["configs"][action.payload.type] = action.payload.value;
      let newContent = { ...action.payload };
      let newContentTables = [] 

      action.payload.tables.map((item, idx) => {
        newContentTables[idx] = JSON.stringify(item, null, 2)
      })

      newContent.tables = newContentTables

			newState["content"] = newContent;
			break;
    } 
    case "SETALL": {
			// newState["configs"][action.payload.type] = action.payload.value;
			newState = action.payload;
			break;
		} 
	}
	return newState;
}



const EditTable = (props) => {
  const { idTable = "7PxyTmnOZy2bDPewDVq9", handleChangeScreen } = props; 
  // const initialState = {
  //   configs: {
  //     title: "", // block of tables title
  //     isActive: true, // true||false
  //     urlPages: [
  //       {
  //         site: "teste site",
  //         url: "test url",
  //       },
  //     ],
  //     isEditing: false, // true||false
  //     activeUser: "", // user.userName
  //     userEditList: [
  //       // {
  //       //   userName: "",
  //       //   userId: "",
  //       //   date: "",
  //       // },
  //     ],
  //   },

  //   content: {
  //     blTableMobile: true, // true||false
  //     containerClass: "",
  //     tables: [],
  //   },
  // };

  const initialState = null;

  const [formData, dispatchForm] = useReducer(formReducer, initialState);

  	// for change events dispatch a SET action with the values it needs to change
	// this is what changes the selectedState variable 
  const handleChange = (setType, dataPayload) => {
    
    // console.log("handleChange", dataType)
    dispatchForm({
      type: setType, payload: dataPayload
      /* {
			type: "title",
			value: "valueId"
		} */
		})
	};

  useEffect(() => {
    var docRef = firebase.firestore().collection("tables").doc(idTable);
    


    docRef.set(
      {
        configs: {
          isEditing: true,
        },
      },
      { merge: true }
    )

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const data = doc.data()
          console.log("Document data:", data); 

          handleChange("SETCONFIGS", data.configs)
          handleChange("SETCONTENT", data.content)

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    window.addEventListener("unload", (ev) => {
      ev.preventDefault();
      docRef.set(
        {
          configs: {
            isEditing: false,
          },
        },
        { merge: true }
      );
    });

    return () => {
      docRef.set(
        {
          configs: {
            isEditing: false,
          },
        },
        { merge: true }
      ); 
    };
  }, []);

  const schema = {
    // title: "BlockTables",
    type: "object",
    required: [],
    properties: {
      configs: {
        type: "object",
        title: "Configs",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            title: "Title",
            default: "",
          },
          isActive: {
            type: "boolean",
            title: "isActive",
            default: false,
          },
          urlPages: {
            type: "array",
            title: "Page location",
            items: {
              type: "object",
              required: [],
              properties: {
                site: {
                  type: "string",
                  title: "Site",
                  description: "",
                },
                url: {
                  type: "string",
                  title: "url",
                  description: "",
                },
              },
            },
          },
        },
      },
      content: {
        type: "object",
        title: "content",

        properties: {
          containerClass: {
            type: "string",
            title: "container class",
            enum: ["extra-large", "large", "medium", "small"],
          },
          blTableMobile: {
            type: "boolean",
            title: "mobile tab",
            default: true,
          },

          tables: {
            type: "array",
            title: "tables",
            required: ["items"],
            items: {
              type: "string",
              title: "table",
              description: "",
            },
          },
        },
        required: ["tables"],
      },
    },
  };

  const uiSchema = {
    configs: {
      title: {
        "ui:autofocus": true,
        //  "classNames": "task-title foo-bar" // only with @rjsf/core
      },
    },
    content: {
      tables: {
        items: {
          //   table: {
          "ui:widget": "textarea",
          "ui:autofocus": false,
          "ui:emptyValue": "",
          "ui:autocomplete": "",
          "ui:description": "JSON - table content",

          "ui:options": {
            rows: 16,
          },
          //   },
        },
      },
    },
  };

  const log = (type) => console.log.bind(console, type);

  const validateData = (data) => {
    // console.log(data);
    // spaces .replace(/\s+/g, '')
    // let d = data.content.tables[0].replace(/\"\"/g, "'").replace(/\r?\n/g, "").replace('\t','').replace('   ', '')/* .replace(/\r?\n/g, "") *//* .replace(/\r?\t/g, ""); */
    //let d = `${data.content.tables[0].replace(/\r?\n/g, "")}`

    if (data.content.tables === undefined || data.content.tables.length <= 0) {
      alert("tables list is empty");
      return;
    }

    try {
      let newBlTables = formData;
      let tempTableList = [];

      data.content.tables.map((item, idx) => {
        let table = JSON.parse(item.replace(/\r?\n/g, ""));
        tempTableList[idx] = table;
      });

      newBlTables.content.tables = tempTableList;
      console.log("validado", newBlTables)
      setNewTableDb(newBlTables);
    } catch (error) {
      alert(error);
    }
  };

  const setNewTableDb = (data) => {
    firebase.firestore().collection("tables").doc(idTable).set(data, { merge: false }).then(
      // console.log("Daqui para fora", data)
      handleChangeScreen("displayTables")
    );
  };

  return (
    <article className="container table-upload">
    <section className="wrp">
        <PageTitle title="Edit Table" />
        {formData ? 
                <Form
                schema={schema}
                formData={formData}
                uiSchema={uiSchema}
                onChange={(e) => handleChange("SETALL", e.formData)}
                //   onSubmit={log("submitted")}
                onSubmit={(e) => validateData(e.formData)}
                // onSubmit={(e) => console.log(e.formData)}
                //   onSubmit={(e) => console.log(e.formData)}
                onError={log("errors")}
                className={"edit-tables"}
                //   tagName="div"
              >
                <div>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                  {/* <button type="button">Cancel</button> */}
                </div>
          </Form> :
          "LOADING..."
          }

    </section>
  </article>
    );
};

export default EditTable;
