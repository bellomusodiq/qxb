import * as actionTypes from "../../actions/types";

const INITIAL_STATE = {
  name: "",
  email: "",
  phonenumber: "",
  orderName: "",
  orderEmail: "",
  orderPhonenumber: "",
  address: "",
  company: "",
  city: "",
  country: "",
  state: "",
  postal: "",
  loading: false,
  error: false,
  firstLoaded: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE:
      const {
        name,
        email,
        phonenumber,
        loading,
        error,
        firstLoaded,
        address,
        company,
        city,
        country,
        state: customerState,
        postal,
        orderPhonenumber,
        orderEmail,
        orderName
      } = action.payload;
      return {
        ...state,
        name: name !== null ? name : state.name,
        email: email !== null ? email : state.email,
        phonenumber: phonenumber !== null ? phonenumber : state.phonenumber,
        orderName: orderName !== null ? orderName : state.orderName,
        orderEmail: orderEmail !== null ? orderEmail : state.orderEmail,
        orderPhonenumber: orderPhonenumber !== null ? orderPhonenumber : state.orderPhonenumber,
        address: address !== null ? address : state.address,
        company: company !== null ? company : state.company,
        city: city !== null ? city : state.city,
        state: customerState !== null ? customerState : state.state,
        postal: postal !== null ? postal : state.postal,
        country: country !== null ? country : state.country,
        loading: loading,
        error: error,
        firstLoaded: firstLoaded ? firstLoaded : state.firstLoaded,
      };
    default:
      return state;
  }
};

export default reducer;
