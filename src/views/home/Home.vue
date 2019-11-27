<template>
  <div class="home">
    <section class="player-name-box player-one">
      <label>
        Player 1
        <input type="text" min="1" max="35" v-model="playerOneName" />
      </label>
    </section>
    <section class="player-name-box player-two">
      <label>
        Player 2
        <input type="text" min="1" max="35" v-model="playerTwoName" @keyup.enter="startGame" />
      </label>
    </section>
    <footer>
      <button class="play-button" @click="startGame" :disabled="!validForm">
        <span>play</span>
        <img
          class="play-arrow"
          src="./../../assets/arrow-yellow.svg"
          alt="play"
        />
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => {
    return {
      playerOneName: "",
      playerTwoName: ""
    };
  },
  methods: {
    startGame() {
      if (this.validForm) {
        this.$router.push({
          name: "play",
          params: {
            p1: this.playerOneName,
            p2: this.playerTwoName
          }
        });
      }
    }
  },
  computed: {
    validForm() {
      return (this.playerOneName.length > 0 && this.playerTwoName.length > 0)
    }
  }
};
</script>
<style lang="scss">
@import "./../../assets/styles/global.scss";

$line-size: 3px;

header,
footer {
  margin: 0;
  padding: 0;
}

.home {
  height: 100%;
  background: $secondary-color url("./../../assets/foosvar_bg_home.svg");
  background-size: cover;
  background-position: center center;
  display: grid;
  grid-template-columns: 1fr 190px 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  .player-one {
    grid-row: 2;
    grid-column: 1;
    align-self: flex-start;

    label {
      color: $secondary-color;

      input {
        border-bottom-color: $secondary-color;
        color: $secondary-color;
      }
    }
  }

  .player-two {
    grid-row: 2;
    grid-column: 3;
    align-self: flex-end;
  }

  .player-name-box {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;

    label {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: 1.2em;
    }

    input {
      border: none;
      background: none;
      padding: 8px 0;
      border-bottom: $line-size solid $primary-color;
      color: $primary-color;
      font-family: $font-family;
      font-size: 1.2em;
      outline: none;
    }
  }

  footer {
    grid-row: 3;
    grid-column: 2;

    .play-button {
      $border-size: $line-size;

      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      background: transparent;
      font-size: 1.7em;
      cursor: pointer;
      font-family: $font-family;
      color: $secondary-color;
      border: $border-size solid $secondary-color;
      padding: 16px;
      width: 100%;

      &[disabled] {
        cursor: not-allowed;
        
      }

      span {
        display: block;
        transition: margin ease 0.05s;
      }

      .play-arrow {
        align-self: center;
        top: calc(50% - #{$border-size * 2});
        right: 32px + $border-size;
        width: 64px;
        position: absolute;
        transition: right ease 0.15s;
      }

      &::before {
        content: "";
        pointer-events: none;
        top: 0;
        left: 0;
        height: calc(100% - #{$border-size * 2});
        width: calc(100% - #{$border-size * 2});
        position: absolute;
        border: $border-size solid $primary-color;
      }

      &:not([disabled]) {
        outline: none;

        span {
          margin-left: 4px;
        }

        .play-arrow {
          right: 10px + $border-size;
        }
      }
    }
  }
}
</style>
