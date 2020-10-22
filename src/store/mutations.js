let mutations = {
    setAccountNum(state){
        let accountNum  = window.localStorage.getItem('accountNum')
        this.state.accountNum = accountNum
    },
    setDatas(state,datas){
        this.state.datas = datas;
    },
    changeTheme(state,t){
        this.state.theme=t;
    }
}
export default mutations


// WEBPACK FOOTER //
// ./src/store/mutations.js