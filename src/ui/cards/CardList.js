import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addCardAction, deleteCardAction, updateCardsAction, completeCardAction } from "../../ducks/cards/CardActions";
import { getCards } from "../../ducks/cards/CardOperations";
import { deleteCard } from "../../ducks/cards/CardOperations";
const axios = require('axios')
const _ = require('lodash')
const CardList = ({ cards, addCardAction, deleteCardAction, getCards }, props) => {

/*
    const getCards = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/cards/reload").then()
        await axios.get("http://localhost:5000/cards/")
            .then(async function (response) {
                console.log(response.data.allCards)
                await response.data.allCards.map(card => (addCardAction(card)))
            })
    }
    */

    const [cardsTemp, setCardsTemp] = useState(cards)

    useEffect(() => {
        setCardsTemp(cards)
        if (cards.length === 0) {
            getCards()
        }
    }, [cards])

    /*
    useEffect(() => {
        
    }, [])
    */

    
    const getCardsTemp = async (card) => {
        console.log("getting cards temp")
        await getCards()
        setCardsTemp(cards)
    }

    const deleteCardTemp = async (card) => {
        await deleteCard(card).then()
        setCardsTemp(cardsTemp.filter(el => el._id !== card._id))
    }
    

    const noCards = () => {
        if (cardsTemp.length === 0) {
            return <button onClick={() => getCardsTemp()}>Odswiez dane</button>
        }
    }

    const filterCards = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredCards = cards
        if (values.company) {
            filteredCards = _.filter(filteredCards, { 'aib': values.company })
        }
        if (values.manu) {
            filteredCards = _.filter(filteredCards, { 'company': values.manu })
        }
        if (values.rgb) {
            filteredCards = _.filter(filteredCards, { 'rgb': true })
        }
        setCardsTemp(filteredCards)
    }

    const sortCards = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setCardsTemp(_.sortBy(cardsTemp, ['aib', 'name', 'model']))
        }
        if (values.type === "datetime") {
            setCardsTemp(_.sortBy(cardsTemp, ['releaseDate', 'aib']))
        }
        if (values.type === "score") {
            setCardsTemp(_.sortBy(cardsTemp, ['score', 'aib']))
        }
    }

    const getUrl = (card) => {
        if (card.imageurl) {
            return card.imageurl
        }
        else {
            return 'https://cdn-icons-png.flaticon.com/512/1495/1495635.png'
        }
    }

    return (

        <div className="graphics-cards-main">


            <div className="view-options">
                <div className="Filters">
                    Filtrowanie
                    <Formik
                        initialValues={{
                            company: '',
                            manu: '',
                            rgb: '',
                        }}
                        onSubmit={(values) => filterCards(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="company">
                                Firma karty
                                <Field as="select" name="company">
                                    <option value="">Wybierz firme</option>
                                    {_.uniq(_.map(cards, 'aib')).map(maker => <option key={maker} value={maker}>{maker}</option>)}
                                </Field>
                            </div>
                            <div className="manu">
                                Producent karty
                                <label>
                                    Brak
                                    <Field type="radio" name="manu" value="" />
                                </label>
                                <label>
                                    AMD
                                    <Field type="radio" name="manu" value="AMD" />
                                </label>
                                <label>
                                    Nvidia
                                    <Field type="radio" name="manu" value="Nvidia" />
                                </label>
                            </div>
                            <div className="rgb">
                                <h1>Czy ma rgb?</h1>
                                <Field type="checkbox" name="rgb" />
                            </div>
                            <button type="submit">
                                Zatwierdz
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="Sorting">
                    Sortowanie
                    <Formik
                        initialValues={{
                            type: '',
                        }}
                        onSubmit={(values) => sortCards(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="sort-select">
                                <Field as="select" name="type">
                                    <option key="1" value="-">Wybierz sortowanie</option>
                                    <option key="2" value="alphabet">Alfabetycznie</option>
                                    <option key="3" value="datetime">Data wydania</option>
                                    <option key="4" value="score">Wynik</option>
                                </Field>
                            </div>
                            <button type="submit">
                                Zatwierdz
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className="ItemList">
                <h5>Karty Graficzne</h5>
                <Link to={`/cards/add`}> <button>Dodaj nowa karte</button></Link>
                {noCards()}
                <div className="ItemList-cards">
                    {cardsTemp.map(card => {
                        return (
                            <div className="Item" key={card._id}>
                                <Link to={`/cards/${card._id}`}>
                                    <img alt="" src={getUrl(card)}></img>
                                    {card.aib + ' ' + card.name}
                                </Link>
                                <button onClick={() => deleteCardTemp(card)}>Usuń</button>
                            </div>)
                    })}
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
    getCards
}


export default connect(mapStateToProps, mapDispatchToProps)(CardList);