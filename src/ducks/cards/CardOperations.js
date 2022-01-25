import axios from "axios";
import { addCardAction, deleteCardAction} from './CardActions';

export const getCards = () => {
    //console.log("cards get 1")
    return async dispatch => {
        try{
            console.log("getting cards")
            await axios.post("http://localhost:5000/cards/reload")
            const response = await axios.get("http://localhost:5000/cards/");
            if(response.status === 200){
                console.log("dispatching getCards")
                response.data.allCards.map((card)=>( dispatch(addCardAction(card))))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}

export const deleteCard = (card) => {
    return async dispatch => {
        try{
            console.log("deleting card")
            const response = await axios.delete(`http://localhost:5000/cards/${card._id}`);
            if(response.status === 200){
                console.log("dispatching deleteCard")
                dispatch(deleteCardAction(card))
            }
               
        }catch(ex) {
            console.log(ex)
        }
    }
}