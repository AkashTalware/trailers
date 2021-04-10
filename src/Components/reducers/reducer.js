export default function reducer(state, action){
    switch(action.type){

        case("READ_MORE"):{
            console.log(action.payload)
            const updatedState = {...state, movie:action.payload}
            return updatedState
        }

        default:{
            return state
        }
    }
}