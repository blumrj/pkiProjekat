<template>
    <div class="mb-3">
        <label v-if="label" :for="id" class="form-label">{{label}}</label>
        <select v-model="localValue" :id="id" class="form-select form-select-sm">
            <option v-if="withDefaultOption" value="all">All</option>
            <option v-for="item in items" :key="item[valueProperty]" :value="item[valueProperty]">{{item[textProperty]}}</option>
        </select>
    </div>
</template>

<script>
export default{
    name: "DropDownFormComponent",
    props: {
        value: {
            type: [String, Number]
        },
        id: {
            type: String
        },
        label: {
            required: false,
            type: String,
            default: ""
        },
        items: {
            required: true,
            type: Array
        },
        valueProperty: {
            type: String,
            default: "value"
        },
        textProperty: {
            type: String,
            default: "text"
        },
        withDefaultOption: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
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