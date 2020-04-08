<template>
  <div>
    <div class="header">
      <Input placeholder="输入房号" style="width: 300px" />
      <Button type="success">搜索</Button>
    </div>
    <div>
      <Table border :columns="columns1" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="warning" size="small" @click="modify = true">修改</Button>
          <Button type="primary" size="small" @click="confirmLive = true">确认入住</Button>
          <Button type="error" size="small" @click="modifyLive = true">取消入住</Button>
        </template>
      </Table>
    </div>
    <Modal title="修改" v-model="modify" class-name="vertical-center-modal">1</Modal>
    <Modal title="提示" v-model="confirmLive" class-name="vertical-center-modal">是否确认入住</Modal>
    <Modal title="提示" v-model="modifyLive" class-name="vertical-center-modal">是否取消入住</Modal>
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
          key: "num"
        },
        {
          title: "订单号",
          key: "orderNum"
        },
        {
          title: "订单类型",
          key: "type"
        },
        {
          title: "手机号码",
          key: "phone"
        },

        {
          title: "预约时间",
          key: "btime"
        },
        {
          title: "已入住",
          key: "is_use"
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
          num: 164,
          orderNum: 2137123243,
          type: "未知",
          phone: 159124352,
          btime: "2020-01-29",
          is_use: 1
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