<template>
  <div class="flex flex-col h-screen bg-[#09090B]">
    <!-- Header -->
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

    <!-- Body -->
    <main
      class="flex flex-col w-[60%] mx-auto my-auto h-[50%] rounded-md bg-[#18181B] p-6"
    >
      <h2 class="text-2xl text-white font-semibold text-center mb-4">
        My Account
      </h2>
      <form class="flex flex-col gap-5"  @submit.prevent="changeUserHandler">
        <div class="flex flex-col gap-2">
          <label class="text-white ml-1">Email address</label>
          <input
            type="email"
            v-model="email"
            class="w-full py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
            placeholder="gunakan @gmail.com"
            required
            pattern=".+@gmail\.com"
          />
          <p v-if="changeEmailMsg" class="text-red-500 mt-2">{{ changeEmailMsg }}</p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-white ml-1">Status</label>
          <h2 class="flex items-center gap-2 text-white font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-[#06D001]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Active
          </h2>
        </div>
        <p class="text-red-500 mt-2">Jika mengubah email anda akan diminta login kembali</p>
        <button
          type="submit"
          class="w-full py-2 text-white font-semibold rounded-md bg-[#FBBF24]"
        >
          Save
        </button>
      </form>

      <div class="flex flex-col gap-2 mt-6">
        <label class="text-white">Password</label>
        <button
          type="button"
          class="bg-[#410445] w-48 px-2 py-2 rounded-md text-white"
          @click="modalChangePasswordHandler(true)"
        >
          Change Password
        </button>
      </div>

      <!-- Modal -->
      <dialog ref="modalChangePassword" class="modal">
        <div class="modal-box bg-[#18181B] text-white p-6 rounded-md">
          <h3 class="text-lg font-bold">Change Password</h3>
          <form
            class="flex flex-col gap-4 mt-6"
            @submit.prevent="changePasswordHandler"
          >
            <div class="flex flex-col gap-2">
              <label>Old password</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="oldPassword"
                class="w-full py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label>New password</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="newPassword"
                class="w-full py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
                required
              />
            </div>
            <label class="text-gray-400 text-sm flex items-center gap-2">
              <input type="checkbox" v-model="showPassword" />
              Show Password
            </label>
            <p v-if="modalChangeError" class="text-red-500 mt-2">
              {{ modalChangeError }}
            </p>
            <p v-if="modalChangeSuccess" class="text-green-500 mt-2">
              Password berhasil diganti
            </p>
            <div class="modal-action mt-4">
              <button type="submit" class="btn bg-[#FBBF24] text-white">
                Save
              </button>
              <button
                type="button"
                class="btn bg-red-500 text-white"
                @click="modalChangePasswordHandler(false)"
              >
                Tutup
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { changePassword, updateDataUser } from "~/services/user";

definePageMeta({
  middleware: ["page"],
});

const isDropdownOpen = ref(false);
const modalChangePassword = ref(null);
const userData = useUserStore();
const email = ref(userData.user?.email || "");
const oldPassword = ref("");
const newPassword = ref("");
const modalChangeError = ref(null);
const modalChangeSuccess = ref(false);
const showPassword = ref(false);
const changeEmailMsg = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const modalChangePasswordHandler = (open) => {
  if (open) {
    modalChangePassword.value?.showModal();
  } else {
    oldPassword.value = "";
    newPassword.value = "";
    modalChangeError.value = null;
    modalChangeSuccess.value = false;
    modalChangePassword.value?.close();
  }
};

const logoutHandler = async () => {
  await userData.logout();
  await navigateTo("/login");
};

const changeUserHandler = async () => {
  try {
    if(userData.user.email === email){
      return;
    }

    const res = await updateDataUser({email : email.value})

    if(res.valid){
      userData.logout()
      return navigateTo("/login")
    }
  } catch (error) {
    changeEmailMsg.value = error
  }
}

const changePasswordHandler = async () => {
  try {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(newPassword.value)) {
      modalChangeError.value =
        "Password baru harus memiliki minimal 8 karakter, satu huruf besar, satu angka, dan satu karakter unik.";
      return; // Hentikan eksekusi jika password tidak valid
    }

    const res = await changePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    console.log("ress change password = ", res);
    if (res.valid) {
      modalChangeError.value = null;
      modalChangeSuccess.value = true;
      oldPassword.value = "";
      newPassword.value = "";
    } else {
      modalChangeError.value = res.message;
    }
  } catch (error) {
    return;
  }
};
</script>
