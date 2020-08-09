const configs = {
    title: "", // block of tables title
    isActive : true, // true||false
    urlPages: [
        {
            site: "",
            url: ""
        }
    ],
    isEditing: true, // true||false
    activeUser: "", // user.userName
    userEditList: [
        {
            userName: "",
            userId: "",
            date: "date"
        }
    ]
}

const content = {
    blTableMobile: true, // true||false
    containerClass:"", // extra-large | large | medium | small
    tables: []
}


const schema = {
    title: "Configs",
    type: "object",
    required: ["title"],
    properties: {
      title: {
        type: "string",
        title: "Title",
        default: "A new task",
      },
      isActive: {
        type: "boolean",
        title: "isActive",
        default: false,
        },
        urlPages: {
            type: "array",
            title: "Url Pages",
            items: {
                type: "object",
                required: [],
                properties: {
                    Site: {
                        type: "string",
                        title: "Site",
                        description: "",
                    },
                    url: {
                        type: "string",
                        title: "url",
                        description: "",
                    },
                }
            }
        },
      content: {
        type: "string",
        title: "TableContent",
        default: "A new task",
      },
      tasks: {
        type: "array",
        title: "Tasks",
        items: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              title: "Title",
              description: "A sample title",
            },
            details: {
              type: "string",
              title: "Task details",
              description: "Enter the task details",
            },
            done: {
              type: "boolean",
              title: "Done?",
              default: false,
            },
          },
        },
      },
    },
};
  
/* tables: {
    type: "array",
    title: "tables",
    items: {
      type: "object",
      required: ["table"],
      properties: {
        table: {
          type: "string",
          title: "table",
          description: "",
        },
      },
    },
  }, */