<template>
  <div class="about" id="wrapper">
    <div id="main">
      <div class="inner">
        <div id="image01" class="image"><img src="http://www.jaworzno.zhp.pl/wp-content/uploads/2013/02/logo_zhp1.png"
            alt=""></div>
        <h1 id="text02">Zarejestruj się do gry</h1>
        <p id="text01">Dodamy później session management by przenosil od razu do dashboard po kliknięciu "start" na
          home</p>
        <form id="form02" method="post">
          <div class="inner">
            
            <!-- Email field -->
            <div class="field">
              <input type="email" name="email" id="form02-email" v-model="email" placeholder="Email" maxlength="128" required="">
            </div>
            
            <!-- Patrol field -->
            <div class="field">
              <input type="text" name="patrolName" id="form02-patrol-name" v-model="patrolName"  placeholder="Nazwa zastępu" maxlength="128"
                required="">
            </div>
            
            <!-- Password field -->
            <div class="field">
              <input type="password" name="password" id="form02-password" v-model="password"  placeholder="Hasło" maxlength="128" required="">
            </div>
            
            <!-- Repeated-password field -->
            <div class="field">
              <input type="password" name="email" id="form02-repeatedPassword" v-model="repeatedPassword"  placeholder="Powtórz hasło" maxlength="128" required="">
            </div>
            
            <div class="actions"><button @click.prevent="register">Zarejestruj się</button></div>
          </div><input type="hidden" name="id" value="form02">
        </form>
        <small>Masz już konto na grze ? <router-link to="/login"><a>Zaloguj się!</a></router-link> </small>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'register',
    components: {},
    data() {
      return {
        email: '',
        patrolName: '',
        password: '',
        repeatedPassword: '',
        errorInForm: false,
        errorMessage: '',
        // TODO: zastanowić się czy chcemy by user logujący się na grę mial z automatu ustawiony persistent login
        persistentLogin: true
      }
    },
    methods: {
      register() {
        if (this.email == '' || this.password == '') {
          this.errorInForm = true;
          this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
        } else if (this.password.length < 6) {
          this.errorInForm = true;
          this.errorMessage = 'Twoje hasło musi mieć przynajmniej 6 znaków';
        } else if (this.password !== this.repeatedPassword) {
          this.errorInForm = true;
          this.errorMessage = 'Wpisane hasła nie są takie same. Wpisz hasło, a później powtórz je w następnym okienku';
        } else {
          this.$store.dispatch('register', {
              email: this.email,
              password: this.password,
              persistentLogin: this.persistentLogin,
              patrolName: this.patrolName
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
      clearFormData(){
        this.email = '';
        this.patrolName = '';
        this.password = '';
        this.repeatedPassword = '';
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

  // body{
  //   overflow: hidden;
  // }

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