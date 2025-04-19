<template>
  <div class="flex h-screen w-screen bg-[#09090B] justify-center items-center">
    <div class="flex flex-col rounded-xl w-[25%] h-[50%] bg-[#18181B]">
      <h2 class="flex justify-center mt-5 text-3xl text-[#FBBF24] font-semibold">MKM Coding</h2>
      <h2 class="flex justify-center mt-3 text-3xl text-white font-semibold">
        Login
      </h2>
      <form class="flex flex-col gap-6 mt-10">
        <div class="flex flex-col gap-2">
          <label class="text-white ml-6">Email address</label>
          <input
            class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
            placeholder="masukkan email"
          />
        </div>
        <div class="flex flex-col gap-2 overflow-hidden">
          <label class="text-white ml-6">Password</label>
          <input
            class="w-auto mx-6 py-2 px-2 text-gray-200 rounded-md bg-[#242427]"
            placeholder="masukkan password"
          />
          <div class="flex justify-between mx-6">
            <label class="text-gray-400 text-sm flex items-center gap-2">
              <input type="checkbox" v-model="showPassword" />
              Show Password
            </label>
          </div>
        </div>
        <div class="flex">
          <button
            class="w-full mx-6 px-6 py-1 text-white font-semibold rounded-md bg-[#FBBF24]"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup></script>
