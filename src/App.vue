<template>
  <div class="container">
    <Header title="Lorem Ipsum" />
    <ChatFrame :msgs="msgs" :user="user" />
    <TextInput :user="user" />
    <FloatingEmoji
      :key="msgs.length"
      :text="msgs.length > 0 ? msgs[msgs.length - 1].text : null"
    />
  </div>
</template>

<script>
import { subscribeMsg } from './firebase/firebaseInit';
import Header from './components/Header';
import ChatFrame from './components/ChatFrame';
import TextInput from './components/TextInput';
import FloatingEmoji from './components/FloatingEmoji';
import userData from './data/users.json';

export default {
  name: 'App',
  components: { Header, ChatFrame, TextInput, FloatingEmoji },
  data() {
    return {
      msgs: [],
      user: null,
    };
  },
  methods: {},
  mounted() {
    // fix mobile view - height
    const convertStyle = () => {
      const height = window.innerHeight;
      document.querySelector('.container').style.height = `${height}px`;
    };
    window.addEventListener('resize', convertStyle);
    window.addEventListener('DOMContentLoaded', convertStyle);
  },
  async created() {
    // *get random user - after n requests, not working in prod anymore
    // await fetch('https://randomuser.me/api')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const { username, uuid } = data.results[0].login;
    //     this.user = {
    //       username,
    //       uuid,
    //     };
    //   });

    const randomNumber = Math.floor(Math.random() * 15);
    const selectedUser = userData.results[randomNumber];

    this.user = {
      username: selectedUser.login.username,
      uuid: selectedUser.login.username,
    };

    subscribeMsg(this.msgs, this.user);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: left;
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  background: #f0e7de;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
