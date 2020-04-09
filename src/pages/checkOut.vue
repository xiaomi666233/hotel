<template>
  <div>
    <div>
      <Table border :columns="columns1" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          title: "客人名称",
          key: "krmc"
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
          title: "预离时间",
          key: "ylsj"
        }
      ],
      data6: [
        {
          num: 164,
          orderNum: 2137123243,
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
