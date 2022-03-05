import { booksService } from "../services/books-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
  template: `
        <section v-if="book">
            {{book.name}}
            <form class="add-review" @submit="submitReview">
              <input type="text" placeholder="Your Name" v-model="review.username">
                <label>Rate this book:
                <input type="range" max="5" v-model.number="review.stars">{{review.stars}}
                </label>
                <textarea placeholder="how did you like it?" v-model="review.reviewTxt"></textarea>
                <button>Send Review!</button>
            </form>
        </section>
    `,
  components: {},
  created() {
    const id = this.$route.params.bookId;
    booksService.getBookById(id).then((book) => (this.book = book));
  },
  data() {
    return {
      book: null,
      review: {
        username: "",
        reviewTxt: "",
        stars: 0,
      },
    };
  },
  methods: {
    submitReview(e) {
      e.preventDefault();
      if (!this.review.reviewTxt || !this.review.stars || !this.review.username) {
        eventBus.emit("show-msg", "Please Choose Rating");
        return;
      }
      booksService.saveBook(this.book.id, this.review).then((book) => {
        this.review = {
          username: "",
          reviewTxt: "",
          stars: 0,
        };
        eventBus.emit("show-msg", "Review Added Successfully");
        this.$emit("sent", book);
      });
    },
  },
  computed: {},
  unmounted() {},
};
