export default {
  // props: [""],
  template: `
        <section class="mails-filter">
           <input @input="setFilter" type="text" v-model="filterBy.byName" placeholder="Search">
           <select name="" id="">
              <option @change="setFilter" v-model="filterBy.readMail" value="Read">All</option>
              <option @change="setFilter" v-model="filterBy.readMail" value="Read">Read</option>
              <option @change="setFilter" v-model="filterBy.unReadMail" value="Unread">Unread</option>
            <!-- <option @click="setFilter" v-model="filterBy.starredMail" value="opel">Starred</option> -->
           </select>
            
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
        filterBy: {
            byName: '',
            readMail : '',
            unReadMail: ''
        }
    }
  },
  methods: {
    setFilter() {
        this.$emit('filtered', {...this.filterBy});
    }


  },
  computed: {},
  unmounted() {},
}