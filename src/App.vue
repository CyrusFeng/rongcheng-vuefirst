<template>
  <div id="app">
    <!--<transition :name="transitionName" @after-leave="afterLeave">-->
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: ""
      };
    },
    watch: {
      $route(to, from) {
        console.log(to)
        console.log(from)
        if (!from.name) {
          this.transitionName = "";
          return;
        }
        if (to.meta.index !== undefined && from.meta.index !== undefined) {
          this.transitionName =
            to.meta.index > from.meta.index ? "page-left" : "page-right";
        }
      }
    },
    methods: {
      afterLeave() {
        this.transitionName = "page-left";
      }
    }
  }
</script>

<style>

  .router-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  /* 首页内容切换过渡、底部路由导航切换过渡 */
  .page-left-enter,
  .page-right-leave-to {
    transform: translateX(100%);
  }

  .page-left-enter-active,
  .page-left-leave-active,
  .page-right-enter-active,
  .page-right-leave-active {
    transition: all 0.5s;
  }

  .page-left-enter-to,
  .page-left-leave,
  .page-right-enter-to,
  .page-right-leave {
    transform: translateX(0);
  }

  .page-left-leave-to,
  .page-right-enter {
    transform: translateX(-100%);
  }
</style>
