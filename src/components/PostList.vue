<template>
    <div v-if="posts.length > 0">
        <transition-group name="post-list">
            <PostItem
                :key="post.id"
                :post="post"
                @remove="$emit('remove', post)"
                v-for="post in posts"
            />
        </transition-group>
    </div>
    <h2 v-else>Список пуст</h2>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
    components: {
        PostItem,
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style>
.post-list-move, /* apply transition to moving elements */
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.post-list-move{
    transition: transform 0.4s ease;
}
</style>
