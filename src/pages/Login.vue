<template>
  <div>
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="login"
          >
            <el-form-item prop="email">
              <el-input
                placeholder="Email"
                prefix-icon="ti-user"
                v-model="ruleForm.email"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="Password"
                prefix-icon="ti-lock"
                v-model="ruleForm.password"
                autocomplete="off"
              >
              </el-input>
            </el-form-item>

            <button
              class="button login__submit"
              @click="submitForm('ruleForm')"
            >
              <span class="button__text">Log In Now</span>
              <i class="button__icon fas ti-angle-double-right"></i>
            </button>
          </el-form>
        </div>
        <div class="screen__background">
          <span
            class="screen__background__shape screen__background__shape4"
          ></span>
          <span
            class="screen__background__shape screen__background__shape3"
          ></span>
          <span
            class="screen__background__shape screen__background__shape2"
          ></span>
          <span
            class="screen__background__shape screen__background__shape1"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      status: "",
      ruleForm: {
        email: "",
        password: "",
      },

      rules: {
        email: [
          {
            required: true,
            message: "Please input email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert("Insert reason success.");
          const data = {
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          };
          //console.log(data);
          axios
            .post("http://192.168.5.75:5000/login", data)
            .then((response) => {
              this.status = response.status;
              //console.log("Login success", this.status);
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.data[0])
              );
              this.$router.push("/");
            })
            .catch(function (error) {
              alert("Email or password incoorect");
              console.log("Email or password incoorect");
            });

          //this.$router.push("/").go();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}

body {
  background: linear-gradient(90deg, #c7c5f4, #776bcc);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5d54a4, #7c78b8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5c5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #fff;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6c63ac;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5d54a4, #6a679e);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7e7bb9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875b5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6a679e;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #d4d3e8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4c489d;
  box-shadow: 0px 2px 2px #5c5696;
  cursor: pointer;
  transition: 0.2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6a679e;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875b5;
}
</style>
