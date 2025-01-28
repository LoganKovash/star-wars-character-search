<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        type="text" 
        v-model="searchQuery"
        @input="validateInput"
        placeholder="Search for a character" 
        class="text-white py-2 px-1 w-full bg-transparent border-b focus:border-app-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <div v-if="error">
        <p>Error: {{ error }}</p>
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

const router = useRouter();

const searchQuery = ref('');
const characters = ref([]);
const error = ref(null);
let timeout = null;

const validateInput = () => {
  // Allow only letters, numbers, and spaces
  const validPattern = /^[a-zA-Z0-9\s]*$/;

  if (!validPattern.test(searchQuery.value)) {
    error.value = "Special characters are not allowed!";
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove invalid characters
  } else {
    error.value = ""; // Clear error if input is valid
  }
}

// Pushes user to the selected characters profile page
const viewCharacter = (character) => {
  const characterId = character.url.match(/\/(\d+)\/$/)[1]; // Extract ID from API URL
  router.push({
    name: 'characterView',
    params: {characterId: characterId},
    query: {
      preview: true
    }
  })
}


// Fetches all the characters that match the search and saves them to the characters array
const fetchCharacters = async () => {
  if (!searchQuery.value) {
    characters.value = [];
    return; // Prevent fetching if input is empty
  }

  try {
    error.value = null;
    const response = await fetch(`https://swapi.dev/api/people/?search=${searchQuery.value}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    characters.value = data.results // Store all matching characters
  } catch (err) {
    error.value = err.message;
    characters.value = [];
  }
};

// watches for requests
watch(searchQuery, () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchCharacters, 500);
});
</script>