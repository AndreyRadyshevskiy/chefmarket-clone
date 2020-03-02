import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";

const settings = {
  apiKey: "d78abd5d-9f67-42bc-a59c-d4b6d3e91348",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1"
};

Vue.use(YmapPlugin, settings);
