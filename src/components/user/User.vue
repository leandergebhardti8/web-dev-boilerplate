<template>
    <div class="user">
        <button @click="navigateHome" class="btn btn-primary home-btn"><b-icon-house></b-icon-house></button>
        <h1>Userpage</h1>
        <div class="space-medium">
          <h3>Profile</h3>
          <div class="profile">
            <b-form-group
              id="full-name"
              label="Full name:"
              label-for="full-name"
              class="info-field"
            >
              <b-form-input id="full-name" v-model="fullUser.full_name" placeholder="Full Name"></b-form-input>
            </b-form-group>
            <b-form-group 
              id="full-name"
              label="Username:"
              label-for="username"
              class="info-field"
            >
              <b-form-input id="username" v-model="fullUser.username" placeholder="Username"></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="space-medium">
          <h3>Change Password</h3>
          <div class="profile">
            <b-form-group
              id="current-password"
              label="Current Password"
              label-for="current-password"
              class="info-field"
            >
              <b-form-input id="current-password" v-model="userUpdate.password" type="password" placeholder="enter your current password"></b-form-input>
            </b-form-group>
            <b-form-group
              id="newpassword"
              label="New Password: "
              label-for="newpassword"
              class="info-field"
            >
              <b-form-input id="newpassword" v-model="userUpdate.newpassword" type="password" placeholder="enter a new password"></b-form-input>
            </b-form-group>
            <b-form-group
              id="confirmpassword"
              label="Confirm New Password: "
              label-for="confirmpassword"
              class="info-field"
            >
              <b-form-input id="confirmpassword" v-model="passwordRepeat" type="password" placeholder="enter the password again"></b-form-input>
            </b-form-group>


            <!-- Alerts -->

            <b-alert v-if="showError" show variant="danger">
                <p class="alert-text">Passwords do not match!</p>
            </b-alert>

            <b-alert v-if="noChangePasswordError" show variant="danger">
                <p class="alert-text">Choose a new password!</p>
            </b-alert>

            <button @click="updateUser()" class="btn btn-primary"><strong>Update Password</strong></button>

            <b-alert show variant="success" v-if="showPasswordUpdateSuccess">
              <p class="alert-text">Password changed!</p>
            </b-alert>
            <b-alert show variant="danger" v-if="showPasswordUpdateError">
              <p class="alert-text"><b-icon-exclamation font-scale="2"></b-icon-exclamation> Something went wrong while updating your password.</p>
            </b-alert>
          </div>
        </div>
        <div class="space-medium">
          <h3>Remove Account</h3>
          <div class="profile">
            <button @click="deleteUser" class="btn btn-danger"> <b-icon-exclamation-octagon></b-icon-exclamation-octagon> <strong>Delete Account</strong></button>
            <p class="button-text">Deleting your account is irreversible!</p>
          </div>
        </div>
    </div>
</template>

<script>
 import { mapActions ,mapGetters } from 'vuex'  

export default {
  name: 'User',
  data() {
      return {
        onChangeUsername: false,
        onChangeFullName: false,
        showError: false,
        showPasswordUpdateSuccess: false,
        showPasswordUpdateError: false,
        noChangePasswordError: false,
        passwordRepeat: '',
        userUpdate: {
          password: '',
          newpassword: '',
          username: '',
          full_name: '',
        },
      }
  },
  created(){
    this.GetUser(this.user);
  },
  watch: {
    passwordRepeat: function (val){
      if(val != this.userUpdate.newpassword){
        this.showError = true;
      }
      else {
        this.showError = false;
      }
    },
    password(val) {
      if(val != this.passwordRepeat){
        this.showError = true;
      }
      else {
        this.showError = false;
      }
    },
  },
  computed: {
    ...mapGetters({fullUser: "StateFullUser"}),
    ...mapGetters({user: "StateUser"}),
    ...mapGetters({fullUser: "StateFullUser"}),
    password() {
      return this.userUpdate.newpassword;
    }
  },
  methods: {
    ...mapActions([
      'GetUser', 
      'GetFullUser', 
      'UpdateUser', 
      'DeleteUser']
      ),
      navigateHome() {
          this.$router.push('/');
      },

      async updateUser() {
        if(this.checkPassword(this.userUpdate.newpassword)) {
        try {
          if(this.userUpdate.username === '' || this.userUpdate.full_name === '') {
            this.userUpdate.username = this.fullUser.username;
            this.userUpdate.full_name = this.fullUser.full_name;
          }
          await this.UpdateUser(this.userUpdate);
          this.showPasswordUpdateSuccess = true;
        } catch (error) {
          console.log('Error accured while updating User info ' + error)
          this.showPasswordUpdateError = true;
        }
        }
      },

      checkPassword(newpassword) {
        if(newpassword === this.userUpdate.password){
          this.noChangePasswordError = true
          return false
        } 
        else {
          return true
        }
          
      },

      async deleteUser() {
        try {
          let userID = this.fullUser.id
          await this.DeleteUser(userID);
          this.$router.push('/login')
        } catch (error) {
          console.log('Error accured while deleting User ' + error)
        }
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .user {
    color: white;
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

  .profile {
    padding: 15px;
    // background: white;
    border-radius: 15px;
    text-align: left;
    margin-left: 40vw;
    width: 20vw;
    color: white;
    align-content: center;
  }

  .info-field {
    margin-bottom: 1rem;
  }
  .home-btn {
    margin: 15px 2rem;
  }

  .button-text{
    display: inline;
    margin-left: 2rem;
  }
  .alert-text {
    margin: 0;
  }

</style>
