import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { addCardAction } from "../../ducks/cards/CardActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const CardForm = ({ history, addCardAction }, props) => {
    useEffect(() => {
        console.log(props.cards);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const cardToAdd = await axios.post("http://localhost:5000/cards", values)
            console.log("123")
            console.log(cardToAdd.data)
            addCardAction(cardToAdd.data);
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
                    name: '',
                    series: '',
                    releaseDate: '',
                    architecture: '',
                    company: '',
                    aib: '',
                    model: '',
                    score: '',
                    imageurl: '',
                    rgb: false,
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
                            </label>
                            <ErrorMessage name="company" className="error" component="div" />
                        </div>
                        Nazwa karty
                        <div className="form-name">
                            <Field name="name" /><br />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-series">
                            Seria karty
                            <Field name="series" /><br />
                            <ErrorMessage name="series" className="error" component="div" />
                        </div>
                        <div className="form-releaseDate">
                            Data wydania
                            <Field name="releaseDate" type="date" /><br />
                            <ErrorMessage name="releaseDate" className="error" component="div" />
                        </div>
                        <div className="form-architecture">
                            Architektura
                            <Field name="architecture" /><br />
                            <ErrorMessage name="architecture" className="error" component="div" />
                        </div>
                        <div className="form-aib">
                            Producent
                            <Field name="aib" /><br />
                            <ErrorMessage name="aib" className="error" component="div" />
                        </div>
                        <div className="form-model">
                            Model karty
                            <Field name="model" /><br />
                            <ErrorMessage name="model" className="error" component="div" />
                        </div>
                        <div className="form-imageurl">
                            Adres do zdjecia
                            <Field as="textarea" name="imageurl" />
                            <ErrorMessage name="imageurl" className="error" component="div" />
                        </div>
                        <div className="form-rgb">
                            RGB
                            <Field type="checkbox" name="rgb" />
                            <ErrorMessage name="rgb" className="error" component="div" />
                        </div>
                        <div className="form-score">
                            Wynik benchmark
                            <Field name="score" /><br />
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

const mapStateToProps = (state) => {
    return {
        cards: state.cards,

    }
};

const mapDispatchToProps = {
    addCardAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardForm));