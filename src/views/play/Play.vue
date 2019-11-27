<template>
  <div class="play">
    <div class="timer--container">
      <div class="timer">
        <span class="minutes">{{ minutes }}</span>
        <span class="middle">:</span>
        <span class="seconds">{{ seconds }}</span>
      </div>
    </div>
    <div class="player player--one">
      <div class="score">
        <h3 class="score--value">{{ p1.score }}</h3>
      </div>
      <div class="name">
        <h2 class="name--value">{{ p1.name }}</h2>
        <hr class="name--line" />
      </div>
    </div>
    <div class="player player--two">
      <div class="score">
        <h3 class="score--value">{{ p2.score }}</h3>
      </div>
      <div class="name">
        <h2 class="name--value">{{ p2.name }}</h2>
        <hr class="name--line" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

let db = firebase.firestore();

export default {
  name: "play",
  data: () => {
    return {
      p1: {
        name: "",
        score: 0
      },
      p2: {
        name: "",
        score: 0
      },
      startTime: null,
      timeElapsed: 0,
      timer: null,
      firebaseDocRefId: ""
    };
  },
  methods: {
    listenForGameChange() {
      db.collection("games").doc(this.firebaseDocRefId)
        .onSnapshot(doc => {
          this.p1.score = doc.data().player_1.score;
          this.p2.score = doc.data().player_2.score;
          this.startTime = doc.data().start_time;
        });
    },

    startTimer() {
      this.timer = setInterval(() => this.clock(), 1000);
    },

    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },

    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },

    clock() {
      this.timeElapsed++;
    },

    startGame() {
      this.startTime = new Date();

      // add new game to DB
      db.collection("games").add({
        player_1: {
          name: this.p1.name,
          score: this.p1.score
        },
        player_2: {
          name: this.p2.name,
          score: this.p2.score
        },
        start_time: this.startTime
      })
      .then(docRef => {
        this.firebaseDocRefId = docRef.id;
        this.listenForGameChange();
        this.startTimer();
      })
      .catch(() => {
          this.$router.replace("/");
      });

    }
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.timeElapsed / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.timeElapsed - (this.minutes * 60);
      return this.padTime(seconds);
    }
  },
  mounted() {
    const p1Name = this.$route.params.p1;
    const p2Name = this.$route.params.p2;

    if (p1Name && p2Name) {
      this.p1.name = p1Name;
      this.p2.name = p2Name;

      this.startGame();
      return;
    }
    // console.log("No player names given in route params!");
    this.$router.go("-1");
  }
};
</script>
<style lang="scss">
@import "./../../assets/styles/global.scss";

.play {
  height: 100%;
  background: $secondary-color url("./../../assets/foosvar_bg.svg");
  background-size: cover;
  background-position: center center;
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  grid-template-rows: 33vh 1fr;

  .timer--container {
    color: $secondary-color;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    top: 32px;
    font-size: 3.2em;

    .timer {
      background: url('./../../assets/timer_bg.svg');
      background-repeat: no-repeat;
      background-position: center center;
      width: 232px;
      height: 92px;
      margin-right: -32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .player {
    display: flex;
    align-items: center;
    flex-direction: column;

    .score {
      $score-size: 295px;

      background: url("./../../assets/score_bg.svg");
      background-repeat: no-repeat;
      background-position: center center;
      overflow: hidden;
      width: $score-size;
      height: $score-size;

      .score--value {
        margin: 0;
        line-height: $score-size;
        font-size: 15em;
      }
    }

    .name {
      padding-top: 56px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .name--value {
        margin: 0;
        font-size: 3.6em;
        margin-bottom: 8px;
        max-width: 300px;
        text-transform: capitalize;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .name--line {
        border: 2px solid $primary-color;
        margin: 0;
        width: 72px;
        align-self: flex-end;
      }
    }

    &.player--one {
      grid-row: 2;
      grid-column: 1;
      color: $secondary-color;

      .name {
        .name--value {
          text-align: left;
        }

        .name--line {
          border-color: $secondary-color;
          align-self: flex-start;
        }
      }
    }
    &.player--two {
      grid-row: 2;
      grid-column: 3;
    }
  }
}
</style>
