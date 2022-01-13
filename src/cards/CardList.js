import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import CardForm from './CardForm'
import { addCardAction, deleteCardAction, updateCardsAction, completeCardAction } from "../cards/CardActions";
import { productDownloadedChangeAction } from "../downloaded/DownloadedActions";
const axios = require('axios')
const _ = require('lodash')
const CardList = ({ cards, addCardAction, updateCardsAction, completeCardAction, deleteCardAction, productDownloadedChangeAction, downloaded }, props) => {


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
            <h5>Karty Graficzne</h5>
            <Link to={`/cards/add`}> Dodaj nowa karte</Link>
            <div className="ItemList">
                {noCards()}
                {cards.map(card => {
                    return (
                        <div className="Item" key={card._id}>
                            <Link to={`/cards/${card._id}`}>Karta: {card.name}</Link>
                            <button onClick={() => deleteCardAction(card)}>Usuń</button>
                        </div>)
                })}
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


export default connect(mapStateToProps, mapDispatchToProps)(CardList);