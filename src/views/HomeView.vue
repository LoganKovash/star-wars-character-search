<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="Search for a character" 
        class="text-white py-2 px-1 w-full bg-transparent border-b focus:border-app-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <div v-if="error">
        <p class="text-red-500">Error: {{ error }}</p>
      </div>
      <ul 
        v-else-if="characters.length"
        class="absolute bg-app-background text-white w-full shadow-md py-2 px-5 top-[66px]">
        <li v-for="character in characters"
        :key="character.name"
        class="py-2 cursor-pointer"
        @click="viewCharacter(character)"
        >
          {{ character.name }}
        </li>
      </ul>
      <div v-else-if="searchQuery">
        <p>No characters found.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();
const searchQuery = ref('');
const characters = ref([]);
const error = ref(null);
let timeout = null;

// Push user to the selected character’s detail page
const viewCharacter = (character) => {
  const characterId = character.url.match(/\/(\d+)\/$/)[1]; // Extract ID from API URL
  router.push({
    name: 'characterView',
    params: { characterId: characterId },
    query: { preview: true }
  });
}

// Fetch characters from the Express API
const fetchCharacters = async () => {
  if (!searchQuery.value) {
    characters.value = [];
    return;
  }

  try {
    error.value = null;
    const response = await axios.get(`http://localhost:3000/api/search?name=${searchQuery.value}`);

    characters.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.error || "Server error";
    characters.value = [];
  }
};

watch(searchQuery, () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchCharacters, 500);
});
</script>