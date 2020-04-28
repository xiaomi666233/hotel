<template>
  <div>
    <div class="header">
      <Input placeholder="输入菜品名称" v-model="cpmcInput" style="width: 300px" />
      <div class="add">
        <Button type="success" @click="find">搜索</Button>
      </div>
      <div class="add">
        <Button type="primary" shape="circle" icon="md-add" @click="is_add = true"></Button>
      </div>
    </div>
    <div>
      <Table border :columns="columns1" :data="data6">
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="openModModel(row)">修改</Button>
          <Button type="error" size="small" @click="comdelete(row.menuUuid)">删除</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="total" :page-size="10" @on-change="selectMsg" />
    </div>
    <Modal
      title="删除"
      v-model="is_delete"
      class-name="vertical-center-modal"
      @on-ok="deletecp()"
    >是否删除该记录</Modal>
    <Modal title="修改" v-model="is_mod" class-name="vertical-center-modal" @on-ok="modify()">
      <Form label-position="left" :label-width="100">
        <FormItem label="菜品名称">
          <Input v-model="modData.cpmc" />
        </FormItem>
        <FormItem label="菜品类型">
          <Input v-model="modData.cplx" />
        </FormItem>
        <FormItem label="菜品价格">
          <Input v-model="modData.cpjg" />
        </FormItem>
        <FormItem label="菜品库存">
          <Input v-model="modData.cpkc" />
        </FormItem>
      </Form>
    </Modal>
    <Modal
      title="添加"
      v-model="is_add"
      class-name="vertical-center-modal"
      @on-ok="add()"
      @on-cancel="addCancel()"
    >
      <Form label-position="left" :label-width="100">
        <FormItem label="菜品名称">
          <Input v-model="addData.cpmc" />
        </FormItem>
        <FormItem label="菜品类型">
          <Input v-model="addData.cplx" />
        </FormItem>
        <FormItem label="菜品价格">
          <Input v-model="addData.cpjg" />
        </FormItem>
        <FormItem label="菜品库存">
          <Input v-model="addData.cpkc" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  getcdlb,
  searchcpxx,
  addcpxx,
  mdfcpxx,
  deletecpxx
} from "@/network/user.js";
export default {
  data() {
    return {
      is_mod: false,
      confirmLive: false,
      modifyLive: false,
      is_add: false,
      is_delete: false,
      page: 1,
      total: 0,
      uuid: "",
      addData: {
        cpjg: 0,
        cpkc: 0,
        cplx: "",
        cpmc: ""
      },
      modData: {
        cpjg: 0,
        cpkc: 0,
        cplx: "",
        cpmc: "",
        menuUuid: ""
      },
      cpmcInput: "",
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
      data6: [
        {
          cpmc: "可乐",
          cplx: "酒水",
          cpjg: 3,
          cpkc: 10,
          is_use: 1
        }
      ]
    };
  },
  created() {
    this.findAll();
  },
  watch: {
    cpmcInput: function(o, n) {
      if (!o) {
        this.findAll();
      }
    }
  },
  methods: {
    selectMsg(index) {
      if (this.cpmcInput !== "") {
        this.page = index;
        this.findAll();
        this.$Message.success("切换到 " + index + " 页");
      } else {
        this.page = index;
        this.find();
        this.$Message.success("切换到 " + index + " 页");
      }
    },
    add() {
      if (
        !this.addData.cpmc ||
        !this.addData.cpkc ||
        !this.addData.cplx ||
        !this.addData.cpjg
      ) {
        this.$Message.error("表单信息不能为空");
        return;
      }
      addcpxx(this.addData).then(res => {
        if (res.status === 200) {
          this.findAll();
        } else {
          this.$Message.error("添加失败");
        }
      });
      this.addData = {
        cpjg: 0,
        cpkc: 0,
        cplx: "",
        cpmc: ""
      };
      this.is_add = false;
    },
    addCancel() {
      this.addData = {
        cpjg: 0,
        cpkc: 0,
        cplx: "",
        cpmc: ""
      };
    },
    comdelete(uuid) {
      this.is_delete = true;
      this.uuid = uuid;
    },
    deletecp() {
      if (!this.uuid) {
        this.$Message.error("UUID 不能为空");
        return;
      }
      deletecpxx(this.uuid).then(res => {
        if (res.status === 200) {
          this.$Message.success("成功删除");
          this.findAll();
        } else {
          this.$Message.error("删除失败");
        }
      });
    },
    openModModel(row) {
      Object.assign(this.modData, row);
      this.is_mod = true;
    },
    modify() {
      if (
        !this.modData.cpmc ||
        !this.modData.cpkc ||
        !this.modData.cplx ||
        !this.modData.cpjg ||
        !this.modData.menuUuid
      ) {
        this.$Message.error("表单信息不能为空");
        return;
      }
      mdfcpxx(this.modData).then(res => {
        if (res.status === 200) {
          this.$Message.success("成功修改");
          this.findAll();
        } else {
          this.$Message.error("修改失败");
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
    },
    findAll() {
      getcdlb(this.page, 10).then(res => {
        if (res.status === 200) {
          this.data6 = res.data.response;
          this.total = res.data.total;
        } else {
          this.$Message.error("查询失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
  display: flex;
}
.add {
  margin-left: 20px;
}
</style>
