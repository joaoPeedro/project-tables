import React from 'react';
import TablesList from './TablesList'

const DisplayTables = (props) => {
  const { handleChangeScreen } = props
  
    return (
      <article className="container table-display">
        <section className="wrp">
                <h4>Tables List</h4>
                <TablesList handleChangeScreen={handleChangeScreen} />
        </section>
      </article>
    );
}

export default DisplayTables;