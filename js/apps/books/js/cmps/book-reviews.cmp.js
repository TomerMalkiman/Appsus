import { booksService } from "../services/books-service.js";
import reviewPreview from "./review-preview.cmp.js";

export default {
  template: `
        <section v-if="book" class="book-reviews">
                <review-preview v-for="review in book.reviews" :key="review.id" :review="review"  />
        </section>
    `,
  components: {
    reviewPreview,
  },
  created() {},
  data() {
    return {
      book: null,
    };
  },
  methods: {
    deleteReview(reviewId) {
      booksService.deleteReview(reviewId);
    },
    loadReviews(){
      booksService.getBookById(this.bookId).then((book) => {
        this.book = book;
      });
    }
  },
  computed: {
    bookId(){
      return this.$route.params.bookId;
    },
  },
  watch: {
    bookId : {
      handler(){
          this.loadReviews()
      },
      immediate : true,
  },
  unmounted() {},
}}
