<template>
  <div>
    <div>
      <Table border :columns="columns1" :data="list"></Table>
    </div>
    <div class="page">
      <Page :total="100" @on-change="selectMsg" />
    </div>
  </div>
</template>

<script>
import { roomCheck } from "@/network/user.js";
export default {
  data() {
    return {
      columns1: [
        {
          title: "房号",
          key: "fh",
          width: 80
        },
        {
          title: "订单号",
          key: "ddh",
          width: 250
        },
        {
          title: "客人名称",
          key: "krmc"
        },
        {
          title: "手机号码",
          key: "sjhm"
        },

        {
          title: "预约时间",
          key: "yysj"
        },
        {
          title: "预离时间",
          key: "ylsj"
        }
      ],
      list: []
    };
  },
  created() {
    this.getRoomCheck();
  },
  methods: {
    minToymd(min) {
      let date = new Date(min);
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      return y + "-" + m + "-" + d;
    },
    selectMsg(index) {
      this.$Message.success("切换到 " + index + " 页");
    },
    getRoomCheck() {
      let that = this;
      roomCheck().then(res => {
        if (res.status === 200) {
          that.list = res.data.response;
          for(let i = 0;i< that.list.length;i++){
            that.list[i].yysj = that.minToymd(that.list[i].yysj.time);
            that.list[i].ylsj = that.minToymd(that.list[i].ylsj.time);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
