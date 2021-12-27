<template>
  <div class="account">
    <div class="form-wrap">
      <a-form layout="vertical">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="account_form.username" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="account_form.password" />
        </a-form-item>

        <a-form-item>
          <!-- <div id="captcha-dom" class="nc-container"></div> -->
          <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>

        <div class="fs-12 color-white">
          <a href="">忘记密码</a>
          <a-divider type="vertical" style="border-color: #1890ff" />
          <a href="">注册</a>
        </div>
      </a-form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
export default defineComponent({
  // 已启用类型推断
  setup(props) {
    const count = ref<string>("10");
    console.log(count.value);

    //reactive:定义响应对象。
    const formConfig = reactive<any>({
      account_form: {
        username: "",
        password: "",
      },
      aa: "11",
      bb: "sss",
    });

    //toRefs：将响应式对象转换为普通对象
    //如果不适用toRefS转换一下根本就没有办法调用变量，在options API中可以通过this调用
    const data = toRefs(formConfig);

    onMounted(() => {});
    return {
      ...data
    };
  },
});
</script>



<style lang="scss" >
.account {
  width: 100vw;
  height: 100vh;
  background-color: #282828;
  display: flex;
  align-items: center;
}
.form-wrap {
  margin: auto;
  width: 282px;
  color: #fff;

  .ant-form-item-label {
    label {
      color: #ffffff;
    }
  }
  .nc-container #nc_1_wrapper,
  .nc-container.tb-login #nc_1_wrapper {
    width: 282px;
    .nc_scale {
      height: 32px;
    }
  }
}
</style>