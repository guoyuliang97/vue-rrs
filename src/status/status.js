import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        //属性
        store:'',
        curren:''
    },
    mutations:{
        //set 方法
        setValue(state,value){
            state.store = value
        },
        setValue2(state,value){
            state.curren = value
        }
    },
    getters:{
        //get 方法
        getValue: state => {
            return state.store
        },
        getValue2: state=>{
            return state.curren
        }
    }
})


export default store