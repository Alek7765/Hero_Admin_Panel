import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';


const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const enhencer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(applyMiddleware(thunk, stringMiddleWare),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

const store = configureStore({
    reducer: { heroes, filters }, // наши созданые редьюсеры
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare), // дефолтные мидлевэиры и наш созданный для строк
    devTools: process.env.NODE_ENV !== 'production', // плагин для редукса только для разработки, не для продакшена
})

export default store;

