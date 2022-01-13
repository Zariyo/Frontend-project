import { Field, Form, Formik } from "formik"
import { useEffect } from "react";
import { addCardAction } from "../cards/CardActions";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from "react-router";
const axios = require('axios')

const CardForm = ({ history, addCardAction }, props) => {
    useEffect(() => {
        console.log(props.cards);
    }, [props])

    const handleSubmit = async (values) => {
        addCardAction(values);
        console.log(values)
        try {
            await axios.post("http://localhost:5000/cards", values)
        }
        catch(err){
            console.log(err)
        }
        
        history.push(`/cards`);
    }

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
                    score: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                <Form>
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
                    </div>
                    Nazwa karty
                    <Field name="name" /><br />
                    Seria karty
                    <Field name="series" /><br />
                    Data wydania
                    <Field name="releaseDate" type="date"/><br/>
                    Architektura
                    <Field name="architecture"/><br/>
                    Wynik benchmark
                    <Field name="score"/><br/>
                    <button type="submit">
                        Zatwierdz
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
};

const mapDispatchToProps = {
    addCardAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardForm));