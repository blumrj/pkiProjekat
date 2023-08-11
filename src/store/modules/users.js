import users from "../sources/users.json"
console.log(users)
// console.log(registeredUsers)
export default {
    state: {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {username: "guest", role: "unauthorized"},
      users : users,
    //   registeredUsers: commit("addUser")
    },
    mutations: {
        changeUsername(state, newUsername) {
            state.user.username = newUsername
        },
        changeUser(state, newUser) {

            if(!newUser) {
                state.user.username = "guest"
                state.user.role = "unauthorized"
                localStorage.removeItem("user")
                return
            }

            state.user.username = newUser.username,
            state.user.role = newUser.role
        },
        // addUser(state, newUser){
        //     if(newUser){
                
        //     }
        // }
    },
    getters: {
        username(state) {
            return state.user.username
        },
        isAdmin(state) {
            return state.user.isAdmin
        },
        role(state) {
            return state.user.role
        },
        users(state) {
            return state.users
        }
    }
}