<template>
  <div class="about" id="wrapper">
    <div id="main">
      <div class="inner">
        <div id="image01" class="image"><img src="http://www.jaworzno.zhp.pl/wp-content/uploads/2013/02/logo_zhp1.png"
            alt=""></div>
        <h1 id="text02">Zaloguj się</h1>
        <form id="form02" method="post">
          <div class="inner">

            <!-- Email field -->
            <div class="field">
              <input type="email" name="email" id="form02-email" v-model="email" placeholder="Email" maxlength="128"
                required="">
            </div>

            <!-- Password field -->
            <div class="field">
              <input type="password" name="password" id="form02-password" v-model="password" placeholder="Hasło"
                maxlength="128" required="">
            </div>

            <div class="actions"><button @click.prevent="signIn">Loguj</button></div>
          </div><input type="hidden" name="id" value="form02">
        </form>
        <small>Nie masz jeszcze konta na grę? <router-link to="/about"><a>Zarejestruj się!</a></router-link> </small>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'login',
    components: {},
    data() {
      return {
        email: '',
        password: '',
        errorInForm: false,
        errorMessage: '',
        // TODO: zastanowić się czy chcemy by user logujący się na grę mial z automatu ustawiony persistent login
        persistentLogin: true
      }
    },
    methods: {
      signIn() {
        if (this.email == '' || this.password == '') {
          this.errorInForm = true;
          this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
        } else if (this.password.length < 6) {
          this.errorInForm = true;
          this.errorMessage = 'Twoje hasło ma przynajmniej 6 znaków';
        } else {
          this.$store.dispatch('signIn', {
              email: this.email,
              password: this.password,
              persistentLogin: this.persistentLogin,
            })
            .then((result) => {
              console.log("result of promise", result);
              if (result === true) {
                this.clearFormData();
                this.$router.push('/dashboard');
              } else {
                this.errorInForm = true;
                this.errorMessage = 'Coś poszło nie tak ... Odśwież stronę i spróbuj ponownie'
              }
            })
        }
      },
      clearFormData() {
        this.email = '';
        this.password = '';
        this.errorInForm = false;
        this.errorMessage = '';
        this.persistentLogin = true
      }
    },
    computed: {
      isLoading() {
        return this.$store.state.loadingState;
      }
    },
    mounted() {

    },
  }
</script>

<style lang="scss">
  @import '@/assets/sass/formStyle.scss';

  #nav {
    z-index: 3;
  }

  #main {
    margin-top: 50px;
  }

  .image {
    transform: scale(0.89);
  }


  small a {
    cursor: pointer;
  }
</style>