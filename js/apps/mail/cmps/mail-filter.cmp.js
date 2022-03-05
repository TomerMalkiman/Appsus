export default {
    // props: [""],
    template: `
        <section class="mails-filter">
            <section class="mail-logo">
                <div class="logo-img-container">
                    <img src="img/mail-icons/mail-logo.png" width="40" height="40" alt="">
                    <!-- <img src="../../../../img/mail-icons/mail-logo.png" width="40" height="40" alt=""> -->

                </div>
                <h1><span>S</span>mail</h1>
            </section>
            <section class="text-filter">
                  <form class="search-container" action="">
                  <!-- <div class="filter-search">
                      <i class="fas fa-search" @click="setfilter"></i>
                  </div> -->
                      <input  class="main-input" @input="setFilter" type="text" 
                       v-model="filterBy.byName" placeholder="Search email" >
                  </form>
           </section>
           <section class="filter-options">
                <select class="filter-select" @change="setFilter" v-model="filterBy.read">
                    <option  value="all">All</option>
                    <option  value="read">Read</option>
                    <option  value="unRead">Unread</option>
            <!-- <option @click="setFilter" v-model="filterBy.starredMail" value="opel">Starred</option> -->
                </select>
           </section>
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