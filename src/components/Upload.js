import React, { useState, useEffect } from "react";
import firebase from "../configs/firebase";
// import Form from "@rjsf/core";
import Form from "@rjsf/material-ui";

import Button from "@material-ui/core/Button";

import { PageTitle } from "./ui/components";
/* 
const Form = JSONSchemaForm.default; */
// const { default: Form } = JSONSchemaForm;

//val = val.replace(/\r?\n/g, "").replace(/\r?\t/g, "")

const Upload = () => {
  const initialState = {
    configs: {
      title: "", // block of tables title
      isActive: true, // true||false
      urlPages: [
        {
          site: "",
          url: "",
        },
      ],
      isEditing: false, // true||false
      activeUser: "", // user.userName
      userEditList: [
        // {
        //   userName: "",
        //   userId: "",
        //   date: "",
        // },
      ],
    },

    content: {
      blTableMobile: true, // true||false
      containerClass: "",
      tables: [],
    },
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

  const validateData = (data) => {
    // console.log(data);
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
      setNewTableDb(newBlTables);
    } catch (error) {
      alert(error);
    }
  };

  const setNewTableDb = (data) => {
    firebase.firestore().collection("tables").add(data).then(
      setFormData(initialState)
    );
  };

  const log = (type) => console.log.bind(console, type);

  return (
    <article className="container table-upload">
      <section className="wrp">
        <PageTitle title="Upload Table" />
        <Form
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          onChange={(e) => setFormData(e.formData)}
          //   onSubmit={log("submitted")}
          onSubmit={(e) => validateData(e.formData)}
          //   onSubmit={(e) => console.log(e.formData)}
          onError={log("errors")}
          className={"upload-tables"}
          //   tagName="div"
        >
          <div>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            {/* <button type="button">Cancel</button> */}
          </div>
        </Form>
      </section>
    </article>
  );
};

export default Upload;
