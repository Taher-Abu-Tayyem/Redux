console.log(Redux);
console.log(ReduxThunk);
const WITHDRAW_MONEY = "WITHDRAW-MONEY";
const DEPOSITE_MONEY = "DEPOSITE_MONEY";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";

//ACTIONS
const withdraw = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount,
  };
};

const deposite = (amount) => {
  return {
    type: DEPOSITE_MONEY,
    payload: amount,
  };
};

const addProduct = (product) => {
    return {
      type: ADD_PRODUCT,
      payload: product,
    };
  };

  const getProducts = (products) => {
    return {
      type:GET_PRODUCTS,
      payload: products,
    };
  };

const fetchProducts = ()=>{
return async(dispatch ) => {
    const res= await fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8");
    const data =await res.json();
    console.log(data)
    dispatch(getProducts(data))
};
}

//Reducers
const bankReducer = (state = 1000, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return state - action.payload;

    case DEPOSITE_MONEY:
      return state + action.payload;

    default:
      return state;
  }
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
        return [...action.payload]; //متعدلش ع ال state
    case ADD_PRODUCT:
      return  [ ...state,action.payload]; //متعدلش ع ال state
     
    default:
      return state;
  }
};

const appReducer= Redux.combineReducers(
   { bank:bankReducer,
    products:productsReducer,
})
//const store = Redux.createStore(bankReducer);
const store = Redux.createStore(appReducer,Redux.applyMiddleware(ReduxThunk));

//  store.dispatch(withdraw(500));
//  console.log(store.getState());
//  store.dispatch(deposite(30));
//store.dispatch(addProduct({ id:1,title:'product1'}));
// console.log(store.getState());
//store.dispatch(fetchProducts())
console.log(store.getState());
let amountInput =document.querySelector ('#amount')
let amountValue = document.querySelector("#value")
amountValue.innerHTML=store.getState().bank;
document.querySelector("#withdraw").addEventListener('click',()=>{
    store.dispatch(withdraw(+amountInput.value))
})
document.querySelector("#deposite").addEventListener('click',()=>{
    store.dispatch(deposite(+amountInput.value))
})
store.subscribe(() => {
    console.log("CURRENT STATE", store.getState()) //auto بعرضstore.dispatch(action)مع كل تغيير
   amountValue.innerHTML=store.getState().bank});