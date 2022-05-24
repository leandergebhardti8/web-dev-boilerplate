<template>
    <div class="login">
      <div class="left-half">
        <h1>Welcome!</h1>
        <h2>Login to continue</h2>
      </div>
      <div class="right-half">
        <p>Please login with your personal data.</p>
            <div>
              <label class="sr-only" for="inline-form-input-username">Username</label>
              <b-form inline @submit.prevent="submit">
                  <b-form-input
                    id="inline-form-input-username"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Username"
                    name="username"
                    v-model="form.username"
                  ></b-form-input>
                  <b-form-invalid-feedback :state="usernameValidation">
                    <b-icon icon="exclamation-triangle"></b-icon> Your username must be 5-12 characters long.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="usernameValidation">
                    <b-icon-check></b-icon-check>Looks Good.
                  </b-form-valid-feedback>
                  <br>

                  <label class="sr-only" for="inline-form-input-username">Password</label>
                  <div @click="togglePassword" class="eye-icon">
                    <b-icon-eye v-if="!showPassword"></b-icon-eye>
                    <b-icon-eye-slash v-if="showPassword"></b-icon-eye-slash>
                  </div>
                  
                  <b-form-input 
                    :type="this.type" 
                    id="inline-form-input-password"
                    name="password"
                    placeholder="Password"
                    v-model="form.password"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback :state="passwordValidation">
                    <b-icon icon="exclamation-triangle"></b-icon>Your password must be at least 6 characters long.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="passwordValidation">
                   <b-icon-check></b-icon-check> Looks Good.
                  </b-form-valid-feedback>

                  <b-form-invalid-feedback :state="passwordValidationNumbers">
                    <b-icon icon="exclamation-triangle"></b-icon> Your password must contain numbers.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="passwordValidationNumbers">
                  <b-icon-check></b-icon-check> Your password contains numbers.
                  </b-form-valid-feedback>

                  <b-form-invalid-feedback :state="passwordSpecial">
                    <b-icon icon="exclamation-triangle"></b-icon>Your password must contain Special Characters.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="passwordSpecial">
                  <b-icon-check></b-icon-check> Your password contains Special Characters.
                  </b-form-valid-feedback>

                  <button type="submit" class="btn btn-primary space-medium">Login</button>
              </b-form>
            </div>

          <!-- Error Messages -->

          <b-alert v-if="showError" show variant="danger">
              <p class="error">Username or Password incorrect!</p>
          </b-alert>

          <b-alert v-if="tokenError" show variant="danger">
            <b-icon-exclamation font-scale="2"></b-icon-exclamation>Check if your <b-icon-github></b-icon-github> <b>Token</b> is still valid.
          </b-alert>
      </div>

    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  props: {
  }, 
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      type: 'password',
      showError: false,
      showPassword: false
    }
  },
  computed: {
    ...mapGetters({tokenError: "StateTokenNotValid"}),
    usernameValidation() {
      return this.form.username.length > 4 && this.form.username.length < 13
    },
    passwordValidation() {
      return this.form.password.length > 6
    },
    passwordValidationNumbers() {
      return /\d/.test(this.form.password);
    },
    passwordSpecial() {
      return /[!@#$%^&*)(+=._-]/.test(this.form.password);
    },
  },
  methods: {
    ...mapActions(['LogIn']),
    async submit() {
      try {
        await this.LogIn(this.form);
        this.$router.push('/')
        this.showError = false
      } catch (error) {
        console.log("Error while logging in" + error.message)
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
  .login {
      display: flex;
      place-items: center;
      margin: 5% 25% 10% 25%;
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

  @media screen and (max-width: 400px) {
    .login{
      padding: 0;
      margin: 0;
    }
  }
</style>
