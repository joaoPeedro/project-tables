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

const Modal = (props) => {
    const {showModal, type} = props
    return (
    <section className={`modal ${showModal ? "active" : ""}` }>
        <section className={`wrp ${type}`}>
        {props.children}
        </section>
      </section>
    )
}

export {PageTitle, Modal}