<template>
  <div
    :class="`row ${msg.isContMsg ? '' : 'space'} ${
      user.uuid === msg.uid ? 'right' : ''
    }`"
  >
    <div
      :class="`${user.uuid === msg.uid ? 'bubble-me' : 'bubble'} ${
        !msg.isNewDate && msg.isContMsg ? '' : 'first'
      }`"
    >
      <div
        v-show="user.uuid !== msg.uid && (msg.isNewDate || !msg.isContMsg)"
        class="username"
        :style="{ color: msg.color }"
      >
        {{ msg.name }}
      </div>
      <span class="text">{{ msg.text }}</span>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ChatMessage',
  props: {
    msg: Object,
    user: Object,
  },
  data() {
    return {
      time: null,
    };
  },
  components: {},
  created() {
    if (this.msg?.createdAt) {
      this.time = moment(this.msg.createdAt).format('H:mm');
    }
    const colors = [
      '#0275d8',
      '#5cb85c',
      '#5bc0de',
      '#f0ad4e',
      '#d9534f',
      '#d86df1',
      '#012572',
      '#6e30a1',
    ];

    this.msg.color =
      colors[this.msg.uid.slice(-1).charCodeAt(0) % colors.length];
  },
};
</script>

<style scoped lang="scss">
.row {
  margin: 3px 0;
  &.space {
    margin-top: 10px;
  }
  &.right {
    text-align: right;
  }
}

.bubble {
  position: relative;
  display: inline-block;
  padding: 10px;
  border-radius: 8px;
  background: #ffffff;
  margin-right: 15%;
  white-space: pre-wrap;
}

.bubble.first::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 0;
  border-left: 16px solid transparent;
  border-top: 16px solid #fff;
}

.bubble-me {
  position: relative;
  display: inline-block;
  padding: 10px;
  border-radius: 8px;
  background: #ddf3c6;
  margin-left: 15%;
  margin-right: 0;
  text-align: left;
  white-space: pre-wrap;
}

.bubble-me.first::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 0;
  border-right: 16px solid transparent;
  border-top: 16px solid #ddf3c6;
}

.username {
  white-space: normal;
  color: red;
  font-weight: 600;
  margin-bottom: 4px;
}

.text {
  margin-right: 40px;
}

.time {
  position: absolute;
  bottom: 6px;
  right: 4px;
  margin-left: 5px;
  font-size: 12px;
  color: #888;
}
</style>
