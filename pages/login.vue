<template>
  <div class="flex h-screen w-screen bg-[#09090B] justify-center items-center">
    <div class="flex flex-col rounded-xl w-[25%] h-[50%] bg-[#18181B]">
      <h2
        class="flex justify-center mt-5 text-3xl text-[#FBBF24] font-semibold"
      >
        MKM Coding
      </h2>
      <h2 class="flex justify-center mt-3 text-3xl text-white font-semibold">
        Login
      </h2>
      <form class="flex flex-col gap-6 mt-10" @submit.prevent="loginHandler">
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
        <div class="flex flex-col gap-2 overflow-hidden">
          <label class="text-white ml-6">Password</label>
          <input
            class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
            placeholder="masukkan password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
          />
          <div class="flex justify-between mx-6">
            <label class="text-gray-400 text-sm flex items-center gap-2">
              <input type="checkbox" v-model="showPassword" />
              Show Password
            </label>
          </div>
          <div v-if="errorLogin" class="flex mx-6">
            <p class="text-red-500">{{ errorLogin }}</p>
          </div>
        </div>
        <div class="flex">
          <button
            class="w-full mx-6 px-6 py-1 text-white font-semibold rounded-md bg-[#FBBF24]"
          >
            Sign In
          </button>
        </div>
        <h2 class="flex justify-center mx-6">
          Lupa password ?
          <span class="ml-2">
            <button class="text-[#FBBF24]" @click="modalForgotPasswordHandler">
              Hubungi admin
            </button></span
          >
        </h2>
      </form>
      <dialog ref="modalForgotPassword" class="modal">
        <div class="modal-box bg-[#18181B]">
          <h3 class="text-lg font-bold text-white">Forgot Password</h3>
          <p class="mt-2">
            Hubungin admin melalui whatsapp dan berikan permintaan untuk
            password sementara, login dengan password yang diberikan dan ganti
            password setelah login
          </p>
          <div class="modal-action">
            <button
              class="btn bg-red-500"
              @click="modalForgotPassword?.close()"
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
  middleware: ["auth-login"]
})

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorLogin = ref("");
const userData = useUserStore();

const modalForgotPassword = ref(null);

const modalForgotPasswordHandler = () => {
  modalForgotPassword.value?.showModal();
};

const loginHandler = async () => {
  const res = await userData.login({
    email: email.value,
    password: password.value,
  });

  if (res.valid) {
    console.log("data yang diterima ", res);
    await navigateTo("/")
  } else {
    errorLogin.value = "email atau password salah";
    console.log("login tidak behasil handler");
  }
};
</script>
