<template>
  <div class="bg-zinc-800 rounded-md mb-4">
    <button
      @click="toggleAccordion()"
      class="flex justify-between items-center py-2 px-4"
      :aria-expanded="isOpen"
    >
      <slot
        class="text-lg grow"
        style="text-align: left !important"
        name="title"
      />
      <div>
        <svg
          class="transition-all duration-200 transform"
          :class="{
            'rotate-180': isOpen,
            'rotate-0': !isOpen,
          }"
          fill="none"
          stroke="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 10"
          aria-hidden="true"
          style="margin-left: 0px; width: 18px"
        >
          <path
            d="M15 1.2l-7 7-7-7"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>

    <div v-show="isOpen" class="bg-white rounded-b-md">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
