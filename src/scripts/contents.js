let app = new Vue({
  el : "#app",
  data: {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  },
  mounted() {
    retrieveProgress().then((result) => {
      if (result.includes("1a") && result.includes("1b")) {
        this.q1 = true;
      }
      if (result.includes("2a") && result.includes("2b")) {
        this.q2 = true;
      }
    });
  }
});