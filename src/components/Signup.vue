<template>
    <ValidationObserver ref="form" v-slot="{ invalid, handleSubmit }">
        <form class="px-4 py-5">
            <!-- Email -->
            <TextField v-model="signUpObj.email" label="Email address" id="tbRegEmail" type="email" rules="required|email" name="Email"/>
            <!-- Username -->
            <TextField v-model="signUpObj.username" label="Username" id="tbRegUsername" type="text" :rules="{username: /^(?=.{3,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9._]+(?<![.])$/, required: true}" name="Username"/>
            <!-- Password -->
            <TextField v-model="signUpObj.password" label="Password" id="tbRegPassword" type="password" :rules="{password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, required: true}"  name="Password"/>
            <!-- Sign up button -->
            <input type="button" class="btn btn-red mt-3" value="Register" id="Register" :disabled="invalid" @click="handleSubmit(signUpUser)"/>
            <p v-if="error" class="text-danger mt-4">{{error}}</p>
        </form>
    </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { mapGetters } from 'vuex';

export default{
    name: "SignUpComponent",
    components: {
        ValidationObserver,
    },
    data(){
        return {
            signUpObj: {
                email: "marija@gmail.com",
                username: "marija",
                password: "marija1234",
                role: "user"
            },
            error: undefined
        }
    },
    computed: {
        ...mapGetters(["users"]),
    },
    methods: {
        signUpUser(){
            var user = this.users.find(obj => obj.email == this.signUpObj.email || obj.username == this.signUpObj.username);
            
            if(user) {
                console.log(user)
                this.error = "This user already exists."
                return
            }
            else{
                var newUser = {
                    email: this.signUpObj.email,
                    username : this.signUpObj.username,
                    password: this.signUpObj.password,
                    role : this.signUpObj.role
                }

                localStorage.setItem("user", JSON.stringify(newUser));
                
                this.$store.commit("changeUser", newUser)
                location.reload()
                this.$router.go(-1)
            }
                
        }
    },
}
</script>

<style>


form{
    background-color:  #4a5562;
    border-radius: 10px;
    border-top-left-radius: 0;
}
</style>