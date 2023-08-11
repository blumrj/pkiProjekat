<template>
    <ValidationObserver ref="form" v-slot="{ invalid, handleSubmit }">
        <form class="px-4 py-5">
            <!-- Email -->
            <TextField v-model="signInObj.email" label="Email address" id="tbLogEmail" type="email" rules="required|email" name="Email"/>
            <!-- Password -->
            <TextField v-model="signInObj.password" label="Password" id="tbLogPassword" type="password" :rules="{password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, required: true}" name="Password"/>
            <!-- Sign in button -->
            <input type="button" class="btn btn-red my-3" value="Register" id="Register" :disabled="invalid" @click="handleSubmit(signInUser)"/>
            <p v-if="error" class="text-danger">{{error}}</p>
        </form>
    </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { mapGetters } from "vuex"


export default{
    name: "SignInComponent",
    components: {
        ValidationObserver,
    },
    data(){
        return {
            signInObj: {
                email: "pera@gmail.com",
                password: "sifra1234",
            },
            error: undefined
        }
    },
    computed: {
        ...mapGetters(["users"]),
    },
    methods: {
        signInUser(){
            var user = this.users.find(obj => obj.email == this.signInObj.email && obj.password == this.signInObj.password);
            console.log(user)

            if(!user) {
                    this.error = "Wrong credentials."
                    return
                }
            else{
                let localStorageItem = {
                    username : user.username,
                    role : user.role
                }
                
                localStorage.setItem("user", JSON.stringify(localStorageItem));
                
                this.$store.commit("changeUser", localStorageItem)
                location.reload()
                this.$router.go(-1)
            }
                
        }
    },
}
</script>