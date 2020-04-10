<template>
  <div>
    <div class="header">
      <Input placeholder="输入菜品名称" style="width: 300px" />
      <Button type="success">搜索</Button>
    </div>
    <div>
      <Table border :columns="columns1" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="modify = true">修改</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="100" @on-change="selectMsg" />
    </div>
    <Modal title="修改" v-model="modify" class-name="vertical-center-modal">1</Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modify: false,
      confirmLive: false,
      modifyLive: false,
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
  methods: {
    selectMsg(index) {
      this.$Message.success("切换到 " + index + " 页");
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
