<template>
    <div>
        <h1 class="pt-5">User {{$route.params.username}}</h1>
        <button @click="logout" class="ms-3">Logout</button>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default{
    name: "UserPage",
    mounted(){
        if(this.role != "user"){
            this.$router.push("/")
        }
    },
    computed: {
        ...mapGetters(["role"])
    },
    methods: {
      logout() {
        this.$store.commit("changeUser", undefined)
        this.$forceUpdate()
        // this.$router.push("/")
        this.$router.go(0)
      }
    }
}
</script>