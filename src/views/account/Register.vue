<template>
  <div class="account">
    <div class="form-wrap">
      <a-form layout="vertical" :model="account_form" :rules="rules">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="account_form.username" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="account_form.password" />
        </a-form-item>

        <a-form-item label="验证密码" name="passwords">
          <a-input-password v-model:value="account_form.passwords" />
        </a-form-item>

        <a-form-item>
          <Captcha></Captcha>
          <!-- <div id="captcha-dom" class="nc-container"></div> -->
          <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
        </a-form-item>

        <a-form-item label="验证码" name="code">
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input v-model:value="account_form.code" maxlength="6" />
            </a-col>
            <a-col :span="10">
              <a-button
                block
                type="primary"
                :loading="button_loading"
                @click="enterIconLoading"
              >
                延迟1s
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>

        <div class="fs-12 color-white">
          <a href="">忘记密码</a>
          <a-divider type="vertical" style="border-color: #1890ff" />
          <router-link to="/login">登录</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import Captcha from "../../components/Captcha/index.vue";
import {
  checkPhone,
  checkPassword,
  checkCode as code,
} from "../../utils/Verification";
export default defineComponent({
  name: "Register",
  components: {
    Captcha,
  },
  // 已启用类型推断
  setup(props) {
    const count = ref<string>("10");
    //用户名验证
    const checkUserName = async (
      _rule: any,
      value: string,
      callback: any
    ): Promise<void> => {
      if (!value) {
        return Promise.reject("请输入用户名");
      }
      if (!checkPhone(value)) {
        return Promise.reject("请输入11位手机号码");
      } else {
        // callback()
        return Promise.resolve();
      }
    };

    //密码验证
    const validatePass = async (_rule: any, value: string): Promise<void> => {
      if (!value) {
        return Promise.reject("请输入密码");
      }
      if (!checkPassword(value)) {
        return Promise.reject("请输入6~20位的，数字+英文");
      } else {
        return Promise.resolve();
      }
    };

    //再次输入密码
    const validatePass2 = async (_rule: any, value: string): Promise<void> => {
      const pass = formConfig.account_form.password;

      if (!value) {
        return Promise.reject("请输入密码");
      } else if (!checkPassword(value)) {
        return Promise.reject("请再次输入密码");
      } else if (pass && value && pass !== value) {
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.resolve();
      }
    };

    /** 检验验证码 */
    const checkCode = async (_rule: any, value: string): Promise<void> => {
      if (!value) {
        return Promise.reject("请输入验证码"); //不存在的情况
      } else if (!code(value)) {
        return Promise.reject("请输入6位的数字+英文"); //密码错误的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };

    //reactive:定义响应对象。
    const formConfig = reactive<any>({
      account_form: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      aa: "11",
      bb: "sss",
      rules: {
        username: [
          {
            // required: true,
            validator: checkUserName,
            trigger: "change",
          },
        ],
        password: [
          {
            validator: validatePass,
            trigger: "change",
          },
        ],
        passwords: [
          {
            validator: validatePass2,
            trigger: "change",
          },
        ],
        code: [{ validator: checkCode, trigger: "change" }],
      },
    });

    const dataItem = reactive<any>({
      button_loading: false,
    });

    const enterIconLoading = () => {
      dataItem.button_loading = { delay: 1000 };

      setTimeout(() => {
        dataItem.button_loading = false;
      }, 6000);
    };

    //toRefs：将响应式对象转换为普通对象
    //如果不适用toRefS转换一下根本就没有办法调用变量，在options API中可以通过this调用
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);

    onMounted(() => {});
    return {
      ...form,
      ...data,

      enterIconLoading,
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