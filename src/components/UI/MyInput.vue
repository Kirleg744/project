<template lang="">
    <input :value='modelValue' @input='updateInput' class='input' type="text" />
</template>
<script>
export default {
    name: 'my-input',
    props:{
        modelValue: [String, Number]
    },
    methods:{
        updateInput(){
            this.$emit('update:modelValue', event.target.value)
        }
    }
};
</script>
<style>
.input {
    width: 100%;
    border: 1px solid #000;
    padding: 10px 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
</style>
