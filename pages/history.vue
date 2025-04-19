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
      <h2 class="mt-10 text-3xl font-semibold mx-auto">History</h2>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4 w-[80%] mx-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          <!-- Render data yang ada -->
          <tr v-for="(person, index) in people" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ person.name }}</td>
            <td>{{ person.job }}</td>
            <td>{{ person.color }}</td>
          </tr>
  
          <!-- Tambahkan baris kosong kalau kurang dari 10 -->
          <tr v-for="i in emptyRows" :key="'empty-' + i">
            <th class="opacity-50">{{ people.length + i }}</th>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
          </tr>
        </tbody>
      </table>
    </div>
      <div class="join mt-4 w-[80%] justify-end mx-auto">
        <button class="join-item btn btn-outline mr-1 rounded-md">
          Previous
        </button>
  
        <input
          class="join-item btn btn-square peer/1 hidden"
          type="radio"
          name="page"
          id="page1"
          checked
        />
        <label
          for="page1"
          class="join-item btn btn-square peer-checked/1:bg-yellow-400 peer-checked/1:text-black"
          >1</label
        >
  
        <input
          class="join-item btn btn-square peer/2 hidden"
          type="radio"
          name="page"
          id="page2"
        />
        <label
          for="page2"
          class="join-item btn btn-square peer-checked/2:bg-yellow-400 peer-checked/2:text-black"
          >2</label
        >
  
        <input
          class="join-item btn btn-square peer/3 hidden"
          type="radio"
          name="page"
          id="page3"
        />
        <label
          for="page3"
          class="join-item btn btn-square peer-checked/3:bg-yellow-400 peer-checked/3:text-black"
          >3</label
        >
  
        <input
          class="join-item btn btn-square peer/4 hidden"
          type="radio"
          name="page"
          id="page4"
        />
        <label
          for="page4"
          class="join-item btn btn-square peer-checked/4:bg-yellow-400 peer-checked/4:text-black"
          >4</label
        >
  
        <button class="join-item btn btn-outline ml-1 rounded-md">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const isDropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const people = [
    { name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' }
  ];
  
  // Hitung berapa baris kosong yang perlu ditambahkan
  const emptyRows = 10 - people.length;
  </script>
  