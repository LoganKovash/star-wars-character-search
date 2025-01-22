<template>
    <header class="sticky top-0 bg-app-primary shadow-lg">
      <nav
        class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
      >
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-jedi"></i>
            <p class="text-2xl">The Star Wars Database</p>
          </div>
        </RouterLink>
  
        <div class="flex gap-3 flex-1 justify-end">
          <i
            @click="toggleModal" class="fa-solid fa-circle-info text-xl hover:text-app-secondary duration-150 cursor-pointer"
          ></i>
        </div>

        <BaseModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Star Wars Database allows you to search for the information of any character available in the database and save it.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for a character by entering their name into the
              search bar.
            </li>
            <li>
              Select a character within the results, this will take
              you to the details of your selection.
            </li>
          </ol>
        </div>
      </BaseModal>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  import BaseModal from "./BaseModal.vue"

  const modalActive = ref(null);

  // toggles informaiton modal on and off
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  </script>