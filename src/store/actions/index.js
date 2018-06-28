// this is the central file where we exports all the actionCreators to our burgerBuilder container
// this groups all exports from seperate files. in the end we point to this file to inport something from the other files..
export { addIngredient,
          removeIngredient,
          initIngredients,
 } from './burgerBuilder';

 // ONCE WE EXPORT PURCHASE_INIT, WE GO TO OUR Checkout CONTAINER AND LOAD IT IN componentDidMount.
export { purchaseBurger,
         purchaseInit,
         // once we do this we need to load it in componentDidMount as well as dispatch it in the orders container.
         fetchOrders
} from './order';

export { auth,
         authSuccess,
         authFail,
         logout,
         setAuthRedirectPath,
         authCheckState
} from './auth';
