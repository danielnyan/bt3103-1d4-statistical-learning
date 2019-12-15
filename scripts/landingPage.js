let fuee = new Vue({
  el: "#app",
  data: {
    newUserHeader: "Your save code is as follows",
    savecode: "Generating...",
  },
  methods: {
    newuser() {
      $("#login").animate({
        left: "0%"
      }, 500, "swing", () => {
        this.savecode = "Not applicable for offline version"
        sessionStorage.setItem("progress", JSON.stringify([]));
        window.location.href = "contents.html"
      });
    },
    existinguser() {
      $("#login").animate({
        left: "-200%"
      }, 500, "swing");
    },
    returntomain () {
      $("#login").animate({
        left: "-100%"
      }, 500, "swing");
    }
  }
});