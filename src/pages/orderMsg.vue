<template>
  <div>
    <div class="header">
      <Input placeholder="输入房号" style="width: 300px" />
      <Button type="success">搜索</Button>
    </div>
    <div>
      <Table border :columns="columns1" :data="data">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="warning" size="small" @click="modifyData(index)">修改</Button>
          <Button type="primary" size="small" @click="confirmLive = true">确认入住</Button>
          <Button type="error" size="small" @click="modifyLive = true">取消入住</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="100" @on-change="selectMsg" />
    </div>
    <Modal title="修改" v-model="modify" class-name="vertical-center-modal" @on-ok="okModify()">
      <Form label-position="left" :label-width="100">
        <FormItem label="订单类型">
          <Select v-model="msg.type">
            <Option value="0">预订单</Option>
            <Option value="1">订单</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="msg.phone"></Input>
        </FormItem>
        <FormItem label="预约时间">
          <DatePicker
            type="date"
            @on-change="handleChangeyy"
            format="yyyy-MM-dd"
            v-model="msg.btime"
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
          <Input v-model="msg.ddzjg"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
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
    >是否取消入住</Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modify: false,
      confirmLive: false,
      modifyLive: false,
      select: 0,
      msg: {
        num: "",
        orderNum: "",
        type: "",
        phone: "",
        btime: "",
        ylsj: "",
        ddzjg: "",
        is_use: ""
      },
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
          title: "预离时间",
          key: "ylsj"
        },
        {
          title: "订单总价格",
          key: "ddzjg"
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
      data: [
        {
          num: "164",
          orderNum: "2137123243",
          type: "0",
          phone: "159124352",
          btime: "2020-01-29",
          ylsj: "2020-01-29",
          ddzjg: "123",
          is_use: "1"
        },
        {
          num: "164",
          orderNum: "2137123243",
          type: "0",
          phone: "159124352",
          btime: "2020-01-29",
          ylsj: "2020-01-29",
          ddzjg: "123",
          is_use: "1"
        }
      ]
    };
  },
  computed: {},
  methods: {
    modifyData(index) {
      this.modify = true;
      Object.assign(this.msg, this.data[index]);
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
    okqrrz() {
      //
      this.$Message.success("确认成功");
    },
    okqxrz() {
      this.$Message.success("取消成功");
    },
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
