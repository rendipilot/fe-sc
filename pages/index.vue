<template>
  <div class="flex flex-col h-screen bg-[#09090B]">
    <!-- Header -->
    <div class="flex items-center justify-between w-screen h-20 bg-[#18181B]">
      <NuxtLink to="/"><h2 class="text-white text-xl font-semibold ml-4 hover:text-[#FBBF24]">
        Scratch Report
      </h2></NuxtLink>
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
          <NuxtLink to="/history">
            <button
            class="w-full text-left px-4 py-2 text-white hover:bg-[#FBBF24] mt-4 transition duration-150 rounded-md"
          >
            History Data
          </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Title -->
    <p
      class="text-white text-3xl font-semibold mt-16 mx-auto hover:text-[#FBBF24]"
    >
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
        @click="sendDataScratch"
      >
        Send File
      </button>
    </div>

    <div class="flex flex-col border-2 border-gray bg-[#18181B] p-10 rounded-xl w-[50%] mx-auto mt-18">
      <h2 class="text-white text-3xl mb-10 font-semibold">Project : <span class="text-[#FBBF24]">{{ fileName }}</span></h2>
      <div class="border-t border-white mb-6"></div>
      <div
        class="flex justify-between"
      >
        <div class="flex flex-col gap-4 text-white">
          <p class="text-[#FBBF24] font-semibold text-4xl">{{ creativity }}</p>
          <h2>Creativity Score</h2>
        </div>
        <div class="flex flex-col gap-4 text-white">
          <p class="text-[#FBBF24] font-semibold text-4xl">{{ logical }}</p>
          <h2>Logical Score</h2>
        </div>
        <div class="flex flex-col gap-4 text-white">
          <p class="text-[#FBBF24] font-semibold text-4xl">{{ complexity }}</p>
          <h2>Complexity Score</h2>
        </div>
        <div class="flex flex-col gap-4 text-white">
          <p class="text-[#FBBF24] font-semibold text-4xl">{{ level }}</p>
          <h2>Level Project</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { sendFileScratch } from "~/services/modelService";

const selectedFile = ref(null);
const isDragging = ref(false);
const fileInput = ref(null);
const isValid = ref(false);
const isDropdownOpen = ref(false);
const complexity = ref(0);
const logical = ref(0);
const creativity = ref(0);
const level = ref("none");
const fileName = ref("-");

const levelMap = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert']

definePageMeta({
  middleware: 'auth'
})


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

const sendDataScratch = async() => {
  const res = await sendFileScratch(selectedFile.value);
  if(res !== null){
    complexity.value = res.data.complexity;
    creativity.value = res.data.creativity;
    logical.value = res.data.logical;

    const rawLevel = res.data.level;
    const roundedLevel = Math.round(rawLevel);
    level.value = levelMap[roundedLevel]

    fileName.value = selectedFile.value.name.split(".")[0]
    selectedFile.value = null;
    isValid.value = false;
  }
}
</script>
