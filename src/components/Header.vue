<template>
  <header>
    <img
      class="profilePic"
      src="https://randomuser.me/api/portraits/men/10.jpg"
    />
    <div class="user">
      <div class="name">Meeting Room 1001 - Group Chat 🎉</div>
      <div class="members">Online</div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {},
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  background: #075e55;
  color: #fff;
  padding: 0 10px;
}

.profilePic {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.user {
  padding: 10px;
}

.user div {
  margin: 6px 0;
}

.members {
  font-size: 14px;
}
</style>
