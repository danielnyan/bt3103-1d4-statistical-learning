let fuee = new Vue({
    el: '#app',
    data: {
        q1a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
        q1b: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit1a: async function() {
            let answer = $("#answer1a").val();
            submitToLambda("1a", JSON.stringify(answer));
            if (answer === "7.82") {
                this.q1a.status = "correct";
                this.q1a.solved = true;
            } else {
                this.q1a.status = "incorrect";
                this.q1a.wrong_attempts += 1;
            }
        },
        submit1b: async function() {
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
            console.log(resultInfo);
            if (resultInfo.correct) {
                this.q1b.status = "correct";
                this.q1b.solved = true;
            } else {
                this.q1b.wrong_attempts += 1;
                this.q1b.status = "incorrect";
                this.q1b.incorrect = "Incorrect!";
            }
            if (resultInfo.gotten.error) {
                this.q1b.incorrect += " It appears that there is an error. The message is as follows: ";
                this.q1b.incorrect += resultInfo.gotten.output;
            } else if (!resultInfo.correct) {
                this.q1b.incorrect += " You are regressing " + resultInfo.gotten.output.response + " against these variables: " +
                    resultInfo.gotten.output.predictors;
            }
        },
        nextPage() {
            if ((this.q1a.solved && this.q1b.solved) || $("#prompt").css("display") !== "none") {
                window.location.href = "multiple_regression.html"
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
        initializeCodeblocks(["answer1b"]);
        retrieveProgress().then((result) => {
            if (result.includes("1a")) {
                this.q1a.solved = true;
            }
            if (result.includes("1b")) {
                this.q1b.solved = true;
            }
        });
    }
})