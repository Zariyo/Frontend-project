import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import ProducentForm from '../producents/ProducentForm'
import { addProducentAction, deleteProducentAction, updateProducentsAction, completeProducentAction } from "../producents/ProducentActions";
import { userDownloadedChangeAction } from "../downloaded/DownloadedActions";
const axios = require('axios')
const _ = require('lodash')
const Producents = ({ producents, addProducentAction, updateProducentsAction, completeProducentAction, deleteProducentAction, productDownloadedChangeAction, downloaded }, props) => { 


    const getProducents = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/producents/reload")
        await axios.get("http://localhost:5000/producents")
        .then(function (response) {
                console.log(response.data.allProducents)
                response.data.allProducents.map(producent => (addProducentAction(producent)))
                userDownloadedChangeAction()
        })
    }   

    useEffect(() => {
        if (!downloaded[1]) {
            getProducents() 
        }
    }, [downloaded])

    const noProducents = () => {
        if (producents.length == 0) {
            return <button onClick={()=>userDownloadedChangeAction()}>Odswiez dane</button>
        }
    }

    const setAib = () => {
        
    }



    return (
        <div>
            <h5>Producenci</h5>
            <Link to={`/producents/add`}> Dodaj nowego producenta</Link>
            {noProducents()}
            
            {producents.map(producent => {
    return (
        <div className="Item" key={producent.name}>
            <Link to={`/producents/${producent.name}`}>Producent: {producent.name}</Link>
            <button onClick={() => deleteProducentAction(producent)}>Usuń</button>
        </div>)
})}

            <div className="ItemList">
                {console.log("123")}
                {console.log(producents)}
            
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        producents: state.producents,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateProducentsAction,
    addProducentAction,
    deleteProducentAction,
    completeProducentAction,
    userDownloadedChangeAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Producents);

/*
{producents.map(producent => {
    return (
        <div className="Item" key={producent.name}>
            <Link to={`/producents/${producent.name}`}>Producent: {producent.name}</Link>
            <button onClick={() => deleteProducentAction(producent)}>Usuń</button>
        </div>)
})}
*/