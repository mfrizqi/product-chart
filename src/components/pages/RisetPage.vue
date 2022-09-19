<template>
  <section class="py-16">
    <div class="flex justify-center mb-12">
      <template v-for="(option, index) in options" :key="index">
        <div class="option-item font-bold" @click="changeType(option.type)">
          {{ option.name }}
        </div>
        <div v-if="index < options.length - 1" class="mx-3 font-bold">|</div>
      </template>
    </div>

    <div class="px-16 mx-16">
      <div
        class="px-6 py-6 mb-5 flex justify-between rounded-xl bg-white drop-shadow-xl article-item"
        v-for="(article, index) in articles"
        :key="index"
      >
        <div class="flex items-center">
          <div class="ml-4 mr-12 text-4xl font-black">{{ index + 1 }}</div>
          <div>
            <div class="text-2xl font-bold">{{ article.Title }}</div>
            <div class="text-xl font-bold text-gray-500">
              {{ article.Tanggal }}
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <img src="@/assets/arrow.png" alt="" width="45" height="auto" />
        </div>
      </div>
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
        { name: "ALL", type: "all" },
        { name: "DAILY RESEARCH", type: "dailies" },
        { name: "INSIGHT", type: "insights" },
        { name: "COMPANY FOCUS", type: "focuses" },
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
    };
  },
  async mounted() {
    await this.initGetResearch();

    this.all = this.dailies.concat(this.insights).concat(this.focuses);
    this.articles = this.all;

  },
  methods: {
    changeType(type) {
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
    },
    async initGetResearch(){

      await axios.get(`https://report.sinarmassekuritas.co.id/API/SimasResearch/companyFocus.php`)
          .then(response => {
            console.log('focuses');
            console.log(response.data.results);
            this.focuses = response.data.results;
          })
          .catch(error => {
            console.error(error);
      })

       await axios.get(`https://report.sinarmassekuritas.co.id/API/SimasResearch/researchInsight.php`)
          .then(response => {
            console.log('insight');
            console.log(response.data.results);
            this.insights = response.data.results;
          })
          .catch(error => {
            console.error(error);
      })

      await axios.get(`https://report.sinarmassekuritas.co.id/API/SimasResearch/dailyResearch.php`)
          .then(response => {
            console.log('dailyResearch');
            console.log(response.data.results);
            this.dailies = response.data.results;
          })
          .catch(error => {
            console.error(error);
      })

    }
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
}

.article-item {
  color: #464646;
  cursor: pointer;
  &:hover {
    color: #4979d1;
  }
}
</style>
