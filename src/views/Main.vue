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
              <span>:(</span><span>{{ this.$store.state.product1 }}</span>
            </span>
            <span>
              <span>:) </span><span>{{ this.$store.state.product2 }} </span>
            </span>
            <span>
              <span>&lt;3</span> <span> {{ this.$store.state.product3 }}</span>
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
            :offset-y="5"
            @submit="onSubmit"
            :countPrep1="this.$store.state.product1"
          >
            <template #default="{ data }">
              <div class="pacient">
                <div
                  class="pacient__img-holder"
                  :style="{ 'background-image': `url(${data.id.img})` }"
                ></div>
                <div class="pacient__info">
                  <strong>{{ data.id.name }}, {{ data.id.age }} рокiв</strong>
                  <p>{{ data.id.description }}</p>
                </div>
              </div>
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
          <button class="btn btn--purple" @click="decide('nope')">
            Препарат 1
          </button>
          <button class="btn btn--blue" @click="decide('super')">
            Препарат 2
          </button>
          <button class="btn btn--yellow" @click="decide('like')">
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
          Это тестовое задание, так что не будем углубляться в глубины проблем
          фармацевтов
        </p>
        <button @click="reset" class="btn btn--gray">
          Попробовать еще раз
        </button>
      </div>
    </template>
  </section>
</template>

<script>
import Tinder from "@/components/vue-tinder/Tinder.vue";
import source from "@/bing";

export default {
  name: "Main",
  components: {
    Tinder,
  },
  props: ["countPrep1"],
  data() {
    return {
      product1: this.$store.state.product1,
      product2: this.$store.state.product2,
      product3: this.$store.state.product3,
      count: 0,
      amount: 5,

      queue: [],
      offset: 0,
      history: [],

      countPrep1: this.$store.state.product1,
    };
  },
  created() {
    this.mock();
  },
  mounted() {
    console.log(this.product1, this.product2, this.product3);
    console.log(this.countPrep1, "countPrep1");
  },

  methods: {
    // increment1() {
    //   this.product1++;
    //   this.count++;
    //   this.countPrep1++;
    //   console.log(this.product1, this.countPrep1, this);
    // },
    // increment() {
    //   () => {
    //     this.countPrep1++;
    //     console.log(this.countPrep1);
    //   };
    // },
    // increment2() {
    //   this.product2++;
    //   this.count++;
    //   console.log(this.product2);
    // },

    // increment3() {
    //   this.product3++;
    //   this.count++;
    //   console.log(this.product3);
    // },

    toPercentage(product) {
      const percent = Math.round((product * 100) / this.amount);
      return percent;
    },

    reset() {
      this.$store.commit("resetProducts");
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
      try {
      } catch {}
      if (this.queue.length < 1) {
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

