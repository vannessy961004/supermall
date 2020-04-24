import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types.js" 

export default {
      //mutations唯一的目的是修改state的状态
      //mutations中的方法尽可能完成的事件比较单一
      [ADD_COUNTER](state, payload) {
        payload.count++
      },
      [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
      }
  }
