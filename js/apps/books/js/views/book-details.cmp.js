import { booksService } from "../services/books-service.js";
import bookDescCmp from "../cmps/book-desc.cmp.js";
import addReview from "../cmps/add-review.cmp.js";
import bookReviews from "../cmps/book-reviews.cmp.js";

export default {
  template: `
      <section class="book-details-container main-app">
        <nav class="actions">
          <router-link to="/book">Back</router-link>
          <a @click="isAddReview = !isAddReview">Add Review</a>
          <router-link :to="'/book/'+nextPrev.prevBookId">Prev Book</router-link>
        <router-link :to="'/book/'+nextPrev.nextBookId">Next Book</router-link>
        </nav>
        <section v-if="book && nextPrev" class="book-details">
            <img :src="book.thumbnail" />
            <h1>{{book.title}}</h1>
            <h4>{{book.subtitle}}</h4>
            <h5 :class="priceColor">{{bookPrice}} <img v-if="book.listPrice.isOnSale" class="sale-icon" src="../../img/sale.png" /></h5>
            <p>{{book.publishedDate}} {{bookAge}}</p>
            <book-desc-cmp :txt="book.description" />
            <p>Page Count: {{book.pageCount}}, {{pageCountDesc}}</p>
          </section>
        <section class="reviews">
          <add-review @sent="reviewSent" v-if="isAddReview"/>
          <book-reviews />
        </section>
      </section>
    `,
  components: {
    bookDescCmp,
    addReview,
    bookReviews,
  },
  created() {
  },
  data() {
    return {
      book: null,
      isAddReview: false,
      nextPrev: {prevBookId: null, nextBookId: null},
    };
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
    reviewSent(book){
      this.isAddReview = false;
      this.book = book
      location.reload();
    },
    loadBook(){
      booksService.getBookById(this.bookId).then((book) => (this.book = book))
      .then(
        booksService.getNextPrevBook(this.bookId).then(nextPrev => {
          this.nextPrev = nextPrev
        }));
    }
  },
  computed: {
    bookPrice() {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.book.listPrice.currencyCode,
      });
      return formatter.format(this.book.listPrice.amount);
    },
    pageCountDesc() {
      if (this.book.pageCount > 500) return "Long Reading";
      else if (this.book.pageCount >= 200) return "Decent Reading";
      else if (this.book.pageCount < 200) return "Light Reading";
    },
    bookAge() {
      const diff = new Date().getFullYear() - this.book.publishedDate;
      if (diff > 10) return "- Veteran";
      if (diff < 1) return "- New!";
    },
    priceColor() {
      if (this.book.listPrice.amount >= 150) return "high-price";
      if (this.book.listPrice.amount <= 20) return "low-price";
    },
    bookId() {
      return this.$route.params.bookId;
    }
  },
  watch: {
    bookId : {
      handler(){
          this.loadBook()
      },
      immediate : true,
  }
  },
};
