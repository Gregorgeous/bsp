<template>

    <main class="is-preload">

        <!-- Wrapper-->
        <div id="wrapper">

				<!-- Main -->
					<section id="main">
						<header>
							<span class="avatar"><img src="https://openclipart.org/image/2400px/svg_to_png/190113/1389952697.png" alt="" /></span>
							<span>Zastęp:</span>
							<h1>Zastep X</h1>
							<span>Ilość punktów na grze:</span>
							<h2> {{patrolScore}} pkt.</h2>
							<div class="actions"><button @click.prevent="logout">Wyloguj</button></div>
						</header>
					</section>
			</div>

    </main>
</template>


<script>
    export default {
		data(){
			return{
				patrolScore: 30
			}
		},
		methods:{
			logout(){
				this.$store.dispatch('logout');
				this.$router.replace('/');
			}
		},
        mounted() {
          
        }
    }
</script>


<style lang="scss" scoped>
	@import '@/assets/sass/dashboard-section/main.scss';
	
	main{
		min-height: 100vh;
	}

	#wrapper {
		min-height: 100vh;
	}

	.avatar img {
		width: 39%;
	}

	header>span:not(:first-child) {
		font-style: italic;
	}
</style>