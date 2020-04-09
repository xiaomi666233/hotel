<template>
  <div>
    <Divider orientation="left">主单</Divider>
    <div class="zhudan">
      <div class="zhudan-item">
        <Form label-position="left" :label-width="100">
          <FormItem label="客人名称">
            <Input></Input>
          </FormItem>
          <FormItem label="性别">
            <Select>
              <Option value>男</Option>
              <Option value>女</Option>
            </Select>
          </FormItem>
          <FormItem label="手机号码">
            <Input></Input>
          </FormItem>
        </Form>
      </div>
      <div class="zhudan-item">
        <Form label-position="left" :label-width="100">
          <FormItem label="证件号码">
            <Input></Input>
          </FormItem>
          <FormItem label="预约时间">
            <Input></Input>
          </FormItem>
          <FormItem label="居住天数">
            <Input></Input>
          </FormItem>
        </Form>
      </div>
      <div class="zhudan-item">
        <Form label-position="left" :label-width="100">
          <FormItem label="订单类型">
            <Select>
              <Option value>预订单</Option>
              <Option value>订单</Option>
            </Select>
          </FormItem>
          <FormItem label="地区">
            <Input></Input>
          </FormItem>
          <FormItem label="备注说明">
            <Input></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <Divider orientation="left">保留房间</Divider>
    <div>
      <RadioGroup v-model="room" type="button">
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
      <Button type="success">预定</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: ""
    };
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
