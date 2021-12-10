<template>
  <div v-show="show" class="floating-emoji-container">
    <div
      :key="item.key"
      v-for="item in emojis"
      :class="`emoji emoji${item.aniName}`"
      :style="{
        'font-size': `${item.size}px`,
        bottom: `${item.y}%`,
        left: `${item.x}%`,
      }"
    >
      {{ item.emoji }}
    </div>
  </div>
</template>

<script>
import { hasOnlyOneEmoji } from '../helper/detectEmoji';

export default {
  name: 'FloatingEmoji',
  props: {
    text: String,
  },
  data() {
    return {
      emojis: [],
      show: false,
    };
  },
  components: {},
  created() {
    if (this.text && hasOnlyOneEmoji(this.text)) {
      const count = 12;
      for (let index = 0; index < count; index++) {
        this.emojis.push({
          key: index,
          emoji: this.text,
          size: Math.floor(Math.random() * 100) + 60,
          x: Math.floor(Math.random() * 70) + 10,
          y: Math.floor(Math.random() * 70) + 10,
          aniName: Math.floor(Math.random() * 4) + 1,
        });
      }
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 8000);
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate', this.text);
  },
  updated() {
    console.log('updated', this.text);
  },
};
</script>

<style scoped>
.floating-emoji-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  animation-name: flyup;
  animation-duration: 8s;
  animation-fill-mode: forwards;
}

.emoji {
  position: absolute;
  display: inline-block;
  font-size: 120px;
  animation-fill-mode: forwards;
}

.emoji1 {
  animation: swing1 8s linear;
}

.emoji2 {
  animation: swing2 8s linear;
}

.emoji3 {
  animation: swing3 8s linear;
}

.emoji4 {
  animation: swing4 8s linear;
}

@keyframes flyup {
  0% {
    transform: translateY(100vh);
  }
  90% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(-100vh);
  }
}

@keyframes swing1 {
  0% {
    transform: translateX(10vw);
  }
  25% {
    transform: translateX(-10vw);
  }
  50% {
    transform: translateX(10vw);
  }
  75% {
    transform: translateX(-10vw);
  }
  100% {
    transform: translateX(10vw);
  }
}

@keyframes swing2 {
  0% {
    transform: translateX(-20vw);
  }
  30% {
    transform: translateX(20vw);
  }
  60% {
    transform: translateX(-18vw);
  }
  90% {
    transform: translateX(24vw);
  }
  100% {
    transform: translateX(0vw);
  }
}
@keyframes swing3 {
  0% {
    transform: translateX(-20vw);
  }
  20% {
    transform: translateX(20vw);
  }
  40% {
    transform: translateX(-18vw);
  }
  60% {
    transform: translateX(24vw);
  }
  80% {
    transform: translateX(-23vw);
  }
  100% {
    transform: translateX(0vw);
  }
}

@keyframes swing4 {
  0% {
    transform: translateX(-20vw);
  }
  18% {
    transform: translateX(20vw);
  }
  36% {
    transform: translateX(-18vw);
  }
  54% {
    transform: translateX(24vw);
  }
  72% {
    transform: translateX(-20vw);
  }
  90% {
    transform: translateX(19vw);
  }
  100% {
    transform: translateX(0vw);
  }
}
</style>
