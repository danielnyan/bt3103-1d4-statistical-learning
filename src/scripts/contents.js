let app = new Vue({
  el : "#app",
  data: {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false
  },
  mounted() {
    retrieveProgress().then((result) => {
      if (result.includes("1a") && result.includes("1b")) {
        this.q1 = true;
      }
      if (result.includes("2a") && result.includes("2b")) {
        this.q2 = true;
      }
      if (result.includes("3a")) {
        this.q3 = true;
      }
      if (result.includes("4a") && result.includes("4b")) {
        this.q4 = true;
      }
      if (result.includes("5a") && result.includes("5b")) {
        this.q5 = true;
      }
      if (result.includes("6a") && result.includes("6b")) {
        this.q6 = true;
      }
    });
  }
});