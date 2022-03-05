export default {
  props: ["txt"],
  template: `
        <header>
            <h1>{{txt}}</h1>
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/book">Books</router-link>
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
};
