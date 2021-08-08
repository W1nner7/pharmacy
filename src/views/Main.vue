<template>
  <div class="">
    <router-link to="/">home</router-link><br />
    <template v-if="this.count < 5"
      ><span>Параметры:</span><br /><span>:(</span> {{ this.product1 }}

      <br />
      <span>:)</span> {{ this.product2 }}

      <br />
      <span>&lt; 3</span> {{ this.product3 }}

      <br />
      <span
        >Осталось в очереди: {{ this.amount - this.count }} /
        {{ this.amount }} </span
      ><br /><button @click="increment1">1</button
      ><button @click="increment2">2</button
      ><button @click="increment3">3</button>
      </template
    >
    <template v-else><span>Ваш результат:</span><br />
      <span>препарат 1: {{ toPercentage(product1) }} %</span>
      <span>препарат 2: {{ toPercentage(product2) }} %
        </span><br /><span>препарат 3: {{ toPercentage(product3) }} %</span
      ><br /><span>"Что я здесь делаю?"</span>
      <p>
        Это тествовое задание, так что не будем углубляться в глубины проблем
        фармацевтов
      </p>
      <button @click="reset">попробовать еще раз</button>
      </template>
  </div>
</template>
<script>
export default {
  name: "Main",
  components: {},

  data() {
    return {
      product1: 0,
      product2: 0,
      product3: 0,
      count: 0,
      amount: 5,
    };
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
  },
};
</script>
