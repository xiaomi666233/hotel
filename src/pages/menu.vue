<template>
  <div>
    <div class="header">
      <Input placeholder="输入菜品名称" style="width: 300px" v-model="cpmcInput" />
      <Button type="success" @click="find()">搜索</Button>
    </div>
    <div>
      <Table border :columns="columns1" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="doBuy(row.menuUuid)">购买</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="total" @on-change="selectMsg" />
    </div>
    <Modal title="购买" v-model="is_buy" class-name="vertical-center-modal" @on-ok="buy()">
      <Form label-position="left" :label-width="100">
        <FormItem label="购买数量">
          <Input v-model="buyData.gmsl" />
        </FormItem>
        <FormItem label="房号">
          <Select v-model="buyData.fh">
            <Option
              v-for="(item,index) in room"
              :key="index"
              :value="item.fh"
              v-if="item.yrz == '是'"
            >{{ item.fh }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  getcdlb,
  dgcp,
  roomOrderNoParams,
  searchcpxx
} from "@/network/user.js";
export default {
  data() {
    return {
      is_buy: false,
      confirmLive: false,
      modifyLive: false,
      page: 1,
      total: 0,
      cpmcInput: "",
      buyData: {
        fh: "",
        gmsl: 0,
        uuid: ""
      },
      columns1: [
        {
          title: "菜品名称",
          key: "cpmc"
        },
        {
          title: "菜品类型",
          key: "cplx"
        },
        {
          title: "菜品价格",
          key: "cpjg"
        },
        {
          title: "菜品库存",
          key: "cpkc"
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center"
        }
      ],
      data6: [],
      room: []
    };
  },
  created() {
    this.getMenuList();
    this.getRooms();
  },
  watch: {
    cpmcInput: function(o, n) {
      if (!o) {
        console.log("do" + n);
        this.getMenuList();
      }
    }
  },
  methods: {
    selectMsg(index) {
      if (this.cpmcInput !== "") {
        this.page = index;
        getMenuList();
        this.$Message.success("切换到 " + index + " 页");
      } else {
        this.page = index;
        this.find();
        this.$Message.success("切换到 " + index + " 页");
      }
    },
    getMenuList() {
      getcdlb(this.page, 10).then(res => {
        if (res.status === 200) {
          this.data6 = res.data.response;
          this.total = res.data.total;
        }
      });
    },
    doBuy(uuid) {
      this.buyData.uuid = uuid;
      this.is_buy = true;
    },
    buy() {
      if (!this.buyData.gmsl || !this.buyData.fh || !this.buyData.uuid) {
        this.$Message.error("表单信息不能为空");
        return;
      }
      dgcp(this.buyData.fh, this.buyData.gmsl, this.buyData.uuid).then(res => {
        if (res.status === 200) {
          this.getMenuList();
          this.$Message.success("购买成功");
        } else {
          this.$Message.error("购买失败");
        }
      });
    },
    getRooms() {
      roomOrderNoParams().then(res => {
        if (res.status === 200) {
          this.room = res.data.response;
          console.log(this.room);
        }
      });
    },
    find() {
      if (!this.cpmcInput) {
        this.$Message.error("搜索内容不能为空");
        return;
      }
      searchcpxx(this.cpmcInput, this.page, 10).then(res => {
        if (res.status === 200) {
          this.data6 = res.data.response;
          this.total = res.data.total;
        } else {
          this.$Message.error("搜索失败");
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
