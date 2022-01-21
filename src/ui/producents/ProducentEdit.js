import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { editProducentAction } from "../../ducks/producents/ProducentActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const ProducentForm = ({ producent, history, editProducentAction }, props) => {
    useEffect(() => {
        console.log(props.producents);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const producentToAdd = await axios.put(`http://localhost:5000/producents/${producent._id}`, values)
            console.log(producentToAdd.data)
            editProducentAction(producentToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/producents`);
    }

    const producentSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Nazwa producenta jest wymagana"),
        phone: Yup.number("Numer telefonu musi byc typu numerycznego").required("Numer kontaktowy jest wymagany"),
        creationDate: Yup.date("Data musi byc typu daty").required("Data powstania producenta jest wymagana"),
        address: Yup.string("Adres musi byc typu string").required("Adres producenta jest wymagany"),
        country: Yup.string("Panstwo musi byc typu string").required("Panstwo producenta jest wymagane"),
        imgurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku"),
    })

    return (
        <div>
            <h3>Karta</h3>
            <Formik
                initialValues={{
                    _id: producent._id,
                    name: producent.name,
                    phone: producent.phone,
                    address: producent.address,
                    country: producent.country,
                    supports: producent.supports,
                    imgurl: producent.imgurl,
                    creationDate: producent.creationDate,
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={producentSchema}>
                <Form>
                    <div className="card-submit-form">
                        <div className="supports">
                            AMD
                            <Field type="checkbox" name="supports" value="amd" />
                            Nvidia
                            <Field type="checkbox" name="supports" value="nvidia" />
                            <ErrorMessage name="supports" className="error" component="div" />
                        </div>
                    
                    <div className="form-name">
                        Nazwa firmy
                        <Field name="name" />
                        <ErrorMessage name="name" className="error" component="div" />
                    </div>
                    <div className="form-phone">
                        Telefon firmy
                        <Field name="phone" />
                        <ErrorMessage name="phone" className="error" component="div" />
                    </div>
                    <div className="form-address">
                        Adres firmy
                        <Field name="address" />
                        <ErrorMessage name="address" className="error" component="div" />
                    </div>
                    <div className="form-country">
                        Kraj firmy
                        <Field name="country" />
                        <ErrorMessage name="country" className="error" component="div" />
                    </div>
                    <div className="form-imageurl">
                        Adres do zdjecia
                        <Field as="textarea" name="imgurl" />
                        <ErrorMessage name="imgurl" className="error" component="div" />
                    </div>
                    <div className="form-creationDate">
                        Data założenia
                        <Field name="creationDate" type="date" />
                        <ErrorMessage name="creationDate" className="error" component="div" />
                    </div>
                    <button type="submit">
                        Zatwierdz
                    </button>
                </div>
            </Form>
        </Formik>
        </div >
    )
}

const mapStateToProps = (state, props) => {
    return {
        producents: state.producents,
        producent: state.producents.find(producent => producent.name === props.match.params.name)
    }
};

const mapDispatchToProps = {
    editProducentAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducentForm));