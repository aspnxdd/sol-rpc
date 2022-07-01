<script setup lang="ts">

function scrollToTop(){
  window.scrollTo(0, 0);
}

</script>

<template>
  <footer class="container">
    <h2>Made by arnau.unwrap()</h2>
    <a class="twitter" href="https://twitter.com/ESArnau">
      <img src="/tw.png" width="24" />
      <p>@ESArnau</p>
    </a>
    <a class="twitter" href="https://github.com/aspnxdd">
      <img src="/gh.png" width="24" />
      <p>aspnxdd</p>
    </a>
    <button @click="scrollToTop">🔼</button>
  </footer>
</template>

<style scoped>

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  margin-top: 1rem;
  background-color: rgb(21, 21, 21);
}
.twitter {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  width: fit-content;
}
.twitter:hover {
  color: rgb(155, 180, 226);
}
.twitter:hover img {
  color: rgb(155, 180, 226);
  filter: none;
}
img {
  filter: grayscale(100%) brightness(1000%) contrast(0%);
}
.container button {
  position: absolute;
  bottom: 0;
  right: 0;
  margin:5rem;
  background-color: transparent;
  border: 0;
  padding: 0rem;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container button:hover {
  filter: hue-rotate(40deg);

}
</style>
