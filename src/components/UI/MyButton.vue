<template lang="">
    <div>
        <button class="btn"><slot></slot></button>
    </div>
</template>
<script>
export default {
    name: 'my-button'
};
</script>
<style>
.btn{
    padding: 10px 15px;
    background-color: none;
    color: teal;
    border: 1px solid teal;
}
</style>
