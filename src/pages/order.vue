<template>
  <div>
    <Divider orientation="left">主单</Divider>
    <div class="zhudan">
      <div class="zhudan-item">
        <Form label-position="left" :label-width="100">
          <FormItem label="客人名称">
            <Input v-model="list.name"></Input>
          </FormItem>
          <FormItem label="性别">
            <Select v-model="list.sex">
              <Option value="0">男</Option>
              <Option value="1">女</Option>
            </Select>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <Input v-model="list.phone"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="zhudan-item">
        <Form label-position="left" :label-width="100">
          <FormItem label="证件号码">
            <Input v-model="list.num"></Input>
          </FormItem>
          <FormItem label="预约时间">
            <DatePicker
              type="date"
              v-model="list.datetime"
              placeholder="选择预约时间"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
          <FormItem label="居住天数">
            <Input v-model="list.day"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="zhudan-item">
        <Form label-position="left" :label-width="100">
          <FormItem label="订单类型">
            <Select v-model="list.style">
              <Option value="0">预订单</Option>
              <Option value="1">订单</Option>
            </Select>
          </FormItem>
          <FormItem label="地区">
            <Input v-model="list.place"></Input>
          </FormItem>
          <FormItem label="备注说明">
            <Input v-model="list.msg"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <Divider orientation="left">保留房间</Divider>
    <div>
      <RadioGroup v-model="list.roomNum" type="button">
        <div class="baoliu-item">
          <Tag color="success">单人房</Tag>
          <Radio label="S201"></Radio>
          <Radio label="S202"></Radio>
          <Radio label="S203"></Radio>
          <Radio label="S204"></Radio>
          <Radio label="S205"></Radio>
          <Radio label="S206"></Radio>
          <Radio label="S207"></Radio>
          <Radio label="S208"></Radio>
          <Radio label="S209"></Radio>
          <Radio label="S210"></Radio>
        </div>
        <div class="baoliu-item">
          <Tag checkable color="primary">双人房</Tag>
          <Radio label="D301"></Radio>
          <Radio label="D302"></Radio>
          <Radio label="D303"></Radio>
          <Radio label="D304"></Radio>
          <Radio label="D305"></Radio>
          <Radio label="D306"></Radio>
          <Radio label="D307"></Radio>
          <Radio label="D308"></Radio>
          <Radio label="D309"></Radio>
          <Radio label="D310"></Radio>
        </div>
        <div class="baoliu-item">
          <Tag checkable color="warning">家庭套房</Tag>
          <Radio label="F401"></Radio>
          <Radio label="F402"></Radio>
          <Radio label="F403"></Radio>
          <Radio label="F404"></Radio>
          <Radio label="F405"></Radio>
          <Radio label="F406"></Radio>
          <Radio label="F407"></Radio>
          <Radio label="F408"></Radio>
          <Radio label="F409"></Radio>
          <Radio label="F410"></Radio>
        </div>
      </RadioGroup>
    </div>
    <div class="yuding-btn">
      <Button type="success" @click="handle()">预定</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        name: "",
        sex: "",
        phone: "",
        datetime: "",
        day: "",
        num: "",
        style: "",
        place: "",
        msg: "",
        roomNum: ""
      }
    };
  },
  methods: {
    handle() {
      for (let item in this.list) {
        if (!this.list[item]) {
          this.$Message.error("表单内容不能为空");
          return;
        }
      }
      this.book(this.list);
    },
    book(data) {
      console.log(data);
      Object.assign(this.$data, this.$options.data());
      this.$Message.success("提交成功");
    }
  }
};
</script>

<style lang="">
.zhudan {
  display: flex;
}
.zhudan-item {
  margin: 0 10px;
  flex: 1;
}
.baoliu-item {
  margin: 10px 0;
}
.baoliu-item label {
  width: 70px;
  text-align: center;
}
.ivu-tag {
  text-align: center;
  width: 70px;
  margin-right: 10px;
}
.yuding-btn {
  padding: 20px 10px 0 0;
  text-align: right;
}
.yuding-btn button {
  width: 150px;
}
</style>
