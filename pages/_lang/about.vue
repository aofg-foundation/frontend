<template lang="pug">
  div
    b-builder()
    //- b-renderer(:data="testRenderPage")
</template>

<script>
export default {
  name: "page-about",

  data: () => ({
    testRenderPage: {
      title: "My title",
      sections: [
        {
          name: "social2",
          data: {
            classes: ["is-dark"],
            content: "This is my content yo!",
            images: ["/images/avatar-1.jpg"]
          }
        },
        {
          name: "social2",
          data: {
            classes: ["is-red"],
            content: "This is my content yo boi!",
            images: ["/images/avatar-1.jpg"]
          }
        }
      ]
    }
  }),

  asyncData() {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve({ name: "world" });
      }, 1000);
    });
  }
};
</script>

