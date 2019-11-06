let fuee = new Vue({
  el: '#app',
  data: {
    q2a: {
      correct: "Correct!",
      incorrect: "Incorrect!",
      status: "none",
      solved: false
    },
  },
  methods: {
    submit2a: async function () {
      let entered = parseCode("answer2a");
      this.q2a.status = "checking";
      
      let errorMessage = null;
      let result = await submitToLambda("2a", JSON.stringify(entered))
        .catch((err) => {
          errorMessage = err || "Network request failed";
        });
      
      if (errorMessage !== null) {
        this.q2a.status = "incorrect";
        this.q2a.incorrect = "There appears to be a network error. Message: " + errorMessage;
      }
      
      let resultInfo = JSON.parse(result);
      console.log(resultInfo);
      if (resultInfo.correct) {
        this.q2a.status = "correct";
        this.q2a.solved = true;
      } else {
        this.q2a.status = "incorrect";
        this.q2a.incorrect = "Incorrect!";
      }
      if (resultInfo.gotten.error) {
        this.q2a.incorrect += " It appears that there is an error. The message is as follows: ";
        this.q2a.incorrect += resultInfo.gotten.output;
      } else if (!resultInfo.correct) {
        this.q2a.incorrect += " You are regressing " + resultInfo.gotten.output.response + " against these variables: "
        resultInfo.gotten.output.predictors;
      }
    },
    nextPage() {
      if (this.q2a.solved || $("#prompt").css("display") !== "none") {
        window.location.href = "multiple_regression2.html"
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
    initializeCodeblocks(["answer2a"]);
    retrieveProgress().then((result) => {
      if (result.includes("2a")) {
        this.q2a.solved = true;
      }
    });
  }
});
