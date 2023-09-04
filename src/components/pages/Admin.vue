<template>
    <div class="pt-5 container vh-100">
        <div class="pt-5 row justify-content-between align-items-center">
            <h1 class="w-auto"><b-icon icon="person-fill"></b-icon> Admin</h1>
            <div class="col-auto row column-gap-2">
                <button @click="logout" class="btn btn-red w-auto">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default{
    name: "AdminPage",
    mounted(){
        if(this.role != "admin"){
            this.$router.push("/")
        }
    },
    computed: {
        ...mapGetters(["role"]),
    },
    methods: {
      logout() {
        this.$store.commit("changeUser", undefined)
        this.$forceUpdate()
        // this.$router.push("/")
        this.$router.go(0)
      },
    }
}
</script>