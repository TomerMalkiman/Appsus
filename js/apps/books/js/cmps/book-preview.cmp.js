import { eventBus } from "../services/eventBus-service.js";

export default {
  props: ["book"],
  template: `
        <section>
          <img :src="book.thumbnail" />
          <h3>{{book.title}}</h3>
          <h5>By {{book.authors[0]}}</h5>
          <h6>{{book.subtitle}}</h6>
          <p :class="priceColor">{{bookPrice}} <img v-if="book.listPrice.isOnSale" class="sale-icon" src="../../img/sale.png" /></p>
          <div class="actions">
            <router-link :to="'/book/'+book.id">Details</router-link>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </section>
    `,
    components:{
    },
  methods: {
    selectBook(id) {
      this.$emit("selected", id);
    },
    deleteBook(id) {
      this.$emit("bookDelete", id);
      eventBus.emit('show-msg', 'Book deleted')
    },
  },
  computed: {
    bookPrice() {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.book.listPrice.currencyCode,
      });
      return formatter.format(this.book.listPrice.amount);
    },
    priceColor() {
      if (this.book.listPrice.amount >= 150) return "high-price";
      if (this.book.listPrice.amount <= 20) return "low-price";
    },
  },
};
