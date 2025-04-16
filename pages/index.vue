<template>
  <div class="flex h-screen">
    <!-- Chap panel (chatlar ro'yxati) -->
    <div class="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
      <button
        @click="createNewChat"
        class="mb-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        + Yangi yozishma
      </button>
      <ul>
        <li
          v-for="chat in chats"
          :key="chat.id"
          :class="[
            'cursor-pointer p-2 rounded',
            chat.id === selectedChatId ? 'bg-blue-200' : 'hover:bg-gray-200',
          ]"
          @click="selectChat(chat.id)"
        >
          {{ chat.title }}
        </li>
      </ul>
    </div>

    <!-- O'ng panel (tanlangan chat oynasi) -->
    <div class="flex-1 p-6 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Chat #{{ selectedChatId }}</h2>

      <div v-if="selectedChatMessages.length === 0" class="text-gray-500">
        Yozishmalar yo‘q
      </div>

      <div
        v-for="msg in selectedChatMessages"
        :key="msg.id"
        class="mb-4 p-3 bg-white border rounded shadow-sm"
      >
        <div class="font-medium text-blue-600">Siz:</div>
        <div v-if="msg.image">
          <img :src="msg.image" class="max-h-48 rounded mb-2" />
        </div>
        <div>{{ msg.message }}</div>
        <div class="mt-2 font-medium text-green-600">AI:</div>
        <div>{{ msg.reply }}</div>
      </div>

      <!-- Yangi xabar -->
      <div class="mt-6">
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="mb-2"
        />
        <input
          type="text"
          v-model="newMessage"
          placeholder="Xabar yozing..."
          class="w-full p-2 border rounded mb-2"
        />
        <button
          @click="sendMessage"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yuborish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const baseURL = "http://localhost:3001/";

const chats = ref([]);
const selectedChatId = ref(null);
const selectedChat = computed(
  () => chats.value.find((c) => c.id === selectedChatId.value) || {}
);
const selectedChatMessages = computed(() => selectedChat.value?.messages || []);

const newMessage = ref("");
const newImageBase64 = ref("");

const loadChats = async () => {
  const res = await fetch(baseURL + "chats");
  chats.value = await res.json();
};

const selectChat = (id) => {
  selectedChatId.value = id;
};

const createNewChat = async () => {
  const title = `Yozishma #${chats.value.length + 1}`;
  const res = await fetch(baseURL + "chats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, messages: [] }),
  });
  const newChat = await res.json();
  chats.value.push(newChat);
  selectedChatId.value = newChat.id;
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    newImageBase64.value = reader.result;
  };
  reader.readAsDataURL(file);
};

const sendMessage = async () => {
  if (!selectedChat.value || !newMessage.value) return;

  // Javobni olish
  const keyword = newMessage.value.toLowerCase();
  const res = await fetch(baseURL + "answers?keyword=" + keyword);
  const data = await res.json();
  const reply =
    data.length > 0 ? data[0].reply : "Kechirasiz, javob topilmadi.";

  const newMsg = {
    id: Date.now(),
    message: newMessage.value,
    reply,
    image: newImageBase64.value || null,
  };

  // Chat ichiga qo‘shamiz
  const updatedMessages = [...selectedChatMessages.value, newMsg];

  await fetch(baseURL + "chats/" + selectedChatId.value, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: updatedMessages }),
  });

  newMessage.value = "";
  newImageBase64.value = "";
  await loadChats();
};
onMounted(loadChats);
</script>

<style>
img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>
