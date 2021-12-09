<template>
  <div id="chatFrame" class="chat-frame">
    <div :key="msg.id" v-for="msg in msgs">
      <DateBubble v-show="msg.isNewDate" :date="msg.createdAt" />
      <ChatMessage :msg="msg" :user="user" />
    </div>
  </div>
</template>

<script>
import { scrollToBottom } from '../helper/scroll';
import ChatMessage from './ChatMessage';
import DateBubble from './DateBubble';

export default {
  name: 'ChatFrame',
  props: {
    msgs: Array,
    user: Object,
  },
  components: { ChatMessage, DateBubble },
  created() {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  },
};
</script>

<style scoped>
.chat-frame {
  flex: 1;
  overflow: auto;
  height: 100px;
  padding: 0 16px;
}
</style>
