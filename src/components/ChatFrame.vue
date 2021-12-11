<template>
  <div id="chatFrame" class="chat-frame">
    <virtual-list
      style="padding: 0 16px; height: 100%; overflow-y: auto"
      :data-key="'id'"
      :data-sources="msgs"
      :data-component="chatMessage"
      :estimate-size="50"
      @resized="onItemRendered"
      ref="vsl"
    />
  </div>
</template>

<script>
import ChatMessage from './ChatMessage';

export default {
  name: 'ChatFrame',
  props: {
    msgs: Array,
    user: Object,
  },
  data() {
    return {
      chatMessage: ChatMessage,
      param: {
        isInitialLoaded: false,
        msgSize: 0,
      },
    };
  },
  methods: {
    onItemRendered() {
      if (!this.$refs.vsl) {
        return;
      }

      // initial load, scroll to bottom
      if (
        !this.param.isInitialLoaded &&
        this.$refs.vsl.getSizes() >= this.param.msgSize
      ) {
        this.param.isInitialLoaded = true;
        this.setVirtualListToBottom();
      }
    },

    setVirtualListToBottom() {
      if (this.$refs.vsl) {
        this.$refs.vsl.scrollToBottom();
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.setVirtualListToBottom();
    });
  },
};
</script>

<style scoped>
.chat-frame {
  flex: 1;
}
</style>
