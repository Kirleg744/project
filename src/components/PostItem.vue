<template lang="">
    <div class="post">
        <div>
            <div><strong>{{post.id}}</strong></div>
            <div><strong>Название</strong> {{ post.title }}</div>
            <div><strong>Описание</strong> {{ post.body }}</div>
        </div>
        <div class="post-buttons">
            <my-button @click="$emit('remove', post)">Удалить</my-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post: {
            title: "",
            body: "",
        },
    },
};
</script>
<style>
.post {
    padding: 15px;
    border: 1px solid #000;
    margin-top: 15px;
}
</style>
