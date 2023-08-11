<template>
    <div>
        <div class="container vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
            <div class="col-10 text-center">
                <h2>Welcome! Sign up for your account!</h2>
                <h3>Already have one? Sign in!</h3>
            </div>
            <div class="col-10 col-md-8 col-lg-5 text-start align-self-center mt-5">
                <b-tabs>
                    <b-tab v-for="tab, tid in tabs" :key="tid" :title="tab.text" v-on:click="currentTabName = tab.name"></b-tab>
                    <keep-alive>
                        <component v-bind:is="currentTabComponent"></component>
                    </keep-alive>
                </b-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import SignUpComponent from '../Signup.vue';
import SignInComponent from '../SignIn.vue';
import { extend } from 'vee-validate';
import {required, email,regex} from "vee-validate/dist/rules"
import { mapGetters } from "vuex"


extend("required", {
    ...required,
    message: "{_field_} can't be empty"
})
extend("email", email)
extend("password", {
    ...regex,
    message: "{_field_} has to contain minimum 8 characters, at least one number"
})

extend("username", {
    ...regex,
    message: "{_field_} has to contain minimum 3 characters and can't begin or end with a '.'"
})

export default{
    name: "RegisterPage",
    components: {
        SignUpComponent,
        SignInComponent
    },
    data(){
        return {
            registrationObj: {
                email: "",
                password: "",
                chosenCountry: "AW"
            },
            tabs: [
                {text: "Sign Up", name: "SignUpComponent"},
                {text: "Sign In", name: "SignInComponent"},
            ],
            currentTabName: "SignUpComponent"
        }
    },
    computed: {
        currentTabComponent(){
            return this.currentTabName
        },
        ...mapGetters(["role"])
    },
    mounted(){
        if(this.role != "unauthorized"){
            this.$router.push("/")
        }
    },
}
</script>

<style>  
    .nav-tabs{
        border: none;
    }
    .nav-link{
        color: #fff !important;
    }
    .nav-link.active{
        background-color: #4a5562 !important;
        border-color: #4a5562 !important;
    }
</style>