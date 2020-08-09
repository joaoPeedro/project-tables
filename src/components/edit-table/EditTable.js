import React from "react";

const EditTable = (props) => {

    const { idTable } = props
    
  var docRef = firebase.firestore().collection("tables").doc("idTable");

  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  return <div>teste</div>;
};

export default EditTable;
