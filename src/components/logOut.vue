<template>
    <div></div>
</template>
<script>
export default {
    name: "logOut",
    mounted() {
    let user = localStorage.getItem("usertoken");
    if (user) {
        localStorage.clear();
      this.$router.push("/login");
    }
  },
}
</script>
