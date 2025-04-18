<template>
  <div class="flex flex-col h-screen bg-[#09090B]">
    <!-- Header -->
    <div class="flex items-center justify-between w-screen h-20 bg-[#18181B]">
      <h2 class="text-white text-xl font-semibold ml-4 hover:text-[#FBBF24]">Scratch Report</h2>
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
          <button class="w-full text-left px-4 py-2 text-white hover:bg-[#FBBF24] mt-4 transition duration-150 rounded-md">
            History Data
          </button>
        </div>
      </div>
    </div>

    <!-- Title -->
    <p class="text-white text-3xl font-semibold mt-16 mx-auto hover:text-[#FBBF24]">
      Upload Your Scratch Project
    </p>

    <!-- Upload Area -->
    <div
      class="flex flex-col items-center mx-auto bg-[#18181B] rounded-md w-full max-w-md p-6 mt-10 border-2 border-dashed"
      :class="
        isDragging ? 'border-yellow-400 bg-yellow-900/20' : 'border-gray-600'
      "
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <label class="text-white text-lg font-semibold mb-4">Project File</label>

      <input
        type="file"
        id="file-upload"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
      />
      <label
        for="file-upload"
        class="cursor-pointer inline-block bg-[#FBBF24] text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
      >
        Choose File
      </label>
      <p :class="['mt-4 text-sm text-white', selectedFile ? 'hidden' : '']">
        No file chosen
      </p>
      <p
        id="file-name"
        :class="[
          'mt-4 text-sm',
          selectedFile ? 'text-amber-500 font-semibold' : 'text-white',
          isValid ? '' : 'hidden',
        ]"
      >
        {{ selectedFile ? selectedFile.name : "No file chosen" }}
      </p>
      <p
        :class="[
          !isValid && selectedFile ? 'mt-4 text-sm text-red-500' : 'hidden',
        ]"
      >
        File harus berformat sb3
      </p>
    </div>

    <div class="flex gap-4 mx-auto mt-4">
      <button
        class="text-xl text-white py-2 px-6 rounded-md transition duration-200"
        :class="
          isValid
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-500 cursor-not-allowed'
        "
        :disabled="!isValid"
        @click="handleDeleteFile"
      >
        Delete File
      </button>
      <button
        class="text-xl text-white py-2 px-6 rounded-md transition duration-200"
        :class="
          isValid
            ? 'bg-[#FBBF24] hover:bg-yellow-600'
            : 'bg-gray-500 cursor-not-allowed'
        "
        :disabled="!isValid"
      >
        Send File
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedFile = ref(null);
const isDragging = ref(false);
const fileInput = ref(null);
const isValid = ref(false);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];

  if (!selectedFile.value.name.endsWith(".sb3")) {
    isValid.value = false;
  } else {
    isValid.value = true;
  }
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    selectedFile.value = file;
    fileInput.value.files = event.dataTransfer.files;

    if (!selectedFile.value.name.endsWith(".sb3")) {
      isValid.value = false;
    } else {
      isValid.value = true;
    }
  }
  isDragging.value = false;
};

const handleDeleteFile = () => {
  selectedFile.value = null;
  isValid.value = false;
};
</script>
