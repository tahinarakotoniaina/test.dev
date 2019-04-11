const mapStateToProps = (state = {} ) => {
    return {
        users: state.users.users ,
        etat: state.user.etat  ,
        errors : state.user.errors ,
        created : state.user.created
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (email, password , tel) => {
            dispatch(requestRegister(email, password , tel));
        } ,
        getUsers : () => {
            dispatch(requestUsers());
        } ,
        fait : () => {
            dispatch(fait());
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(User);


onsubmit : this.props.onRegister