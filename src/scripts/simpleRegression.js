let fuee = new Vue({
  el: '#app',
  data: {
    q1a: {
      correct: "Correct!",
      incorrect: "Incorrect!",
      status: "none",
      solved: false
    },
    q1b: {
      correct: "Correct!",
      incorrect: "Incorrect!",
      status: "none",
      solved: false
    },
  },
  methods: {
    submit1a: async function () {
      let answer = $("#answer1a").val();
      submitToLambda("1a", JSON.stringify(answer));
      if (answer === "7.82") {
        this.q1a.status = "correct";
        this.q1a.solved = true;
      } else {
        this.q1a.status = "incorrect";
      }
    },
    submit1b: async function () {
      let entered = parseCode("answer1b");
      this.q1b.status = "checking";
      
      let errorMessage = null;
      let result = await submitToLambda("1b", JSON.stringify(entered))
        .catch((err) => {
          errorMessage = err || "Network request failed";
        });
        
      if (errorMessage !== null) {
        this.q1b.status = "incorrect";
        this.q1b.incorrect = "There appears to be a network error. Message: " + errorMessage;
      }
      
      let resultInfo = JSON.parse(result);
      if (resultInfo.correct) {
        this.q1b.status = "correct";
        this.q1b.solved = true;
      } else {
        this.q1b.status = "incorrect";
        this.q1b.incorrect = "Incorrect!";
      }
    },
    nextPage() {
      if ((this.q1a.solved && this.q1b.solved) || $("#prompt").css("display") !== "none") {
        window.location.href = "multiple_regression.html"
      } else {
        $("#prompt").slideDown(500);
        setTimeout(this.hidePrompt, 30000)
      }
    },
    hidePrompt() {
      $("#prompt").slideUp(500);
    }
  },
  mounted() {
    initializeCodeblocks(["answer1b"]);
  }
})