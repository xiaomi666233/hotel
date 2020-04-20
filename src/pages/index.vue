<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider hide-trigger>
        <div class="user-img">
          <Icon class="img" type="ios-contact" />
        </div>
        <Menu
          theme="dark"
          width="auto"
          :open-names="['1']"
          @on-select="selectFn"
          :active-name="$route.path"
        >
          <Submenu name="1">
            <template slot="title">订房管理</template>
            <MenuItem name="order">订房登记</MenuItem>
            <MenuItem name="orderMsg">订房信息</MenuItem>
            <MenuItem name="checkOut">超时未退房订单</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">房间管理</template>
            <MenuItem name="roomMsg">房间信息</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">点餐系统</template>
            <MenuItem name="menu">点餐</MenuItem>
            <MenuItem name="menuManagement">菜单管理</MenuItem>
            <MenuItem name="menuOrder">点餐订单信息</MenuItem>
          </Submenu>
          <MenuItem name="/">退出</MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header
          :style="{
            background: '#fff',
            boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'
          }"
        >
          <h2>酒店管理系统</h2>
        </Header>
        <Content :style="{ padding: '0 16px 16px' }">
          <Breadcrumb :style="{ margin: '16px 0' }">
            <BreadcrumbItem></BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="height: auto">
              <!-- 路由 -->
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
              <!-- 路由/ -->
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    selectFn(a) {
      this.$router.push({
        path: a
      });
    }
  }
};
</script>
<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.user-img {
  height: 120px;
  width: 100%;
  text-align: center;
  padding: 20px;
}
.img {
  color: #fff;
  font-size: 80px;
}
</style>
