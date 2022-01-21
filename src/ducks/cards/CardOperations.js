import axios from "axios";
import { addCardAction, deleteCardAction} from './CardActions';

export const getCards = () => {
    //console.log("cards get 1")
    return async dispatch => {
        try{
            console.log("cards get 2")
            await axios.post("http://localhost:5000/cards/reload")
            const response = await axios.get("http://localhost:5000/cards/");
            if(response.status === 200){
                response.data.map((card)=>( dispatch(addCardAction(card))))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}

export const deleteCard = async (card) => {
    deleteCardAction(card)
    await axios.delete(`http://localhost:5000/cards/${card._id}`)
    //setCardsTemp(cardsTemp.filter(el => el._id !== card._id))
}