<template>
  <div class="flex flex-col h-screen bg-[#09090B]">
    <div class="flex items-center justify-between w-screen h-20 bg-[#18181B]">
      
      <NuxtLink to="/"
        ><h2 class="text-white text-xl font-semibold ml-4 hover:text-[#FBBF24]">
          Scratch Report
        </h2></NuxtLink
      >
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
        <NuxtLink to="/">
            <button
            class="w-full text-left px-4 py-2 text-white hover:bg-[#410445] mt-4 transition duration-150 rounded-md"
          >
            Home
          </button>
          </NuxtLink>
          <NuxtLink to="/history">
            <button
              class="w-full text-left px-4 py-2 text-white hover:bg-[#FBBF24] mt-4 transition duration-150 rounded-md"
            >
              History Data
            </button>
          </NuxtLink>
          <NuxtLink to="/teacher">
            <button
              class="w-full text-left px-4 py-2 text-white hover:bg-[#06D001] mt-4 transition duration-150 rounded-md"
            >
              Teacher
            </button>
          </NuxtLink>
          <NuxtLink to="/user">
            <button
              class="w-full text-left px-4 py-2 text-white hover:bg-[#0118D8] mt-4 transition duration-150 rounded-md"
            >
              My Account
            </button>
          </NuxtLink>
          <button
            class="w-full text-left px-4 py-2 text-white hover:bg-red-600 mt-4 transition duration-150 rounded-md"
            @click="logoutHandler"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    <div class="flex mt-10 w-[80%] mx-auto">
      <h2 class="text-3xl font-semibold">Teacher</h2>
    </div>
    <div class="flex w-[80%] mx-auto mt-5 justify-between items-center">
      <button
        class="py-2 px-2 bg-[#FBBF24] rounded-md font-semibold"
        @click="modelHandler"
      >
        New Teacher
      </button>
      <input
        class="w-auto py-4 px-4 text-gray-200 rounded-md bg-[#242427]"
        placeholder="searching"
      />
    </div>
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4 w-[80%] mx-auto"
    >
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Join</th>
            <th>Aktif</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Render data yang ada -->
          <tr v-for="(person, index) in people" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ person.name }}</td>
            <td>{{ person.join }}</td>
            <td>
              <button
                :class="person.active ? 'text-[#06D001]' : 'text-red-500'"
              >
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
            </td>
            <td>
              <div class="flex gap-4">
                <button class="px-2 py-2 text-[#FBBF24] rounded-md">
                  Edit
                </button>
                <button class="px-2 py-2 text-red-500 rounded-md">
                  Delete
                </button>
              </div>
            </td>
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

    <!-- Modal -->
    <dialog ref="modalRef" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold text-white">Add Teacher</h3>
        <p class="py-4 text-white">Ini adalah isi modal</p>
        <div class="modal-action">
          <button class="btn" @click="modalRef?.close()">Tutup</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
});

const isDropdownOpen = ref(false);
const modalRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const people = [
  { name: "Rendy Eka Febriyanto", join: "2022", active: true },
  { name: "Indra Kurniawan", join: "2022", active: true },
  { name: "Muhammada Andriyan Ichsan", join: "2024", active: true },
];

// Hitung berapa baris kosong yang perlu ditambahkan
const emptyRows = 10 - people.length;

const modelHandler = () => {
  modalRef.value?.showModal();
};

const closeModal = () => {
  modalRef.value?.close();
};

const logoutHandler = async () => {
  const cookie = useCookie("scr-token");
  cookie.value = null;
  await navigateTo("/login");
};
</script>
