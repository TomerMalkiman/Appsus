export default {
  // props: [""],
  template: `
        <section class="books-filter">
            <input class="name-filter" @input="setFilter" type="text" placeholder="Search..." v-model="filterBy.name">
            <label class="price-range">
            From Price: {{filterBy.fromPrice}} <input @input="setFilter" type="range" v-model.number="filterBy.fromPrice" max=200>
            To Price: {{filterBy.toPrice}} <input @input="setFilter" type="range" v-model.number="filterBy.toPrice" max=200>
            </label>
        </section>
    `,
  data() {
    return {
      filterBy: {
        name: "",
        fromPrice: 0,
        toPrice: 200,
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("filtered", { ...this.filterBy });
    },
  },
};
