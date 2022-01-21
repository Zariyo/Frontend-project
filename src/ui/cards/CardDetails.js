import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { editCardAction } from "../../ducks/cards/CardActions";
const _ = require('lodash')

const CardDetails = ({ producents, card, history, editCardAction }, props) => {

    const checkRgb = () => {
        if (card.rgb === true) {
            return "Posiada oświetlenie RGB"
        }
        else return "Jest bez oświetlenia RGB"
    }

    const getUrl = (card) => {
        if (card.imageurl) {
            return card.imageurl
        }
        else {
            return 'https://cdn-icons-png.flaticon.com/512/1495/1495635.png'
        }
    }

    const getProducentUrl = () => {
        if (_.find(producents, { 'name': card.aib })) {
            console.log(card.aib)
            return <Link to={`/producents/details/${card.aib}`}>{card.aib}</Link>
        }
        else return "Producenta nie ma w bazie producentów"
    }

    return (

        <div>
            <h5>{card.aib + ' ' + card.model + ' ' + card.name}</h5>
            <div>
                <div className="details">

                    <img alt="" src={getUrl(card)}></img>
                    <div className="producent-link">{getProducentUrl()}</div>
                    <div>Karta serii {card.series} z rdzeniem wykonanym w architekturze {card.architecture} firmy {card.company}</div>
                    <div>Wydana w dniu {new Date(card.releaseDate).toLocaleDateString('pl-PL')}</div>
                    <div>Ten model {checkRgb()}</div>
                    <div>W benchmarku karta uzyskała wynik {card.score}</div>
                    <Link to={`/cards/${card._id}/edit`}><button>Edytuj</button></Link>
                </div>


            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    card: state.cards.find(card => card._id === props.match.params.id),
    producents: state.producents
});

const mapDispatchToProps = {
    editCardAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardDetails));
