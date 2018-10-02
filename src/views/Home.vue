<template>
  <div class="home fade-in">
    <div id="header">
      <!-- Inner -->
      <div class="inner">
        <header>
          <h1><a href="index.html" id="logo">BŚP</a></h1>
          <hr />
          <p>Typowy landing page</p>
        </header>
        <footer>
          <a class="button circled scrolly" @click="start">Start</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'home',
    components: {},
    methods: {
      start() {
        let startBtn = document.querySelector('.button.circled.scrolly');
        startBtn.classList.add('rotate-anim');
        setTimeout(() => {
          this.$router.push('/about');
        }, 1100)
      }
    },
    mounted() {
      // Below we add a "loaded" class for a nice "fade-in" effect of the background image. NOTE: we need to wrap it in a setTimeout so that it takes it out of the parsing flow (allowing the stylesheets load first and thus use the transition property I wrote there). 
      setTimeout(() => {
        document.querySelector('.home').classList.add('loaded');
      }, 1);
    },
  }
</script>

<style lang="scss" >
  @import '@/assets/sass/main.scss';

  #header {
    transition: opacity .05s ease;
  }

  .home.fade-in:before {
    pointer-events: none;
    -webkit-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
    -webkit-transition-delay: 0.75s;
    transition-delay: 0.75s;
    background: #9fa7af;
    content: '';
    display: block;
    height: 100%;
    z-index: 1;
    left: 0;
    opacity: 1;
    position: fixed;
    top: 0;
    width: 100%;
  }

  .home.loaded.fade-in:before {
    opacity: 0;
  }

  body.is-preload #wrapper.fade-in:before {
    opacity: 1;
  }

  .button.circled.scrolly::before{
    content: '';
    border-radius: 100%;
    width: 4.5em;
    height: 4.5em;
    background: white;
    position: absolute;
    z-index: -1;
    top: 0;
    left:0;
    transform: scale(1.2,1.2);
  }

  .button.circled.scrolly:link{
    background-color: black;
  }

  .rotate-anim {
    animation: rotate 1s cubic-bezier(0.43, 0.02, 0.56, 0.99) .2s forwards;
  }

  .button.circled.scrolly.rotate-anim::before{
    animation: circle-shrink 1s ease-in-out forwards;
  }

  @keyframes circle-shrink {
    0%{
      transform: scale(1.2,1.2);
    }
    20%{
      transform: scale(1.3,1.3);
    }
    100%{
      transform: scale(0);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotateX(0deg);
    }

    100% {
      transform: rotateX(1080deg);
    }
  }
</style>