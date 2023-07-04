<template>
    <form @submit.prevent action="">
        <h4>Создание поста</h4>
        <my-input v-model="post.title" />
        <my-input v-model="post.body" />
        <button @click="createPost">Создать пост</button>
    </form>
    <div class="post" v-for="post in posts">
        <div><strong>Название</strong> {{ post.title }}</div>
        <div><strong>Описание</strong> {{ post.body }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            },
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: "",
            };
        },
    },

};
</script>

<style></style>
