import React from 'react'


const PageTitle = (props) => {
    const {title} = props
    return (
        <section className="page-title">
            <h4>{title}</h4>
            {props.children}
        </section>
    )
}

export {PageTitle}