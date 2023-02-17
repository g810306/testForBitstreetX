const app = Vue.createApp({
  data() {
    return {
      dataList: [],
      d_final: new Date(2023, 1, 28, 0, 0, 0), // 2023 年 2 月 28 日 0 時 0 分 0 秒
      final_str: "",
      showModal: false,
    };
  },
  mounted() {
    this.get_countdown();
    setInterval(() => {
      //   console.log(this);
      this.get_countdown();
    }, 1000);
  },
  methods: {
    newDate(date) {
      let newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
      if (date != 0) {
        return newDate;
      } else {
        return "NaN";
      }
    },
    getdata() {
      let that = this;
      const url = "https://testnet.binancefuture.com/dapi/v1/premiumIndex";
      fetch(url)
        .then(function (resp) {
          return resp.json();
        })
        .then(function (userList) {
          // console.log(userList);
          that.dataList = userList;
          //   console.log(that.dataList);
        });
    },
    date_diff(date1_obj, date2_obj) {
      // 相差的秒數
      let diff_seconds = Math.floor(
        Math.abs(date1_obj.getTime() - date2_obj.getTime()) / 1000
      );

      let days = Math.floor(diff_seconds / 60 / 60 / 24);
      let hours = Math.floor((diff_seconds - days * 86400) / 60 / 60);
      let minutes = Math.floor(
        (diff_seconds - days * 86400 - hours * 3600) / 60
      );
      let seconds = diff_seconds - days * 86400 - hours * 3600 - minutes * 60;

      return `倒數 ${days} 天 ${hours} 小時 ${minutes} 分鐘 ${seconds} 秒鐘，就228囉！`;
    },
    get_countdown() {
      let d = new Date();
      this.final_str = this.date_diff(d, this.d_final);
    },
  },
  created() {
    this.getdata();
  },
});
app.mount("#app");
