import React from 'react';
import TablesList from './TablesList'

const DisplayTables = () => {
    return (
      <article className="container table-display">
        <section className="wrp">
                <h4>DisplayTables</h4>
                <TablesList />
        </section>
      </article>
    );
}

export default DisplayTables;