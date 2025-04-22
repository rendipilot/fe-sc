<template>
  <div class="flex flex-col h-screen bg-[#09090B]">
    <!-- header -->
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

    <!-- body -->
    <div
      class="flex flex-col w-[60%] mx-auto my-auto h-[60%] rounded-md bg-[#18181B]"
    >
      <h2 class="text-2xl text-white font-semibold mx-auto mt-4">My Account</h2>
      <div class="border-t border-white mb-6 mt-4 mx-4"></div>
      <form class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-white ml-6">Email address</label>
          <input
            :type="email"
            class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
            pattern=".+@gmail\.com"
            v-model="email"
            placeholder="gunakan @gmail.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-white ml-6">Username</label>
          <input
            :type="email"
            class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
            pattern=".+@gmail\.com"
            v-model="email"
            placeholder="gunakan @gmail.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-white ml-6">Status</label>
          <h2 class="flex gap-2 ml-6 text-white font-semibold">
            <span class="text-[#06D001]">
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
                /></svg
            ></span>
            Active
          </h2>
        </div>
        <div class="px-6">
          <button
            class="w-full py-2 text-white font-semibold rounded-md bg-[#FBBF24]"
          >
            Save
          </button>
        </div>
      </form>

      <div class="flex flex-col gap-2 mt-4">
        <label class="text-white ml-6">Password</label>
        <button
          type="button"
          class="ml-6 bg-[#410445] w-48 px-2 py-2 rounded-md"
          @click="modalChangePasswordHandler"
        >
          Change Password
        </button>
      </div>
      <dialog ref="modalChangePassword" class="modal">
        <div class="modal-box bg-[#18181B]">
          <h3 class="text-lg font-bold text-white">Change Password</h3>
          <form class="flex flex-col gap-4 mt-6">
            <div class="flex flex-col gap-2 mt-2">
              <label class="text-white  ml-6">Old password</label>
              <input
                :type="password"
                class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
              />
            </div>
            <div class="flex flex-col gap-2 mt-2">
              <label class="text-white ml-6">New password</label>
              <input
                :type="password"
                class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
              />
            </div>
          </form>
          <div class="modal-action">
            <button class="btn bg-[#FBBF24]">Save</button>
            <button
              class="btn bg-red-500"
              @click="modalChangePassword?.close()"
            >
              Tutup
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const isDropdownOpen = ref(false);
const modalChangePassword = ref(null);

const modalChangePasswordHandler = () => {
  modalChangePassword.value?.showModal();
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>
