<template>
  <div>
    <DateBubble v-show="source.isNewDate" :date="source.createdAt" />
    <div
      :class="`row ${source.isContMsg ? '' : 'space'} ${
        source.user.uuid === source.uid ? 'right' : ''
      }`"
    >
      <div
        :class="`${source.user.uuid === source.uid ? 'bubble-me' : 'bubble'} ${
          !source.isNewDate && source.isContMsg ? '' : 'first'
        }`"
      >
        <div
          v-show="
            source.user.uuid !== source.uid &&
            (source.isNewDate || !source.isContMsg)
          "
          class="username"
          :style="{ color: source.color }"
        >
          {{ source.name }}
        </div>
        <span class="text">{{ source.text }}</span>
        <span class="time">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import DateBubble from './DateBubble';

export default {
  name: 'ChatMessage',
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      time: null,
    };
  },
  components: { DateBubble },
  mounted() {
    if (this.source?.createdAt) {
      this.time = moment(this.source.createdAt).format('H:mm');

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

      this.source.color =
        colors[this.source.uid.slice(-1).charCodeAt(0) % colors.length];
    }
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
