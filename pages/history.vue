<template>
    <div class="flex flex-col h-screen bg-[#09090B]">
        <div class="flex items-center justify-between w-screen h-20 bg-[#18181B]">
      <h2 class="text-white text-xl font-semibold ml-4 hover:text-[#FBBF24]">
        Scratch Report
      </h2>
      <div class="flex gap-2 mr-6">
        <p class="text-white font-semibold">Hai andrian</p>
        <button class="text-white hover:text-[#FBBF24]" @click="toggleDropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute top-14 right-4 w-48 bg-[#1F1F23] border border-gray-700 rounded-md shadow-lg z-50 p-6"
        >
          <button
            class="w-full text-left px-4 py-2 text-white hover:bg-red-600 transition duration-150 rounded-md"
            @click="logout"
          >
            Logout
          </button>
          <button
            class="w-full text-left px-4 py-2 text-white hover:bg-[#FBBF24] mt-4 transition duration-150 rounded-md"
          >
            History Data
          </button>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>