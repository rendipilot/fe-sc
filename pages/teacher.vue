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
            <th>Email</th>
            <th>Join</th>
            <th>Aktif</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Render data yang ada -->
          <tr v-for="(teacher, index) in teachers" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ teacher.username }}</td>
            <td>{{ teacher.email }}</td>
            <td>{{ teacher.created_at }}</td>
            <td>
              <button
                :class="teacher.active ? 'text-[#06D001]' : 'text-red-500'"
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
                <button
                  class="px-2 py-2 text-[#FBBF24] rounded-md"
                  @click="editHandler(teacher.id)"
                >
                  Edit
                </button>
                <button
                  class="px-2 py-2 rounded-md"
                  :class="teacher.active ? 'text-red-500' : 'text-green-500'"
                  @click="deleteActiveHandler(teacher.id, teacher.active ? 'deactivate' : 'activate')"
                >
                  {{ teacher.active ? "Deactivate" : "Activate" }}
                </button>
              </div>
            </td>
          </tr>

          <!-- Tambahkan baris kosong kalau kurang dari 10 -->
          <tr v-for="i in emptyRows" :key="'empty-' + i">
            <th class="opacity-50">{{ teachers.length + i }}</th>
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
      <div class="modal-box bg-[#18181B]">
        <h3 class="text-lg font-bold text-white">{{ modalTitle }} Teacher</h3>
        <form class="mt-4" @submit.prevent="addUpdateTeacherHandler">
          <div class="flex flex-col gap-2 mt-2">
            <label class="ml-6">Nama</label>
            <input
              v-model="username"
              required
              class="w-auto mx-6 py-2 px-2 rounded-md bg-[#242427]"
            />
          </div>
          <div class="flex flex-col gap-2 mt-2">
            <label class="ml-6">Email</label>
            <input
              :type="email"
              v-model="emailUser"
              pattern=".+@gmail\.com"
              required
              class="w-auto mx-6 py-2 px-2 rounded-md bg-[#242427]"
            />
          </div>
          <div class="flex flex-col gap-2 mt-2">
            <label class="ml-6">Password</label>
            <div class="flex items-center gap-2 mx-6">
              <input
                class="py-2 px-2 rounded-md bg-[#242427] text-white w-full"
                v-model="password"
                required
                readonly
              />
              <button
                type="button"
                @click="generatePassword"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
              >
                Generate
              </button>
            </div>
          </div>
          <p v-if="modalMsg" class="text-red-500">{{ modalMsg }}</p>
          <div class="modal-action">
            <button type="submit" class="bg-[#FBBF24] btn">Save</button>
            <button class="btn bg-red-500" @click="closeModal">Tutup</button>
          </div>
        </form>
      </div>
    </dialog>

    <dialog class="modal" ref="modalDeleteTeacher">
      <div class="modal-box">
        <h3>{{ modalActivationTitle }} Teacher</h3>
        <p class="mt-2 font-semibold">
          Apakah anda yakin {{ modalActivationTitle === "activate" ? "aktivasi" : "menonaktifkan" }} data guru ini?
        </p>
        <div class="modal-action">
          <button class="bg-[#FBBF24] btn" @click="deleteActiveTeacher">Save</button>
          <button class="btn bg-red-500" @click="closeModalDeleteTeacher">
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { activateTeacherData, createTeacherData, deleteTeacherData, editTeacherData, getAllTeacherData } from "~/services/teacher";

definePageMeta({
  middleware: ["page-admin"],
});

const isDropdownOpen = ref(false);
const modalRef = ref(null);
const modalDeleteTeacher = ref(null);
const username = ref("");
const emailUser = ref("");
const password = ref("");
const userData = useUserStore();
const teachers = ref([]);
const modalMsg = ref(null);
const modalTitle = ref("Add");
const teacherId = ref (null)
const deleteMsg = ref(null)
const modalActivationTitle  = ref("deactivate")

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const people = [
  {
    id: 1,
    name: "Rendy Eka Febriyanto",
    email: "test@gmail.com",
    join: "2022",
    active: true,
  },
  {
    id: 2,
    name: "Indra Kurniawan",
    email: "test@gmail.com",
    join: "2022",
    active: true,
  },
  {
    id: 3,
    name: "Muhammada Andriyan Ichsan",
    email: "test@gmail.com",
    join: "2024",
    active: true,
  },
];

// Hitung berapa baris kosong yang perlu ditambahkan
const emptyRows = computed(() => 10 - teachers.value.length);

const modelHandler = () => {
  modalRef.value?.showModal();
};

const closeModal = () => {
  password.value = "";
  username.value = "";
  emailUser.value = "";
  teacherId.value = null
  modalRef.value?.close();
};

const closeModalDeleteTeacher = () => {
  modalDeleteTeacher.value?.close();
};

const logoutHandler = async () => {
  await userData.logout();
  await navigateTo("/login");
};

const generatePassword = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let newPassword = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    newPassword += chars[randomIndex];
  }
  password.value = newPassword;
};

const editHandler = (id) => {
  const teacher = teachers.value.find((p) => p.id === id);
  username.value = teacher.username;
  emailUser.value = teacher.email;
  modalTitle.value = "Edit";
  teacherId.value = id

  modalRef.value?.showModal();
};

const deleteActiveHandler = (id, action) => {
  teacherId.value = id
  console.log("action = ",action)
  if(action === "activate"){
    modalActivationTitle.value = action
  }
  modalDeleteTeacher.value?.showModal();
};

const deleteActiveTeacher = async() => {
  try {
    if(modalActivationTitle.value === "deactivate"){
      const res = await deleteTeacherData({
        teacher_id: teacherId.value
      });

      if (res.valid) {
        const res = await getAllTeacherData();
        teacherId.value = null
        teachers.value = res.data;
        modalDeleteTeacher.value?.close()
      }
    }else{
      const res = await activateTeacherData({
        teacher_id: teacherId.value
      });

      if (res.valid) {
        const res = await getAllTeacherData();
        teacherId.value = null
        teachers.value = res.data;
        modalActivationTitle.value = "deactivate"
        modalDeleteTeacher.value?.close()
      }
    }
  } catch (error) {
    deleteMsg.value = error
  }
}

const addUpdateTeacherHandler = async () => {
  try {
    if (modalTitle === "Add") {
      const res = await createTeacherData({
        email: emailUser.value,
        username: username.value,
        password: password.value,
      });

      if (res.valid) {
        const res = await getAllTeacherData();
        teachers.value = res.data;
        closeModal()
      }
    }else{
      const res = await editTeacherData({
        email: emailUser.value,
        username: username.value,
        password: password.value,
        teacher_id: teacherId.value
      });

      if (res.valid) {
        const res = await getAllTeacherData();
        teachers.value = res.data;
        
        closeModal()
      }
    }
  } catch (error) {
    modalMsg.value = error;
  }
};

onMounted(async () => {
  const getData = async () => {
    try {
      console.log("role = ", userData.user.role);
      if (userData.user.role === "admin") {
        const res = await getAllTeacherData();

        if (!res) {
          throw new Error("gagal mendapatkan data teacher");
        }

        // Simpan data history ke variabel history jika diperlukan
        teachers.value = res.data;
      }
    } catch (error) {
      console.log("gagal mendapatkan data history", error);
    }
  };

  await getData(); // Panggil fungsi getData
});
</script>
