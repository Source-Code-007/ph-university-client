
// By searching "custom middleware" in the Redux documentation
const logger = (state)=> (next)=> (action)=> {
    // console.log('Current state => ', state.getState());
    next(action)
    // console.log('New state => ', state.getState());
}

export default logger