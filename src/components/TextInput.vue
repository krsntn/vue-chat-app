<template>
  <form @submit="onSubmit" class="wrapped">
    <div class="text-area">
      <textarea
        id="textarea"
        :rows="rows"
        class="text-input"
        placeholder="Type a message"
        v-model="text"
      />
    </div>
    <button id="formButton" type="submit" class="btn">
      <i class="fas fa-paper-plane"></i>
    </button>
  </form>
</template>

<script>
import { createMsg } from '../firebase/firebaseInit';

export default {
  name: 'TextInput',
  props: {
    msgs: Array,
    user: Object,
  },
  data() {
    return {
      text: null,
      rows: 1,
    };
  },
  components: {},
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (this.text.length > 0) {
        const newMsg = {
          name: this.user.username,
          text: this.text,
          uid: this.user.uuid,
        };
        createMsg(newMsg);

        this.text = '';
      }
    },
  },
  mounted() {
    document.querySelector('#textarea').addEventListener('keypress', (e) => {
      if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        document.querySelector('#formButton').click();
      }
    });
  },
  updated() {
    const lines = this.text.split('\n').length;
    if (lines <= 1) {
      this.rows = 1;
    } else if (lines >= 3) {
      this.rows = 3;
    } else {
      this.rows = 2;
    }
  },
};
</script>

<style scoped>
.wrapped {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  gap: 10px;
  padding: 10px 6px;
}

.text-area {
  flex: 1;
  border-radius: 99999px;
  background: #fff;
  border: none;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  font-size: 1rem;
}

.text-input {
  resize: none;
  background: #fff;
  border: none;
  font-size: 1rem;
  width: 100%;
  outline: none;
  font-family: inherit;
}

.btn {
  width: 50px;
  display: inline-block;
  background: #00897b;
  color: #fff;
  border: none;
  height: 50px;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;
}

i {
  font-size: 18px;
}
</style>
