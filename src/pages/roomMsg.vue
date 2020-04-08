<template>
  <div>
    <Divider orientation="left">全部房态</Divider>
    <div>
      <Tag checkable color="primary">空房</Tag>
      <Tag checkable color="success">在住</Tag>
      <Tag checkable color="error">停用</Tag>
    </div>

    <div class="card-list">
      <Row :gutter="24">
        <Card span="6" class="card-item" v-for="index in 30" :key="index">
          <p slot="title" class="card-item-p" style="text-align: right">
            s1{{ index }}
            <Dropdown
              trigger="click"
              style="float: right;margin-left:25px;text-align: center;"
            >
              <a href="javascript:void(0)">
                <Icon type="ios-arrow-down" style="color:#fff"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem
                  ><p class="drop-p" @click="clickchakan(index)">查看</p>
                </DropdownItem>
                <DropdownItem
                  ><p class="drop-p" @click="clickxiugai(index)">
                    修改房价
                  </p></DropdownItem
                >
                <DropdownItem
                  ><p class="drop-p" @click="clickxuzu(index)">
                    续住
                  </p></DropdownItem
                >
                <DropdownItem
                  ><p class="drop-p" @click="clicktuifang(index)">退房</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </p>
          <p @click="clickchakan" class="card-item-p">房型</p>
          <p class="card-item-p">房价：X元</p>
        </Card>
      </Row>
    </div>
    <Modal title="提示" v-model="chakan" class-name="vertical-center-modal"
      >查看{{ demo }}</Modal
    >
    <Modal title="提示" v-model="xiugai" class-name="vertical-center-modal"
      >修改房价{{ demo }}</Modal
    >
    <Modal title="提示" v-model="xuzu" class-name="vertical-center-modal"
      >续住{{ demo }}</Modal
    >
    <Modal v-model="tuifang" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>是否退房{{ demo }}</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long>退房</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chakan: false,
      xiugai: false,
      xuzu: false,
      tuifang: false,
      demo: ""
    };
  },
  methods: {
    clickchakan(data) {
      this.demo = data;
      this.chakan = true;
    },
    clickxiugai(data) {
      this.demo = data;
      this.xiugai = true;
    },
    clickxuzu(data) {
      this.demo = data;
      this.xuzu = true;
    },
    clicktuifang(data) {
      this.demo = data;
      this.tuifang = true;
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
  background-color: #2d8cf0;
  margin: 5px;
  flex: 1;
}
.card-item-p {
  color: #fff;
}
.isuse {
  background-color: #19be6b;
}
.off {
  background-color: #ed4014;
}
.drop-p {
  color: #515a6e;
}
</style>
