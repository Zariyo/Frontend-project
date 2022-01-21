import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { editProducentAction } from "../../ducks/producents/ProducentActions";
const _ = require('lodash')

const ProducentDetails = ({ producent, cards, history, editProducentAction }, props) => {

    const getUrl = (producent) => {
        if (producent.imgurl) {
            return producent.imgurl
        }
        else {
            return 'https://loans2go.co.uk/wp-content/uploads/2021/10/35a6130fd209f482213be4663dbfc499.png'
        }
    }

    return (

        <div>
            <h5>Konfiguracja przedmiotu w paczce</h5>
            <div>
                <div className="details">
                    <h5>{producent.name}</h5>
                    <img alt="" src={getUrl(producent)}></img>
                    <div>Siedziba firmy znajduje się w {producent.address}, {producent.country}</div>
                    <div>Założona została dnia {new Date(producent.creationDate).toLocaleDateString('pl-PL')}</div>
                    <div>Numer kontaktowy do firmy: {producent.phone}</div>
                    <div>Wydaje karty dla: {producent.supports.map(company => <div key={company}>{company}</div>)}</div>
                    <div>Wydane karty: {_.filter(cards, { 'aib': producent.name }).map(card => <div className="released-card" key={card._id}>{<Link to={`/cards/${card._id}`}>{card.name + ' ' + card.model}</Link>}</div>)}</div>
                    <Link to={`/producents/${producent.name}/edit`}><button>Edytuj</button></Link>
                </div>


            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    producent: state.producents.find(producent => producent.name === props.match.params.name),
    cards: state.cards
});

const mapDispatchToProps = {
    editProducentAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducentDetails));