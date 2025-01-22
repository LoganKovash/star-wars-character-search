<template>
    <div class=" text-white flex flex-col items-center justify-center p-6">
      <!-- Back Button -->
      <button @click="goBack" class="fixed top-5 left-5 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-md text-white shadow-lg">
        Back to Search
      </button>
  
      <div v-if="error" class="bg-red-500 text-white px-6 py-4 rounded-md mt-10">
        <p>{{ error }}</p>
      </div>
  
      <div v-else-if="character" class="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 class="text-3xl font-bold text-yellow-400 mb-4 text-center">{{ character.name }}</h2>
  
        <div class="space-y-3">
          <p class="flex justify-between border-b border-gray-700 pb-2">
            <span class="font-semibold text-gray-400">Height:</span>
            <span>{{ character.height }} cm</span>
          </p>
          <p class="flex justify-between border-b border-gray-700 pb-2">
            <span class="font-semibold text-gray-400">Mass:</span>
            <span>{{ character.mass }} kg</span>
          </p>
          <p class="flex justify-between border-b border-gray-700 pb-2">
            <span class="font-semibold text-gray-400">Hair Color:</span>
            <span class="capitalize">{{ character.hair_color }}</span>
          </p>
          <p class="flex justify-between border-b border-gray-700 pb-2">
            <span class="font-semibold text-gray-400">Eye Color:</span>
            <span class="capitalize">{{ character.eye_color }}</span>
          </p>
          <p class="flex justify-between border-b border-gray-700 pb-2">
            <span class="font-semibold text-gray-400">Birth Year:</span>
            <span>{{ character.birth_year }}</span>
          </p>
  
          <!-- Display Homeworld -->
          <p v-if="homeworld" class="flex justify-between border-b border-gray-700 pb-2">
            <span class="font-semibold text-gray-400">Homeworld:</span>
            <span class="capitalize">{{ homeworld.name }}</span>
          </p>
        </div>
  
        <!-- Display films -->
        <div v-if="films.length" class="mt-6">
          <h3 class="text-xl font-semibold text-yellow-400 border-b border-gray-700 pb-2">Films</h3>
          <ul class="mt-2 space-y-2">
            <li v-for="film in films" :key="film.episode_id" class="bg-gray-700 p-3 rounded-lg">
              <p class="text-lg font-medium">{{ film.title }}</p>
              <p class="text-sm text-gray-400">Release Date: {{ film.release_date }}</p>
              <p class="text-sm text-gray-400">Episode {{ film.episode_id }}</p>
            </li>
          </ul>
        </div>
      </div>
  
      <p v-else class="text-gray-400 mt-10">Loading character details...</p>
    </div>
  </template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const character = ref(null);
const error = ref(null);
const characterId = route.params.characterId;

const films = ref([]);

const homeworld = ref(null);

const getCharacterDetails = async () => {
    try {
        error.value = null;
        const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json()
        character.value = data;

         // Fetch homeworld details
        if (data.homeworld) {
            await fetchHomeworld(data.homeworld);
        }

        // Fetch film details
        await fetchCharacterFilms(data.films);

    } catch(err) {
        error.value = err.message;
        character.value = null;
    }
}

// Fetch film titles from URLs
const fetchCharacterFilms = async (filmUrls) => {
  try {
    const filmRequests = filmUrls.map(url => fetch(url).then(res => res.json()));
    films.value = await Promise.all(filmRequests);
  } catch (err) {
    console.error("Error fetching films:", err);
  }
}

// Fetch homeworld details
const fetchHomeworld = async (homeworldUrl) => {
  try {
    const response = await fetch(homeworldUrl);
    if (!response.ok) throw new Error("Failed to fetch homeworld");

    homeworld.value = await response.json();
  } catch (err) {
    console.error("Error fetching homeworld:", err);
  }
};

onMounted(getCharacterDetails);

// Go back to search
const goBack = () => {
  router.push('/');
};
</script>