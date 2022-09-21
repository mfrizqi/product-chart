<template>
  <div class="container mx-auto mt-16 mb-16">
    <h1 class="font-bold text-center text-4xl mb-16 px-6">Tanya Jawab</h1>
    <div class="px-16" style="height: 75vh">
      <div class="flex h-full">
        <div class="mr-4">
          <div
            v-for="(menu, index) in menus"
            :key="index"
            class="mb-6 text-sm border-b-2 pb-2 cursor-pointer"
          >
            {{ menu.title }}
          </div>
        </div>
        <div class="h-full w-px mx-8 bg-slate-200"></div>
        <div class="w-2/4 qna-list">
          <template v-for="(quest, index) in questions.investasi" :key="index">
            <div
              class="w-full px-4 py-3 flex items-center cursor-pointer qna-item"
              :class="[
                {
                  'active rounded-t-lg': index === selected,
                  'mb-4 rounded-lg': index !== selected,
                },
              ]"
              @click="selectQuestion(index)"
            >
              <div class="mr-4 mt-2">
                <vue-feather
                  type="plus"
                  size="26"
                  stroke-width="3"
                ></vue-feather>
              </div>
              <div class="text-xl font-normal">{{ quest.title }}</div>
            </div>
            <div
              class="border rounded-b-lg qna-content"
              :class="{ 'p-4 mb-4 active': index === selected }"
            >
              {{ quest.content }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QNAPage",
  data() {
    return {
      questions: {
        investasi: [
          { title: "Question 1", content: "Question 1" },
          { title: "Question 2", content: "Question 2" },
          { title: "Question 3", content: "Question 3" },
          { title: "Question 4", content: "Question 4" },
        ],
      },
      menus: [
        {
          title: "Kesempatan Modal Investasi 100RB",
          key: "investasi",
        },
        {
          title: "Withdrawal RDN Sinarmas Sekuritas",
          key: "withdraw",
        },
        {
          title: "StarPoin Rewards Program",
          key: "starpoin",
        },
        {
          title: "Pendaftaran Sistem E-IPO",
          key: "e-ipo",
        },
        {
          title: "Migrasi Simas New Simas Equity",
          key: "equity",
        },
        {
          title: "Mengenal Pasar Modal",
          key: "pasar",
        },
        {
          title: "Umum",
          key: "umum",
        },
      ],
      selected: null,
    };
  },
  methods: {
    selectQuestion(index) {
      // Get list of items
      let list = document.getElementsByClassName("qna-item");
      let contents = document.getElementsByClassName("qna-content");
      console.log(list);
      console.log(contents);
      // iterate where the active is needed to remove

      for (var i = 0; i < list.length; i++) {
        if (list[i].classList.contains("active")) {
          if (i !== index) {
            list[i].classList.remove("active");
          }
        }
      }

      for (var j = 0; j < contents.length; j++) {
        if (contents[j].classList.contains("active")) {
          if (j !== index) {
            contents[j].classList.remove("active");
          }
        }
      }

      // single check on questions
      if (list[index].classList.contains("active")) {
        list[index].classList.remove("active");
        this.selected = null;
      } else {
        list[index].classList.add("active");
        this.selected = index;
      }

      // single check on contents
      if (contents[index].classList.contains("active")) {
        contents[index].classList.remove("active");
      } else {
        contents[index].classList.add("active");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.finance {
  & .ticker {
    background-color: #18181b;
    color: white;
  }
  &:hover {
    & .title {
      color: #4979d1;
    }
    & .ticker {
      background-color: #4979d1;
      color: white;
    }
  }
}

.qna-list {
  & .qna-item {
    background-color: white;
    border: solid 1px #4979d1;
    color: #4979d1;
    &.active {
      background-color: #4979d1;
      border: none;
      color: white;
    }
  }

  & .qna-content {
    height: 0;
    visibility: hidden;
    &.active {
      visibility: visible;
      height: auto;
    }
  }
}
</style>
