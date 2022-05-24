<template>
    <div class="register">
      <div class="left-half">
        <h1>Welcome!</h1>
        <h2>Register to continue</h2>
      </div>
      <div class="right-half">
        <p>Please register with your personal data.</p>
            <div>
              <label class="sr-only" for="inline-form-input-username">Username</label>
              <b-form inline @submit.prevent="submit">
                  <b-form-input
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    type="text"
                    name="username"
                    placeholder="Username"
                    v-model="form.username"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback :state="usernameValidation">
                    <b-icon icon="exclamation-triangle"></b-icon> Your username must be 5-12 characters long.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="usernameValidation">
                    <b-icon-check></b-icon-check>Looks Good.
                  </b-form-valid-feedback>
                  <label class="sr-only" for="inline-form-input-full-name">Full Name</label>
                  <b-form-input 
                    type="text" 
                    id="inline-form-input-full-name" 
                    name="full_name"
                    placeholder="Full name"
                    v-model="form.full_name"
                    class="space-medium-bottom"
                  >
                  </b-form-input>
                  <label class="sr-only" for="inline-form-input-password">Password</label>
                  <div @click="togglePassword" class="eye-icon">
                    <b-icon-eye-fill v-if="showPassword"></b-icon-eye-fill>
                    <b-icon-eye-slash-fill v-if="!showPassword"></b-icon-eye-slash-fill>
                  </div>
                  <b-form-input 
                    :type="this.type" 
                    id="inline-form-input-password" 
                    name="password"
                    placeholder="create a new password"
                    v-model="form.password"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback :state="passwordValidation">
                    <b-icon icon="exclamation-triangle"></b-icon>Your password must be 5-12 characters long.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="passwordValidation">
                   <b-icon-check></b-icon-check> Looks Good.
                  </b-form-valid-feedback>

                  <b-form-invalid-feedback :state="passwordValidationNumbers">
                    <b-icon icon="exclamation-triangle"></b-icon> Your password must contain numbers.
                  </b-form-invalid-feedback>

                  <b-form-invalid-feedback :state="passwordSpecial">
                    <b-icon icon="exclamation-triangle"></b-icon>Your password must contain Special Characters.
                  </b-form-invalid-feedback>

                  <label class="sr-only" for="inline-form-repeat-password">Repeat password</label>
                  <b-form-input 
                    type="password" 
                    id="inline-form-repeat-password" 
                    name="password"
                    placeholder="repeat your password"
                    v-model="repeatPassword"
                  >
                  </b-form-input>
                  

                  <b-form-invalid-feedback :state="repeatCorrect">
                    <b-icon icon="exclamation-triangle"></b-icon>Passwords must match.
                  </b-form-invalid-feedback>

                  <button type="submit" class="btn btn-primary">Register</button>
              </b-form>
            </div>
            <b-alert v-if="showError" show variant="danger">
              <p class="error">Username already exists</p>
            </b-alert>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';

export default {
  name: 'Register',
  props: {
  }, 
  data() {
    return {
      form: {
        username: '',
        full_name: '',
        password: '',
      },
      type: 'password',
      repeatPassword: '',
      showError: false,
      showPassword: false,
      repeatCorrect: false,
    }
  },
  computed: {
    usernameValidation() {
      return this.form.username.length > 4 && this.form.username.length < 13
    },
    passwordValidation() {
      return this.form.password.length > 4
    },
    passwordValidationNumbers() {
      return /\d/.test(this.form.password);
    },
    passwordSpecial() {
      return /[!@#$%^&*)(+=._-]/.test(this.form.password);
    },
    password() {
      return this.form.password;
    }
  },
  watch: {
    repeatPassword(val) {
      if(val === this.form.password){
        return this.repeatCorrect = true;
      } else {
        return this.repeatCorrect = false;
      }
    },
    password(val) {
      if(val === this.repeatPassword){
        return this.repeatCorrect = true;
      } else {
        return this.repeatCorrect = false;
      }
    },
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
    togglePassword() {
      if(this.showPassword) this.showPassword = false;
      else this.showPassword = true;

      if(this.type === 'password') this.type = 'text';
      else if(this.type === 'text') this.type = 'password';
    },

  }, 
}
</script>


<style scoped lang="scss">
  h1 {
    color: black;
  }
  .navbar {
    background: black;
    color: white;
  }
  a {
    color: white !important;
  }
  .nav-link {
    color: white;
    
    &:hover {
      color: white;
    }
  }
  .register {
      display: flex;
      place-items: center;
      margin: 3.5% 25% 10% 25%;
      padding: 2.5% 5%;
      border-radius: 25px;
      border: 4px solid white;
      background-color: white;
      color: black;
      overflow: hidden;
  }

  .left-half {
    width: 50%;
    margin-right: 2rem;
  }

  .right-half {
    width: minmax(350px ,50%);
    text-align: left;
  }
  b-input-group {
    margin-top: 15px;
  }
  .login-button {
    margin: 2rem;
  }

  .eye-icon {
    margin: auto;
    margin-left: 15px;
    display: inline-block;
    cursor: pointer;
  }
  button {
    margin: 2rem 0;
  }

  .error {
    margin: 0 !important;
  }

  label {
    font-weight: 500;
  }

  input {
    border-radius: 15px;
  }

  form {
    width: 350px;
  }
</style>
