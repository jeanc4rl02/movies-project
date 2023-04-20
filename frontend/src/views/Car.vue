<template>
  <Nav/>
  <n-row>
    <n-col v-for="movie in movies" :key="movie.id" :span="6">
      <n-card :title="movie.title" @click="showModal(movie)">
        <img :src="getImage(movie.poster_path)" />
        <n-tag :type="movie.adult ? 'error' : 'success'">
          {{ movie.adult ? 'Adulto' : 'Familiar' }}
        </n-tag>
      </n-card>
    </n-col>
  </n-row>
<n-modal v-if="selectedMovie" :title="selectedMovie.title" @close="selectedMovie = null">
  <p>{{ selectedMovie.overview }}</p>
  <template v-if="selectedMovie.genres.map(genre => genre.name).includes('Thriller')">
    <p>Thriller: {{ selectedMovie.genres.map(genre => genre.name).join(', ') }}</p>
  </template>
</n-modal>

</template>

<script>
import Nav from "../components/Nav.vue"
import axios from 'axios';

export default ({
  name: 'MovieCards',
  components: {
    Nav
  },
  data() {
    return {
      movies: [],
      apiKey: 'f40d327254d74aec7e161062db22582b',
      selectedMovie: null,
    };
  },
  mounted() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=es-MX&page=1`
      )
      .then((response) => {
        this.movies = response.data.results;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    getImage(path) {
      return path ? `https://image.tmdb.org/t/p/w300${path}` : '';
    },
    showModal(movie) {
      this.selectedMovie = movie;
    },
  },
})
</script>
<style scoped>
.n-card {
  margin-bottom: 9px;
  margin: 9px;
}

.n-card:hover{
  border: 5px;
  color: aqua;
  cursor: pointer;
}
</style>