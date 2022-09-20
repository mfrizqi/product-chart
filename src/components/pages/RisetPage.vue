<template>
  <section class="py-16">
    <div class="flex flex-wrap justify-center mb-12 items-center">
      <template v-for="(option, index) in options" :key="index">
        <div
          class="option-item font-bold text-center lg:text-left"
          @click="changeType(option.type)"
          :class="{ active: option.isActive }"
        >
          {{ option.name }}
        </div>
        <div v-if="index < options.length - 1" class="mx-3 font-bold">|</div>
      </template>
    </div>

    <!-- <div class="px-2 mx-2 lg:px-16 lg:mx-16" ></div> -->

    <div class="px-2 mx-2 lg:px-16 lg:mx-16">
      <section v-if="isLoading" class="skeleton">
        <div
          class="animate-pulse px-6 py-6 mb-5 flex justify-between rounded-xl bg-white drop-shadow-xl article-item"
        >
          <div class="bg-slate-700 h-12 w-12 mr-6 rounded-lg"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-3">
              <div class="h-3 bg-slate-700 col rounded"></div>
            </div>
          </div>
          <div class="bg-slate-700 h-12 w-12 mx-6 rounded-lg"></div>
        </div>
        <div
          class="animate-pulse px-6 py-6 mb-5 flex justify-between rounded-xl bg-white drop-shadow-xl article-item"
        >
          <div class="bg-slate-700 h-12 w-12 mr-6 rounded-lg"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-3">
              <div class="h-3 bg-slate-700 col rounded"></div>
            </div>
          </div>
          <div class="bg-slate-700 h-12 w-12 mx-6 rounded-lg"></div>
        </div>
        <div
          class="animate-pulse px-6 py-6 mb-5 flex justify-between rounded-xl bg-white drop-shadow-xl article-item"
        >
          <div class="bg-slate-700 h-12 w-12 mr-6 rounded-lg"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-3">
              <div class="h-3 bg-slate-700 col rounded"></div>
            </div>
          </div>
          <div class="bg-slate-700 h-12 w-12 mx-6 rounded-lg"></div>
        </div>
      </section>
      <section v-if="!isLoading">
        <div
          class="px-6 py-6 mb-5 flex justify-between rounded-xl bg-white drop-shadow-xl article-item"
          v-for="(article, index) in articles"
          :key="index"
          @click="openInNewTab(article.Upload)"
        >
          <div class="flex items-center">
            <div class="ml-4 mr-12 text-4xl font-black w-4">{{ index + 1 }}</div>
            <div>
              <div class="text-2xl font-bold">{{ article.Title }}</div>
              <div class="text-xl font-bold text-gray-500">
                {{ article.Tanggal }}
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <img
              src="@/assets/arrow.png"
              alt=""
              width="45"
              height="auto"
              style="min-width: 45px; min-height: 45px"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "RisetPage",
  data() {
    return {
      options: [
        { name: "ALL", type: "all", isActive: true },
        { name: "DAILY RESEARCH", type: "dailies", isActive: false },
        { name: "INSIGHT", type: "insights", isActive: false },
        { name: "COMPANY FOCUS", type: "focuses", isActive: false },
      ],
      dailies: [
        {
          title: "Daily Research 1",
          tanggal: "Sep 13 2022  9:31AM",
        },
        {
          title: "Daily Research 2",
          tanggal: "Sep 13 2022  9:31AM",
        },
        {
          title: "Daily Research 3",
          tanggal: "Sep 13 2022  9:31AM",
        },
        {
          title: "Daily Research 4",
          tanggal: "Sep 13 2022  9:31AM",
        },
        {
          title: "Daily Research 5",
          tanggal: "Sep 13 2022  9:31AM",
        },
      ],
      insights: [
        {
          title: "Insight 1",
          tanggal: "Oct 19 2022  9:31AM",
        },
        {
          title: "Insight 2",
          tanggal: "Oct 19 2022  9:31AM",
        },
        {
          title: "Insight 3",
          tanggal: "Oct 19 2022  9:31AM",
        },
        {
          title: "Insight 4",
          tanggal: "Oct 19 2022  9:31AM",
        },
        {
          title: "Insight 5",
          tanggal: "Oct 19 2022  9:31AM",
        },
      ],
      focuses: [
        {
          title: "Company Focus 1",
          tanggal: "Nov 26 2022  9:31AM",
        },
        {
          title: "Company Focus 2",
          tanggal: "Nov 26 2022  9:31AM",
        },
        {
          title: "Company Focus 3",
          tanggal: "Nov 26 2022  9:31AM",
        },
        {
          title: "Company Focus 4",
          tanggal: "Nov 26 2022  9:31AM",
        },
        {
          title: "Company Focus 5",
          tanggal: "Nov 26 2022  9:31AM",
        },
      ],
      articles: [],
      all: [],
      isLoading: true,
    };
  },
  async mounted() {
    await this.initGetData();
  },
  methods: {
    changeType(type) {
      if (this.isLoading) return;
      switch (type) {
        case "all":
          this.articles = this.all;
          break;
        case "dailies":
          this.articles = this.dailies;
          break;
        case "insights":
          this.articles = this.insights;
          break;
        case "focuses":
          this.articles = this.focuses;
          break;
        default:
          break;
      }

      this.options.map((el) => {
        if (type === el.type) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
    async initGetData() {
      await axios
        .get(
          `https://report.sinarmassekuritas.co.id/API/SimasResearch/companyFocus.php`
        )
        .then((response) => {
          console.log("focuses");
          this.focuses = response.data.results;
          console.log(this.focuses);
        })
        .catch((error) => {
          console.error(error);
        });

      await axios
        .get(
          `https://report.sinarmassekuritas.co.id/API/SimasResearch/researchInsight.php`
        )
        .then((response) => {
          console.log("insight");
          console.log(response.data.results);
          this.insights = response.data.results;
          console.log(this.insights);
        })
        .catch((error) => {
          console.error(error);
        });

      await axios
        .get(
          `https://report.sinarmassekuritas.co.id/API/SimasResearch/dailyResearch.php`
        )
        .then((response) => {
          console.log("dailyResearch");
          const data = response.data;
          this.dailies = [
            {
              Title: "Daily Research",
              Tanggal: data.date_dr,
              Upload: data.link_dr,
            },
            {
              Title: "Daily Top Pick",
              Tanggal: data.date_tp,
              Upload: data.link_tp,
            },
          ];
          console.log(this.dailies);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.all = this.dailies.concat(this.insights).concat(this.focuses);
          this.articles = this.all;
          this.isLoading = false;
        });
    },
    openInNewTab(url) {
      window.open(url, "_blank").focus();
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: Poppins, sans-serif;
}

.option-item {
  color: #464646;
  &:hover {
    color: #4979d1;
    cursor: pointer;
  }
  &.active {
    color: #4979d1 !important;
  }
}

.article-item {
  color: #464646;
  cursor: pointer;
  &:hover {
    color: #4979d1;
  }
}
</style>
