<template>
  <section class="main">
    <template v-if="this.count < 5">
      <div class="main__sidebar">
        <div class="main__sidebar-top">
          <router-link to="/"></router-link>
          <button v-if="this.count < 5" @click="reset"></button>
        </div>
        <div class="main__sidebar-middle">
          <span>Параметры:</span>
          <div class="main__sidebar-counters">
            <span>
              <span>:(</span><span>{{ this.product1 }}</span>
            </span>
            <span>
              <span>:) </span><span>{{ this.product2 }} </span>
            </span>
            <span>
              <span>&lt;3</span> <span> {{ this.product3 }}</span>
            </span>
          </div>
        </div>
        <div class="main__sidebar-bottom">
          <span>Осталось в очереди: </span>
          <span>
            <strong>{{ this.amount - this.count }}</strong> /{{ this.amount }}
          </span>
        </div>
      </div>
      <div class="main__content">
        <div class="main__cards-holder">
          <Tinder
            ref="tinder"
            key-name="id"
            v-model:queue="queue"
            :max="3"
            :offset-y="10"
            allow-down
            @submit="onSubmit"
          >
            <template #default="{ data }">
              <!-- <div
                class="pic"
                :style="{
                  'background-image': `url(https://cn.bing.com//th?id=OHR.${data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`,
                }"
              /> -->
              <Pacient />
            </template>
            <template #like>
              <img class="like-pointer" src="@/assets/img/stamp-3.png" />
            </template>
            <template #nope>
              <img
                class="nope-pointer"
                slot="nope"
                src="@/assets/img/stamp-1.png"
              />
            </template>
            <template #super>
              <img
                class="super-pointer"
                slot="super"
                src="@/assets/img/stamp-2.png"
              />
            </template>
            <template #down>
              <img
                class="down-pointer"
                slot="down"
                src="/images/down-txt.png"
              />
            </template>
            <template #rewind>
              <img
                class="rewind-pointer"
                slot="rewind"
                src="/images/rewind-txt.png"
              />
            </template>
          </Tinder>
        </div>
        <div class="main__actions-holder">
          <button
            class="btn btn--purple"
            @click="
              increment1();
              decide('nope');
            "
          >
            Препарат 1
          </button>
          <button
            class="btn btn--blue"
            @click="
              increment2();
              decide('super');
            "
          >
            Препарат 2
          </button>
          <button
            class="btn btn--yellow"
            @click="
              increment3();
              decide('like');
            "
          >
            Препарат 3
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="main__result">
        <span>Ваш результат:</span><br />
        <span>препарат 1: {{ toPercentage(product1) }} %</span>
        <span>препарат 2: {{ toPercentage(product2) }} %</span><br />
        <span>препарат 3: {{ toPercentage(product3) }} %</span><br />
        <span>"Что я здесь делаю?"</span>
        <p>
          Это тествовое задание, так что не будем углубляться в глубины проблем
          фармацевтов
        </p>
        <button @click="reset" class="btn btn--gray">
          Попробовать еще раз
        </button>
        <pacient>123</pacient>
      </div>
    </template>
  </section>
</template>

<script>
import Tinder from "@/components/vue-tinder/Tinder.vue";
import source from "@/bing";
import Pacient from "../components/Pacient.vue";

export default {
  name: "Main",
  components: {
    Tinder,
    Pacient,
  },

  data() {
    return {
      product1: 0,
      product2: 0,
      product3: 0,
      count: 0,
      amount: 5,

      queue: [],
      offset: 0,
      history: [],
    };
  },
  created() {
    this.mock();
  },
  mounted() {
    console.log(this.product1, this.product2, this.product3);
  },

  methods: {
    increment1() {
      this.product1++;
      this.count++;
      console.log(this.product1);
    },

    increment2() {
      this.product2++;
      this.count++;
      console.log(this.product2);
    },

    increment3() {
      this.product3++;
      this.count++;
      console.log(this.product3);
    },

    toPercentage(product) {
      const percent = Math.round((product * 100) / this.amount);
      return percent;
    },

    reset() {
      this.product1 = 0;
      this.product2 = 0;
      this.product3 = 0;
      this.count = 0;
    },

    mock(count = 5, append = true) {
      const list = [];
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset] });
        this.offset++;
      }
      if (append) {
        this.queue = this.queue.concat(list);
      } else {
        this.queue.unshift(...list);
      }
    },
    onSubmit({ item }) {
      if (this.queue.length < 3) {
        this.mock();
      }
      this.history.push(item);
    },
    async decide(choice) {
      if (choice === "rewind") {
        if (this.history.length) {
          //一个个 rewind
          // this.$refs.tinder.rewind([this.history.pop()])
          // 一次性 rewind 全部
          // this.$refs.tinder.rewind(this.history)
          // this.history = []
          // 一次随机 rewind 多个
          this.$refs.tinder.rewind(
            this.history.splice(-Math.ceil(Math.random() * 3))
          );
          // 非 api调用的添加
          // this.queue.unshift(this.history.pop())
          // this.queue.push(this.history.pop())
          // 非头部添加
          // this.queue.splice(1, 0, this.history.pop())
          // 一次性 rewind 多个，并且含有非头部添加的 item
          // this.queue.unshift(this.history.pop())
          // this.queue.unshift(...this.history)
        }
      } else if (choice === "help") {
        //
      } else {
        this.$refs.tinder.decide(choice);
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  /* background-color: #20262e; */
  overflow: hidden;
}

#app .vue-tinder {
  box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
  border-radius: 40px;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 12.69%;
  margin: auto;
  width: 55.67%;
  height: 57.62%;
  /* overflow: hidden; */

  /* width: calc(100% - 20px); */
  /* height: calc(100% - 23px - 65px - 47px - 16px); */
  /* min-width: 300px; */
  /* max-width: 355px; */
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  width: 66%;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%) translateY(-40%) rotate(-15deg);
}

.nope-pointer {
  /* right: 10px; */
}

.like-pointer {
  transform: translateX(-50%) translateY(-40%) rotate(15deg);
}

.super-pointer,
.down-pointer {
  position: absolute;
  z-index: 1;
  width: 66%;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%) translateY(-40%) rotate(-15deg);
}

.super-pointer {
  /* bottom: 40px; */
}

.down-pointer {
  top: 40px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.btns img:nth-child(2n + 1) {
  width: 53px;
}

.btns img:nth-child(2n) {
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}

/* .vue-tinder.right-end,
.vue-tinder.left-end {
  transform: translateZ(20px);
}
.vue-tinder.right-end .tinder-card:nth-child(1) {
  animation: rightEnd 0.2s ease-in-out;
}
.vue-tinder.left-end .tinder-card:nth-child(1) {
  animation: leftEnd 0.2s ease-in-out;
}
@keyframes leftEnd {
  50% {
    transform: rotateY(8deg);
  }
}
@keyframes rightEnd {
  50% {
    transform: rotateY(-8deg);
  }
} */
</style>
