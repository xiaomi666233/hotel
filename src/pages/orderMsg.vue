<template>
  <div>
    <div class="header">
      <Input placeholder="输入房号" style="width: 300px" v-model="fh" />
      <Button type="success" @click="getRoomByfh()">搜索</Button>
    </div>
    <div>
      <Table border :columns="columns1" :data="orderList">
        <template slot-scope="{ row }" slot="action">
          <!-- <Button type="warning" size="small" @click="modifyData(index)">修改</Button> -->
          <Button
            type="primary"
            :disabled="row.yrz == '是'"
            size="small"
            @click="confirm(row.roomOrderUuid)"
          >确认入住</Button>
          <Button type="error" size="small" @click="okqxrz(row.roomOrderUuid)">取消入住</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="total" :page-size="10" @on-change="selectMsg" />
    </div>
    <Modal title="修改" v-model="modify" class-name="vertical-center-modal" @on-ok="okModify()">
      <Form label-position="left" :label-width="100">
        <FormItem label="订单类型">
          <Select v-model="msg.ddlx">
            <Option value="预订单">预订单</Option>
            <Option value="订单">订单</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="msg.sjhm" />
        </FormItem>
        <FormItem label="预约时间">
          <DatePicker
            type="date"
            @on-change="handleChangeyy"
            format="yyyy-MM-dd"
            v-model="msg.yysj"
            placeholder="选择预约时间"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="预离时间">
          <DatePicker
            type="date"
            @on-change="handleChangeyl"
            format="yyyy-MM-dd"
            v-model="msg.ylsj"
            placeholder="选择预约时间"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="总价格">
          <Input v-model="msg.fjzjg" />
        </FormItem>
      </Form>
    </Modal>
    <!-- <Modal
      title="提示"
      v-model="confirmLive"
      class-name="vertical-center-modal"
      @on-ok="okqrrz()"
    >是否确认入住</Modal>
    <Modal
      title="提示"
      v-model="modifyLive"
      class-name="vertical-center-modal"
      @on-ok="okqxrz()"
    >是否取消入住</Modal>-->
  </div>
</template>

<script>
import {
  roomOrder,
  roomOrderC,
  roomOrderD,
  fhGetRoom
} from "@/network/user.js";
export default {
  data() {
    return {
      fh: "",
      total: 0,
      page: 1,
      modify: false,
      confirmLive: false,
      modifyLive: false,
      select: 0,
      msg: {
        fh: "",
        ddh: "",
        ddlx: "",
        sjhm: "",
        yysj: "",
        ylsj: "",
        fjzjg: 0,
        yrz: ""
      },
      columns1: [
        {
          title: "房号",
          key: "fh",
          width: 70
        },
        {
          title: "订单号",
          key: "ddh",
          width: 210
        },
        {
          title: "订单类型",
          key: "ddlx"
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
        },
        {
          title: "订单总价格",
          key: "fjzjg"
        },
        {
          title: "已入住",
          key: "yrz"
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center"
        }
      ],
      orderList: []
    };
  },
  created() {
    this.getRoomOrderList();
  },
  computed: {},
  watch: {
    fh: function(o, n) {
      if (!o) {
        this.getRoomOrderList();
      }
    }
  },
  methods: {
    minToymd(min) {
      let date = new Date(min);
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      return y + "-" + m + "-" + d;
    },
    getRoomOrderList() {
      roomOrder(this.page, 10).then(res => {
        if (res.status === 200) {
          this.total = res.data.total;
          this.orderList = res.data.response;
          for (let i = 0; i < this.orderList.length; i++) {
            this.orderList[i].yysj = this.minToymd(this.orderList[i].yysj.time);
            this.orderList[i].ylsj = this.minToymd(this.orderList[i].ylsj.time);
          }
        }
      });
    },
    modifyData(index) {
      this.modify = true;
      Object.assign(this.msg, this.orderList[index]);
    },
    handleChangeyy(date) {
      this.msg.btime = date;
    },
    handleChangeyl(date) {
      this.msg.ylsj = date;
    },
    okModify() {
      // 发请求
      this.$Message.success("修改成功");
    },
    okqxrz(id) {
      roomOrderD(id).then(res => {
        if (res.status === 200) {
          this.getRoomOrderList();
          this.$Message.success("取消成功");
        }
      });
    },
    selectMsg(index) {
      if (this.fh !== "") {
        this.page = index;
        this.getRoomByfh();
        this.$Message.success("切换到 " + index + " 页");
      } else {
        this.page = index;
        this.getRoomOrderList();
        this.$Message.success("切换到 " + index + " 页");
      }
    },
    confirm(id) {
      roomOrderC(id).then(res => {
        if (res.status === 200) {
          this.getRoomOrderList();
          this.$Message.success("确认成功");
        }
      });
    },
    getRoomByfh() {
      if (this.fh == "") return this.$Message.error("请输入房号");
      fhGetRoom(this.fh, this.page, 10).then(res => {
        if (res.status === 200) {
          if (res.data.total === 0)
            this.$Message.error("没有找到该房号的订单信息");
          this.total = res.data.total;
          this.orderList = res.data.response;
          for (let i = 0; i < this.orderList.length; i++) {
            this.orderList[i].yysj = this.minToymd(this.orderList[i].yysj.time);
            this.orderList[i].ylsj = this.minToymd(this.orderList[i].ylsj.time);
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
