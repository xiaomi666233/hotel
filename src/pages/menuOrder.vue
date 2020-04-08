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
          <Button type="primary" size="small" @click="modify = true">购买</Button>
        </template>
      </Table>
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
          title: "房号",
          key: "fh"
        },
        {
          title: "菜品订单号",
          key: "cpddh"
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
      ]
    };
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
