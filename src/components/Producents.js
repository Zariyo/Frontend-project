import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import CardForm from './CardForm'
import { addCardAction, deleteCardAction, updateCardsAction, completeCardAction } from "../cards/CardActions";
import { productDownloadedChangeAction } from "../downloaded/DownloadedActions";
const axios = require('axios')
const _ = require('lodash')
const Producents = ({ cards, addCardAction, updateCardsAction, completeCardAction, deleteCardAction, productDownloadedChangeAction, downloaded }, props) => {


    const getCards = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/cards/reload")
        await axios.get("http://localhost:5000/cards")
        .then(function (response) {
                console.log(response.data.allCards)
                response.data.allCards.map(card => (addCardAction(card)))
                productDownloadedChangeAction()
        })
    }   
 
    useEffect(() => {
        if (!downloaded[0]) {
            getCards() 
        }
    }, [downloaded])

    const noCards = () => {
        if (cards.length == 0) {
            return <button onClick={()=>productDownloadedChangeAction()}>Odswiez dane</button>
        }
    }

    return (
        <div>
            <h5>Producenci</h5>
            <Link to={`/cards/add`}> Dodaj nowa karte</Link>
            <div className="ItemList">
                <div className="Zotac" onClick={()=>setAib("Zotac")}>
                    Zotac
                </div>
                <div className="MSI" onClick={()=>setAib("MSI")}>
                    MSI
                </div>
                <div className="Gigabyte" onClick={()=>setAib("Gigabyte")}>
                    Gigabyte
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateCardsAction,
    addCardAction,
    deleteCardAction,
    completeCardAction,
    productDownloadedChangeAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Producents);