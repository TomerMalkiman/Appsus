export default {
    // props: [""],
    template: `
        <section class="mails-filter">
           <input @input="setFilter" type="text" v-model="filterBy.byName" placeholder="Search">
           <select @change="setFilter" v-model="filterBy.read">
              <option  value="all">All</option>
              <option  value="read">Read</option>
              <option  value="unRead">Unread</option>
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
                read: null,
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', {...this.filterBy });
        }


    },
    computed: {},
    unmounted() {},
}