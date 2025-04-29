<template>
  <div class="flex flex-col h-screen bg-[#09090B]">
    <div class="flex items-center justify-between w-screen h-20 bg-[#18181B]">
      <NuxtLink to="/"
        ><h2 class="text-white text-xl font-semibold ml-4 hover:text-[#FBBF24]">
          Scratch Report
        </h2></NuxtLink
      >
      <div class="flex gap-2 mr-6">
        <p class="text-white font-semibold">
          Hai {{ userData.user.username.split(" ")[0] }}
        </p>
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
              v-if="userData.user?.role === 'admin'"
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

    <div class="flex w-[80%] mx-auto mt-10 justify-between items-center">
      <h2 class="text-3xl font-semibold">History</h2>
      <input
        class="w-auto py-4 px-4 text-gray-200 rounded-md bg-[#242427]"
        placeholder="searching"
        v-model="searchQuery"
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
            <th>Creativity score</th>
            <th>Logical score</th>
            <th>Complexity score</th>
            <th>Level proyek</th>
            <th>Tanggal</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          <!-- Render data yang ada -->
          <tr v-for="(history, index) in paginatedHistories" :key="index">
            <th>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
            <td>{{ history.name }}</td>
            <td>{{ history.creativity_score }}</td>
            <td>{{ history.logical_score }}</td>
            <td>{{ history.complexity_score }}</td>
            <td>{{ levelMap[Math.round(history.level_score)] }}</td>
            <td>{{ history.created_at }}</td>
            <td>{{ history.username }}</td>
          </tr>

          <!-- Tambahkan baris kosong kalau kurang dari 10 -->
          <tr
            v-for="i in Math.max(itemsPerPage - paginatedHistories.length, 0)"
            :key="'empty-' + i"
          >
            <th class="opacity-50">{{ paginatedHistories.length + i }}</th>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
            <td class="opacity-50">-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="join mt-4 w-[80%] justify-end mx-auto">
      <button
        class="join-item btn btn-outline mr-1 rounded-md"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous
      </button>

      <button
        v-for="page in visiblePages"
        :key="'page-' + page"
        class="join-item btn btn-square"
        :class="{ 'bg-yellow-400 text-black': currentPage === page }"
        @click="currentPage = page"
      >
        {{ page }}
      </button>

      <button
        class="join-item btn btn-outline ml-1 rounded-md"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAllDataHistoriesForOneTeacher,
  getAllDataHistories,
} from "~/services/history";

definePageMeta({
  middleware: "page",
});

const isDropdownOpen = ref(false);
const userData = useUserStore();
const searchQuery = ref("");
const histories = ref([]);
const levelMap = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
const currentPage = ref(1);
const itemsPerPage = 10;

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const emptyRows = computed(() =>
  Math.max(10 - filteredHistories.value.length, 0)
);

const logoutHandler = async () => {
  await userData.logout();
  await navigateTo("/login");
};

onMounted(async () => {
  const getData = async () => {
    try {
      console.log("role = ", userData.user.role);
      if (userData.user.role === "admin") {
        const res = await getAllDataHistories();

        if (!res) {
          throw new Error("gagal mendapatkan data history");
        }

        // Simpan data history ke variabel history jika diperlukan
        histories.value = res.data;
      } else {
        const res = await getAllDataHistoriesForOneTeacher();

        if (!res) {
          throw new Error("gagal mendapatkan data history");
        }

        // Simpan data history ke variabel history jika diperlukan
        histories.value = res.data;
      }
    } catch (error) {
      console.log("gagal mendapatkan data history", error);
    }
  };

  await getData(); // Panggil fungsi getData
});

const filteredHistories = computed(() => {
  return histories.value.filter((history) => {
    const search = searchQuery.value.toLowerCase();

    const levelMatch = levelMap[Math.round(history.level_score)]
      .toLowerCase()
      .includes(search);

    return (
      history.name.toLowerCase().includes(search) ||
      history.username.toLowerCase().includes(search) ||
      history.created_at.toLowerCase().includes(search) ||
      levelMatch
    );
  });
});

const paginatedHistories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredHistories.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredHistories.value.length / itemsPerPage)
);

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 2;
  let start = Math.max(currentPage.value - 1, 1);
  let end = Math.min(start + maxVisible - 1, totalPages.value);

  // Adjust if di akhir agar tetap dua tombol saat mendekati akhir
  if (end - start + 1 < maxVisible) {
    start = Math.max(end - maxVisible + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>
