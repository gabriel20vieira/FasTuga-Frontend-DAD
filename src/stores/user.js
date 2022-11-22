import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const axios = inject("axios");
  const toast = inject("toast");
});
