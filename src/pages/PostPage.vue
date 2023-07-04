<template>
    <div>
        <my-input placeholder="Search..." v-model="searchQuery" />
        <div class="app__buttons">
            <my-button @click="showDialog">Show dialog </my-button>
        </div>
        <my-select :options="sortOptions" v-model="selectedSort" />

        <my-dialog v-model:show="dialogVisible"
            ><PostForm @create="createPost"
        /></my-dialog>
        <PostList
            v-if="!isPostLoading"
            @remove="removePost"
            :posts="sortedAndSearchedPosts"
        />
        <div v-else>Идёт загрузка</div>
        <div ref="observer" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div class="page" :class="{'current-page' : page === pageNumber}" :key="pageNumber" @click="changePage(pageNumber)" v-for="pageNumber in totalPages">
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
export default {

    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: "",
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По содержимому" },
            ],
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
        };
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },
        removePost(post) {
            console.log(post);
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                setTimeout(async () => {
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts?_limit=10",
                        {
                            params: {
                                _page: this.page,
                                _limit: this.limit,
                            },
                        }
                    );
                    this.totalPages = Math.ceil(
                        response.headers["x-total-count"] / this.limit
                    );
                    this.posts = response.data;
                    this.isPostLoading = false;
                }, 1000);
            } catch {
                alert("Error");
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1
                setTimeout(async () => {
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts?_limit=10",
                        {
                            params: {
                                _page: this.page,
                                _limit: this.limit,
                            },
                        }
                    );
                    this.totalPages = Math.ceil(
                        response.headers["x-total-count"] / this.limit
                    );
                    this.posts = [...this.posts, ...response.data];
                    this.isPostLoading = false;
                }, 1000);
            } catch {
                alert("Error");
            }
        },
        // changePage(pageNumber){
        //     this.page = pageNumber
        // }
    },
    mounted() {
        this.fetchPosts();
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        };
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting){
                this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    },
    // watch:{
    //     page(){
    //         this.fetchPosts()
    //     }
    // },
    computed: {
        sortedPost() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(
                    post2[this.selectedSort]
                );
            });
        },
        sortedAndSearchedPosts() {
            return this.sortedPost.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );
        },
    },
};
</script>

<style scoped>

.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 5px;
}

.current-page {
    border: 2px solid green;
}


.observer {
    height: 30px;
    background: green;
}
</style>
