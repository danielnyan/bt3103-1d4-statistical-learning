let fuee = new Vue({
    el: '#app',
    data: {
        q5a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
        },
    },
    methods: {
        submit5a: async function() {
            let entered = parseCode("answer5a");
            this.q5a.status = "checking";

            let errorMessage = null;
            let result = await submitToLambda("5a", JSON.stringify(entered))
                .catch((err) => {
                    errorMessage = err || "Network request failed";
                });

            if (errorMessage !== null) {
                this.q5a.status = "incorrect";
                this.q5a.incorrect = "There appears to be a network error. Message: " + errorMessage;
            }

            let resultInfo = JSON.parse(result);
            console.log(resultInfo);
            if (resultInfo.correct) {
                this.q5a.status = "correct";
                this.q5a.solved = true;
            } else {
                this.q5a.status = "incorrect";
                this.q5a.incorrect = "Incorrect!";
            }
            if (resultInfo.gotten.error) {
                this.q5a.incorrect += " It appears that there is an error. The message is as follows: ";
                this.q5a.incorrect += resultInfo.gotten.output;
            } else if (!resultInfo.correct) {
                if (resultInfo.gotten.output.model) {
                    this.q5a.incorrect += " You are regressing " + resultInfo.gotten.output.response + " against these variables: "
                    resultInfo.gotten.output.predictors;
                } else {
                    this.q5a.incorrect += " Are you sure you are using the correct model?";
                }
            }
        },
        nextPage() {
            if ((this.q5a.solved) || $("#prompt").css("display") !== "none") {
                window.location.href = "contents.html"
            } else {
                $("#prompt").slideDown(500);
                setTimeout(this.hidePrompt, 5000)
            }
        },
        hidePrompt() {
            $("#prompt").slideUp(500);
        }
    },
    mounted() {
        initializeCodeblocks(["answer5a"]);
        retrieveProgress().then((result) => {
            if (result.includes("5a")) {
                this.q5a.solved = true;
            }
        });
    }
})