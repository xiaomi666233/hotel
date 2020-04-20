<template>
  <div>
    <Divider orientation="left">主单</Divider>
    <div class="zhudan">
      <div class="zhudan-item">
        <Form label-position="left"
              :label-width="100">
          <FormItem label="客人名称">
            <Input v-model="list.name"></Input>
          </FormItem>
          <FormItem label="性别">
            <Select v-model="list.sex">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem label="手机号码"
                    prop="phone">
            <Input v-model="list.phone"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="zhudan-item">
        <Form label-position="left"
              :label-width="100">
          <FormItem label="证件号码">
            <Input v-model="list.num"></Input>
          </FormItem>
          <FormItem label="预约时间">
            <DatePicker type="datetime"
                        @on-change="setDate"
                        v-model="list.datetime"
                        placeholder="选择预约时间"
                        style="width: 100%"
                        @on-ok="getRooms()"></DatePicker>
          </FormItem>
          <FormItem label="居住天数">
            <Input v-model="list.day"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="zhudan-item">
        <Form label-position="left"
              :label-width="100">
          <FormItem label="订单类型">
            <Select v-model="list.style">
              <Option value="预订单">预订单</Option>
              <Option value="订单">订单</Option>
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
    <Divider orientation="left"
             v-if="is_show_kf">保留房间</Divider>
    <div v-if="is_show_kf">
      <RadioGroup v-model="list.roomNum"
                  type="button">
        <div class="baoliu-item">
          <Tag color="success">单人房</Tag>
          <Radio v-for="(item,index) in drfList"
                 :key="index"
                 :label="item.fh"></Radio>
        </div>
        <div class="baoliu-item">
          <Tag checkable
               color="primary">双人房</Tag>
          <Radio v-for="(item,index) in srfList"
                 :key="index"
                 :label="item.fh"></Radio>
        </div>
        <div class="baoliu-item">
          <Tag checkable
               color="warning">家庭套房</Tag>
          <Radio v-for="(item,index) in jtfList"
                 :key="index"
                 :label="item.fh"></Radio>
        </div>
      </RadioGroup>
    </div>
    <div class="yuding-btn">
      <Button type="success"
              @click="handle()">预定</Button>
    </div>
  </div>
</template>

<script>
import { order, room, timeGetkf } from '@/network/user.js'
export default {
  data() {
    return {
      list: {
        name: '',
        sex: '',
        phone: '',
        datetime: '',
        day: 0,
        num: '',
        style: '',
        place: '',
        msg: '',
        roomNum: ''
      },
      fList: [],
      drfList: [],
      srfList: [],
      jtfList: [],
      is_show_kf: false
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      let that = this
      room().then(res => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].fjlx == '单人房' && res.data[i].fjzt == '空闲') {
              that.drfList.push(res.data[i])
            } else if (
              res.data[i].fjlx == '双人房' &&
              res.data[i].fjzt == '空闲'
            ) {
              that.srfList.push(res.data[i])
            } else if (
              res.data[i].fjlx == '家庭套房' &&
              res.data[i].fjzt == '空闲'
            ) {
              that.jtfList.push(res.data[i])
            }
          }
        }
        console.log(this.drfList)
      })
    },
    handle() {
      for (let item in this.list) {
        if (!this.list[item]) {
          this.$Message.error('表单内容不能为空')
          return
        }
      }
      this.book(this.list)
    },
    setDate(date) {
      this.list.datetime = date
    },
    book(data) {
      console.log(data)
      let model = {
        bz: data.name,
        ddlx: data.style,
        dq: data.place,
        fh: data.roomNum,
        fjlx: data.msg,
        jzts: data.day,
        krmc: data.name,
        sjhm: data.phone,
        xb: data.sex,
        yysj: data.datetime,
        zjhm: data.num
      }
      order(model).then(res => {
        console.log(res.status)
        if (res.status == 200) {
          this.$Message.success('订房成功')
          Object.assign(this.$data, this.$options.data())
          this.getList()
        } else {
          this.$Message.error('订房失败')
        }
      })
    },
    getRooms() {
      this.drfList = []
      this.srfList = []
      this.jtfList = []
      let that = this
      timeGetkf(this.list.datetime).then(res => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].fjlx == '单人房') {
              that.drfList.push(res.data[i])
            } else if (res.data[i].fjlx == '双人房') {
              that.srfList.push(res.data[i])
            } else if (res.data[i].fjlx == '家庭套房') {
              that.jtfList.push(res.data[i])
            }
          }
        }
        that.is_show_kf = true
      })
    }
  }
}
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
