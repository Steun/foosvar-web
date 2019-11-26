<template>
  <div class="play">
    <h1>play time</h1>
    <h3>{{playerOneName}} vs {{playerTwoName}}</h3>
  </div>
</template>

<script>

export default {
  name: "play",
  data: () => {
    return {
      playerOneName: '',
      playerTwoName: '',
    }
  },
  mounted() {
    const p1 = this.$route.params.p1;
    const p2 = this.$route.params.p2;

    if (p1 && p2) {
      this.playerOneName = p1;
      this.playerTwoName = p2;
      return;
    }
    console.log('No player names given in route params!');
    this.$router.go(-1);
  }
};
</script>
<style lang="scss">
@import './../../assets/styles/global.scss';

.play {

}
</style>