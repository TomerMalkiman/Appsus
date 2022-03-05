import { booksService } from "../services/books-service.js"
import { eventBus } from "../services/eventBus-service.js"

export default {
  // props: [""],
  template: `
        <section class="search-book">
            <div class="search-area">
                <input type="text" list="results" placeholder="Search New Books" v-model="searchKey">    
                <button @click="searchBooks">Search</button>
            </div>
            <div class="results">
                <section v-for="res in results">
                    {{res.volumeInfo.title}}
                    <button @click="saveBook(res.id)">Save</button>
                </section>
            </div>
        </section>
    `,


  components: {},
  created() {},
  data() {
    return {
        searchKey: '',
        results: null,
    }
  },
  methods: {
    searchBooks(){
        booksService.getGoogleResults(this.searchKey)
         .then(res => {
             console.log(res.items)
             this.results = res.items
            })
    },
    saveBook(resId){
        const book = this.results.find(book => book.id === resId)
        const newBook = booksService.addGoogleBook(book)
        eventBus.emit('add-book', newBook)
    }
  },
  computed: {
  },
  unmounted() {},
}