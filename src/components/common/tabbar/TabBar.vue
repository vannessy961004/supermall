<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name:"TabBar"
  }
</script>

<style>
  #tab-bar {
    display: flex;
    background-color: #ffe6f4;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
		z-index: 10;

    box-shadow: 0 -1px 1px rgba(100,100,100,0.5);
  }
</style>
