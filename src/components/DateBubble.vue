<template>
  <div class="date-container">
    <div class="date-bubble">{{ displayDate }}</div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DateBubble',
  props: {
    date: Object,
  },
  data() {
    return {
      displayDate: null,
    };
  },
  components: {},
  created() {
    this.displayDate = moment(this.date).format('MMM D, YYYY');
  },
};
</script>

<style scoped>
.date-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 0;
}

.date-bubble {
  background: #d4eaf4;
  color: #888;
  padding: 10px;
}
</style>
