import { toast } from 'react-toastify';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';
// function* generator como se fosse um async
// *call responsável por chamar métodos async que retonar promises
// *put responsável por disparar as actions dentro do saga
// *all responsável por ouvir os eventos listeners
// *takeLatest server para se o utilizador clicar muito rápido no botão ele vai chamar a api somente uma vez enquanto a chamada não for completada
// *select é responsável por buscar informações dentro do estado
function* addToCart({ id }) {
  const productExist = yield select(state => state.cart.find(p => p.id === id));

  /** Chamada a APi para verificar o stock */
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  // verifica quantas unidades deste produto foram adicionadas no carrinho
  const currentAmount = productExist ? productExist.amount : 0;
  const amount = currentAmount + 1;
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }
  if (productExist) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    /** O history vai direcionar o user para o carrinho */
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque!');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
