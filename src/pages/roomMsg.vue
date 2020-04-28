<template>
  <div>
    <Divider orientation="left">全部房态</Divider>
    <div>
      <Tag @on-change="kf" checkable color="primary">空房</Tag>
      <Tag @on-change="zz" checkable color="success">在住</Tag>
      <Tag @on-change="ty" checkable color="error">停用</Tag>
    </div>

    <div class="card-list">
      <Row :gutter="24">
        <Card
          span="6"
          class="card-item"
          :class="checkRoom(item.fjzt)"
          v-for="(item,index) in roomList"
          :key="index"
          v-show="checkShow(item.fjzt)"
        >
          <p slot="title" class="card-item-p" style="text-align: right">
            {{ item.fh }}
            <Dropdown trigger="click" style="float: right;margin-left:25px;text-align: center;">
              <a href="javascript:void(0)">
                <Icon type="ios-arrow-down" style="color:#fff"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <p class="drop-p" @click="clickchakan(item.roomUuid)">查看</p>
                </DropdownItem>
                <DropdownItem>
                  <p class="drop-p" @click="clickxiugai(item.roomUuid)">修改房价</p>
                </DropdownItem>
                <DropdownItem v-if="item.fjzt == '在住' ? true : false">
                  <p class="drop-p" @click="clickxuzu(item.roomUuid)">续住</p>
                </DropdownItem>
                <DropdownItem v-if="item.fjzt == '在住' ? true : false">
                  <p class="drop-p" @click="clicktuifang(index)">退房</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </p>
          <p @click="clickchakan" class="card-item-p">房型：{{ item.fjlx }}</p>
          <p class="card-item-p">房价：{{ item.fjjg }}元</p>
        </Card>
      </Row>
    </div>
    <Modal title="查看" v-model="chakan" class-name="vertical-center-modal">
      <div>房号：{{ roomMsg.fh }}</div>
      <div>价格：{{ roomMsg.fjjg }}</div>
      <div>类型：{{ roomMsg.fjlx }}</div>
      <div>状态：{{ roomMsg.fjjg }}</div>
    </Modal>
    <Modal title="修改价格" v-model="xiugai" class-name="vertical-center-modal" @on-ok="okModify()">
      <Form label-position="left" :label-width="100">
        <FormItem label="修改后价格">
          <Input v-model="price" />
        </FormItem>
      </Form>
    </Modal>
    <Modal title="续住" v-model="xuzu" class-name="vertical-center-modal" @on-ok="okxuzu()">
      <Form label-position="left" :label-width="100">
        <FormItem label="续住天数">
          <Input v-model="day" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="tuifang" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>是否退房</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long>退房</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { roomGet, roomGetOne, roomMP, roomR } from "@/network/user.js";
export default {
  data() {
    return {
      chakan: false,
      xiugai: false,
      xuzu: false,
      tuifang: false,
      roomList: [],
      roomMsg: {},
      day: 0,
      price: 0,
      uuid: "",
      is_kf: true,
      is_zz: true,
      is_ty: true
    };
  },
  created() {
    this.getAllRoom();
  },
  methods: {
    checkRoom(fjzt) {
      if (fjzt == "空闲") return "un-use";
      else if (fjzt == "在住") return "is-use";
      else if (fjzt == "停用") return "off";
    },
    clickchakan(id) {
      let that = this;
      if (!id) {
        this.$Message.error("房间id不能为空");
        return;
      }
      roomGetOne(id).then(res => {
        if (res.status === 200) {
          console.log(res);
          that.roomMsg = res.data;
          that.chakan = true;
        }
      });
    },
    clickxiugai(id) {
      this.uuid = id;
      this.xiugai = true;
    },
    clickxuzu(id) {
      this.uuid = id;
      this.xuzu = true;
    },
    clicktuifang() {
      this.tuifang = true;
    },
    getAllRoom() {
      let that = this;
      roomGet().then(res => {
        if (res.status === 200) {
          console.log(res);
          that.roomList = res.data;
        }
      });
    },
    okModify() {
      if (!this.price || !this.uuid) {
        this.$Message.error("表单信息不能为空");
        return;
      }
      let data = {
        fjjg: this.price,
        roomUuid: this.uuid
      };
      let that = this;
      roomMP(data).then(res => {
        if (res.status === 200) {
          this.$Message.success("修改成功");
          that.price = 0;
          that.uuid = "";
          this.getAllRoom();
        } else {
          this.$Message.error("修改失败");
        }
      });
    },
    okxuzu() {
      if (!this.uuid || !this.day) {
        this.$Message.error("表单信息不能为空");
        return;
      }
      let data = {
        roomUuid: this.uuid,
        xzts: this.day
      };
      let that = this;
      roomR(data).then(res => {
        if (res.status === 200) {
          this.$Message.success("续住成功");
          that.day = 0;
          that.uuid = "";
          this.getAllRoom();
        } else {
          this.$Message.error("续住失败");
        }
      });
    },
    kf(checked) {
      this.is_kf = checked;
    },
    zz(checked) {
      this.is_zz = checked;
    },
    ty(checked) {
      this.is_ty = checked;
    },
    checkShow(fjzt) {
      console.log(fjzt);
      if (fjzt == "空闲") return this.is_kf;
      else if (fjzt == "在住") return this.is_zz;
      else if (fjzt == "停用") return this.is_ty;
    }
  }
};
</script>
<style scoped>
.card-list {
  margin: 10px 0 10px 0;
  display: flex;
  padding: 30px 30px;
}
.card-item {
  width: 150px;
  display: inline-block;
  margin: 5px;
  flex: 1;
}
.card-item-p {
  color: #fff;
}
.un-use {
  background-color: #2d8cf0;
}
.is-use {
  background-color: #19be6b;
}
.off {
  background-color: #ed4014;
}
.drop-p {
  color: #515a6e;
}
</style>
