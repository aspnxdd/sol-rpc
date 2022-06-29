<script setup lang="ts"></script>

<template>
  <footer class="container">
    <h2>Made by arnau.unwrap()</h2>

    <a class="twitter" href="https://twitter.com/ESArnau">
      <img src="/tw.png" width="24" />
      <p>@ESArnau</p>
    </a>
    <a class="twitter" href="https://twitter.com/ESArnau">
      <img src="/gh.png" width="24" />
      <p>aspnxdd</p>
    </a>
  </footer>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 10rem;
  padding: 4rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  margin-top: 1rem;
  background-color: rgb(73, 73, 83);
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
</style>
