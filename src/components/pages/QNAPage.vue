<template>
  <div class="container mx-auto mt-16 mb-16">
    <h1 class="font-bold text-center text-4xl mb-16 px-6">Tanya Jawab</h1>
    <!-- Mobile Version -->
    <div class="px-6 block lg:hidden">
      <div class="h-full">
        <div class="wrap-mobile">
          <div
            class="p-4 text-md border-b-2 wrap-menu border-b-2 border-sky-600 rounded-lg"
          >
            <div class="flex items-center cursor-pointer" @click="toggleMenu()">
              <div class="mr-4 mt-2">
                <vue-feather
                  type="plus"
                  size="22"
                  stroke-width="3"
                ></vue-feather>
              </div>
              <!-- {{ menus[menu.mobile.selected].title }} -->
              Tanya Jawab
            </div>
            <div class="wrap-menu-items">
              <div
                v-for="(menu, i) in menus"
                :key="i"
                class="p-4 pl-10 text-md cursor-pointer menu"
                :class="[{ 'rounded-b-lg': i === menus.length - 1 }]"
                @click="selectMenu(i, false)"
              >
                {{ menu.title }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-px bg-slate-200 my-6"></div>
        <h4 class="text-lg font-bold mb-4" style="color: #4979d1">
          {{ menus[menuSelected].title }}
        </h4>
        <div class="w-full qna-list">
          <template v-for="(quest, index) in questionsList" :key="index">
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
                <div v-if="index !== selected">
                  <vue-feather
                    type="plus"
                    size="26"
                    stroke-width="3"
                  ></vue-feather>
                </div>
                <div v-if="index == selected">
                  <vue-feather
                    type="minus"
                    size="26"
                    stroke-width="3"
                  ></vue-feather>
                </div>
              </div>
              <div class="text-xl font-normal">{{ quest.title }}</div>
            </div>
            <div
              class="border rounded-b-lg qna-content text-sm"
              :class="{ 'p-4 mb-4 active': index === selected }"
            >
              <div v-html="quest.content"></div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Desktop Version -->
    <div class="px-24 mx-24 hidden lg:block">
      <div class="flex h-auto">
        <div class="mr-4 pr-8 max-w-xs relative">
          <div class="border-r-2 border-slate-200 pr-8 sticky top-32">
            <div
              v-for="(menu, i) in menus"
              :key="i"
              class="mb-6 text-sm border-b-2 pb-2 cursor-pointer menu-item"
              :class="[
                {
                  'active font-bold border-b-2':
                    i === menuSelected,
                },
              ]"
              @click="selectMenu(i)"
            >
              {{ menu.title }}
            </div>
          </div>
        </div>
        <!-- <div class="h-full w-px mx-8 bg-slate-200"></div> -->
        <div class="w-4/6 qna-list">
          <template v-for="(quest, index) in questionsList" :key="index">
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
                <div v-if="index !== selected">
                  <vue-feather
                    type="plus"
                    size="26"
                    stroke-width="3"
                  ></vue-feather>
                </div>
                <div v-if="index == selected">
                  <vue-feather
                    type="minus"
                    size="26"
                    stroke-width="3"
                  ></vue-feather>
                </div>
              </div>
              <div class="text-xl font-normal">{{ quest.title }}</div>
            </div>
            <div
              class="border rounded-b-lg qna-content"
              :class="{ 'p-4 mb-4 active': index === selected }"
            >
              <div v-html="quest.content"></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { QNA_EQUITY, QNA_INVESTASI, QNA_IPO, QNA_PASAR, QNA_STARPOIN, QNA_UMUM, QNA_WITHDRAW } from "./QNACollection.js";

export default {
  name: "QNAPage",
  data() {
    return {
      questions: {
        investasi: QNA_INVESTASI,
        withdraw: QNA_WITHDRAW,
        starpoin: QNA_STARPOIN,
        eipo: QNA_IPO,
        equity: QNA_EQUITY,
        pasar: QNA_PASAR,
        umum: QNA_UMUM
      },
      questionsList: [],
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
          key: "eipo",
        },
        // {
        //   title: "Migrasi Simas New Simas Equity",
        //   key: "equity",
        // },
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
      menuSelected: 4,
      menu: {
        mobile: {
          selected: 0,
        },
      },
    };
  },
  // computed: {
  //   questionList(){
  //     const data = ;
  //    return JSON.parse(JSON.stringify(data))
  //   }
  // },
  mounted() {
    const data = this.questions[this.menus[4].key];
    data.map((el) => {
      this.questionsList.push(el);
    });
    console.log(this.questionsList);
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

    selectMenu(index, isDesktop = true) {
      // Get list of items
      let list = document.getElementsByClassName("qna-item");
      // let contents = document.getElementsByClassName("qna-content");
      // console.log(list);
      // console.log(contents);
      // iterate where the active is needed to remove

      if (isDesktop) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].classList.contains("active")) {
            if (i !== index) {
              list[i].classList.remove("active");
            }
          }
        }
      } else {
        this.toggleMenu();
      }

      if (index !== this.menuSelected) {
        this.selected = null;
      }

      this.menuSelected = index;
      const toInput = this.questions[this.menus[this.menuSelected].key];

      this.questionsList = [];
      toInput.map((el) => {
        this.questionsList.push(el);
      });

      window.scrollTo(0, 0);
    },
    toggleMenu() {
      let menus = document.getElementsByClassName("wrap-menu-items");
      let wrapMenu = menus[0];
      if (wrapMenu.classList.contains("open")) {
        wrapMenu.classList.remove("open");
      } else {
        wrapMenu.classList.add("open");
      }
    },
    ConvertStringToHTML(str) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(str, "text/html");
      console.log(doc);
      console.log(doc.body);
      return doc.body;
    },
  },
};
</script>

<style lang="scss" scoped>

*{
  font-family: Poppins, sans-serif;
}

.qna-list {
  & .qna-item {
    background-color: white;
    border: solid 1px #0190f5;
    color: #0190f5;
    &.active {
      background-color: #0190f5;
      border: none;
      color: white;
    }
  }

  & .qna-content {
    height: 0;
    visibility: hidden;
    display: none;
    &.active {
      visibility: visible;
      height: auto;
      display: block;
    }
  }
}

.menu-item {
  color: #2c3e50;
  &.active {
    color: #0190f5;
    border-color: #0190f5 !important;
  }
}

.wrap-mobile {
  // transition: height 0.5s ease-in-out;
  .wrap-menu {
    background-color: #4979d1;
    border: none;
    color: white;
  }
  .wrap-menu-items {
    height: 0px;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    // scrollbar-color: white white !important;
    .menu {
      visibility: hidden;
      color: white;
    }
    &.open {
      height: 240px;
      overflow-y: scroll;
      visibility: visible;
      .menu {
        color: white;
        visibility: visible;
      }
    }
  }

  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    background: #2c5299;
    -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-corner {
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    -webkit-border-radius: 1ex;
  }
}

.active-menu{
  color: #0190f5 !important
}
</style>
