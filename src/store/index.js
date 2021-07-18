import { createStore } from 'vuex'

export default createStore({
  state: {
    fireUser: null,
    categories: [
      '디지털기기', '생활가전', '가구/인테리어', '유아동', '생활/가공식품', '유아도서', '스포츠/레저', '여성잡화', '여성의류', '남성패션/잡화', '게임/취미', '뷰티/미용', '반려동물용품', '도서/티켓/음반', '식물', '기타 중고물품', '삽니다'
    ],
    productId: ''
  },
  mutations: {
    setFireUser (state, fu) {
      state.fireUser = fu
    },
    setProductId (state, requestId) {
      state.productId = requestId
    }
  },
  actions: {
  },
  modules: {
  }
})
