import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addProducentAction, deleteProducentAction } from "../../ducks/producents/ProducentActions";
const axios = require('axios')
const _ = require('lodash')
const Producents = ({ producents, addProducentAction, deleteProducentAction, downloaded }, props) => {


    const getProducents = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/producents/reload")
        await axios.get("http://localhost:5000/producents")
            .then(async function (response) {
                console.log(response.data.allProducents)
                await response.data.allProducents.map(producent => (addProducentAction(producent)))
            })
    }

    const [producentsTemp, setProducentsTemp] = useState(producents)

    useEffect(() => {
        setProducentsTemp(producents)
    }, [producents])

    useEffect(() => {
        if (producents.length === 0) {
            getProducents()
        }
    }, [])

    const deleteProducent = async (producent) => {
        deleteProducentAction(producent)
        await axios.delete(`http://localhost:5000/producents/${producent._id}`).then()
        console.log(producents)
        setProducentsTemp(producentsTemp.filter(el => el._id !== producent._id))
    }

    const noProducents = () => {
        if (producents.length === 0) {
            return <button onClick={() => getProducents()}>Odswiez dane</button>
        }
    }

    const filterProducents = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredProducents = producents
        if (values.country) {
            filteredProducents = _.filter(filteredProducents, { 'country': values.country })
        }
        if (values.supports) {
            filteredProducents = _.filter(filteredProducents, { 'supports': values.supports })
        }
        setProducentsTemp(filteredProducents)
    }

    const sortProducents = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setProducentsTemp(_.sortBy(producentsTemp, ['name', 'creationDate']))
        }
        if (values.type === "datetime") {
            setProducentsTemp(_.sortBy(producentsTemp, ['creationDate', 'name']))
        }
    }

    const getUrl = (producent) => {
        if (producent.imgurl) {
            return producent.imgurl
        }
        else {
            return 'https://loans2go.co.uk/wp-content/uploads/2021/10/35a6130fd209f482213be4663dbfc499.png'
        }
    }

    return (
        <div className="graphics-cards-main">
            <div className="view-options">
                <div className="Filters">
                    <Formik
                        initialValues={{
                            country: ''
                        }}
                        onSubmit={(values) => filterProducents(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="company">
                                Kraj firmy
                                <Field as="select" name="country">
                                    <option value="">Wybierz kraj</option>
                                    {_.uniq(_.map(producents, 'country')).map(maker => <option key={maker} value={maker}>{maker}</option>)}
                                </Field>
                            </div>
                            Tworzy karty dla:
                            <div className="manu">
                                AMD
                                <Field type="checkbox" name="supports" value="amd" />
                                Nvidia
                                <Field type="checkbox" name="supports" value="nvidia" />
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
                        onSubmit={(values) => sortProducents(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="sort-select">
                                <Field as="select" name="type">
                                    <option key="1" value="-">Wybierz sortowanie</option>
                                    <option key="2" value="alphabet">Alfabetycznie</option>
                                    <option key="3" value="datetime">Data wydania</option>
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
                <h5>Producenci</h5>
                <Link to={`/producents/add`}> <button>Dodaj nowego producenta</button></Link>
                {noProducents()}
                <div className="ItemList-cards">
                    {producentsTemp.map(producent => {
                        return (
                            <div className="Item" key={producent._id}>
                                <Link to={`/producents/details/${producent.name}`}>
                                    <img alt="" src={getUrl(producent)}></img>
                                    Producent: {producent.name}</Link>
                                <button onClick={() => deleteProducent(producent)}>Usuń</button>
                            </div>)
                    })}
                </div>
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
    addProducentAction,
    deleteProducentAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Producents);
