<template>
    <div class="mb-3">
        <ValidationProvider :name="name" :rules="rules" v-slot="{errors}">
        <label :for="id" class="form-label">{{label}}</label>
        <textarea v-if="multiline" :id="id" v-model="localValue" cols="30" rows="10" class="form-control form-control-sm"></textarea>
        <input v-else :id="id" :type="type" v-model="localValue" :placeholder="placeholder" class="form-control form-control-sm">
        <p v-if="errors[0]" class="p-1 mt-2 text-danger" role="alert">
            {{ errors[0] }}
        </p>
        </ValidationProvider>
    </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default{
    name: "TextFieldFormComponent",
    components: {
        ValidationProvider
    },
    props: {
        value: {
            required: false,
            type: String
        },
        label: {
            required: false,
            type: String,
            default: ""
        },
        id: {
            type: String
        },
        multiline: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "text"
        },
        placeholder :{
            type: String
        },
        name: {
            type: String
        },
        rules: {
            type: [Object, String]
        }
    },
    data(){
        return {
            localValue: undefined
        }
    },
    mounted(){
        this.localValue = this.value
    },
    watch: {
        localValue: function(){
            this.$emit("input", this.localValue)
        },
        value: function(){
            return this.localValue = this.value
        }
    }
}
</script>