import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { editCardAction } from "../../ducks/cards/CardActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const CardForm = ({ card, history, editCardAction }, props) => {
    useEffect(() => {
        console.log(props.cards);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const cardToAdd = await axios.put(`http://localhost:5000/cards/${card._id}`, values)
            editCardAction(cardToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/cards`);
    }

    const cardSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Nazwa karty jest wymagana"),
        series: Yup.string("Seria musi byc typu string").required("Seria karty jest wymagana"),
        releaseDate: Yup.date("Data musi byc typu daty").required("Data wydania karty jest wymagana"),
        architecture: Yup.string("Architektura musi byc typu string").required("Architektura karty jest wymagana"),
        company: Yup.string("Firma musi byc typu string").required("Firma karty jest wymagana"),
        aib: Yup.string("Producent musi byc typu string").required("Producent karty jest wymagany"),
        model: Yup.string("Model musi byc typu string").required("Model karty jest wymagany"),
        score: Yup.number("Wynik musi byc typu numerowego").required("Wynik karty jest wymagany"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku"),
        rgb: Yup.boolean("rgb musi byc booleanskie")
    })

    return (
        <div>
            <h3>Karta</h3>
            <Formik
                initialValues={{
                    name: card.name,
                    series: card.series,
                    releaseDate: card.releaseDate,
                    architecture: card.architecture,
                    company: card.company,
                    aib: card.aib,
                    model: card.model,
                    score: card.score,
                    imageurl: card.imageurl,
                    rgb: card.rgb,
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={cardSchema}>
                <Form>
                    <div className="card-submit-form">
                        Firma
                        <div className="manu">
                            <label>
                                AMD
                                <Field type="radio" name="company" value="AMD" />
                            </label>
                            <label>
                                Nvidia
                                <Field type="radio" name="company" value="Nvidia" />
                                <ErrorMessage name="company" className="error" component="div" />
                            </label>
                        </div>
                        Nazwa karty
                        <div className="form-name">
                            <Field name="name" />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-series">
                            Seria karty
                            <Field name="series" />
                            <ErrorMessage name="series" className="error" component="div" />
                        </div>
                        <div className="form-releaseDate">
                            Data wydania
                            <Field name="releaseDate" type="date" />
                            <ErrorMessage name="releaseDate" className="error" component="div" />
                        </div>
                        <div className="form-architecture">
                            Architektura
                            <Field name="architecture" />
                            <ErrorMessage name="architecture" className="error" component="div" />
                        </div>
                        <div className="form-aib">
                            Producent
                            <Field name="aib" />
                            <ErrorMessage name="aib" className="error" component="div" />
                        </div>
                        <div className="form-model">
                            Model karty
                            <Field name="model" />
                            <ErrorMessage name="model" className="error" component="div" />
                        </div>
                        <div className="form-imageurl">
                            Adres do zdjecia
                            <Field name="imageurl" />
                            <ErrorMessage name="imageurl" className="error" component="div" />
                        </div>
                        <div className="form-rgb">
                            RGB
                            <Field type="checkbox" name="rgb" />
                            <ErrorMessage name="rgb" className="error" component="div" />
                        </div>
                        <div className="form-score">
                            Wynik benchmark
                            <Field name="score" />
                            <ErrorMessage name="score" className="error" component="div" />
                        </div >
                        <button type="submit">
                            Zatwierdz
                        </button>
                    </div>
                </Form>

            </Formik>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        cards: state.cards,
        card: state.cards.find(card => card._id === props.match.params.id)
    }
};

const mapDispatchToProps = {
    editCardAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardForm));
