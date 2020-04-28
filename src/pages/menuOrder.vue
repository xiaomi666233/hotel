<template>
  <div>
    <div class="header">
      <Input placeholder="输入房号" style="width: 300px" v-model="fh" />
      <Button type="success" @click="getMenu()">搜索</Button>
    </div>
    <div>
      <Table border :columns="columns1" :data="data">
        <template slot-scope="{ row }" slot="action">
          <Button type="error" size="small" @click="deleteOrder(row.menuOrderUuid)">删除</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="total" @on-change="selectMsg" />
    </div>
    <Modal
      title="删除"
      v-model="is_delete"
      class-name="vertical-center-modal"
      @on-ok="comdelete()"
    >是否选择删除改订单</Modal>
  </div>
</template>

<script>
import {
  searchcpddlb,
  searchcpddlbNoParam,
  deletecpddlb
} from "@/network/user.js";
export default {
  data() {
    return {
      is_delete: false,
      confirmLive: false,
      modifyLive: false,
      page: 1,
      total: 0,
      uuid: "",
      fh: "",
      columns1: [
        {
          title: "房号",
          key: "fh"
        },
        {
          title: "菜品订单号",
          key: "cpddh",
          width: 250
        },
        {
          title: "菜品名称",
          key: "cpjg"
        },
        {
          title: "购买数量",
          key: "gmsl"
        },
        {
          title: "总价格",
          key: "cpddzjg"
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center"
        }
      ],
      data: []
    };
  },
  created() {
    this.getMenuList();
  },
  watch: {
    fh: function(o, n) {
      if (!o) {
        this.getMenuList();
      }
    }
  },
  methods: {
    selectMsg(index) {
      this.$Message.success("切换到 " + index + " 页");
    },
    getMenuList() {
      searchcpddlbNoParam().then(res => {
        if (res.status === 200) {
          this.data = res.data.response;
          this.total = res.data.total;
        }
      });
    },
    getMenu() {
      if (!this.fh) {
        this.$Message.error("搜索内容不能为空");
        return;
      }
      searchcpddlb(this.fh, 1, 10).then(res => {
        if (res.status === 200) {
          this.data = res.data.response;
        } else {
          this.$Message.error("搜索失败");
        }
      });
    },
    deleteOrder(uuid) {
      this.is_delete = true;
      this.uuid = uuid;
    },
    comdelete() {
      deletecpddlb(this.uuid).then(res => {
        if (res.status === 200) {
          this.$Message.success("删除成功");
          this.getMenuList();
        } else {
          this.$Message.error("删除失败");
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
