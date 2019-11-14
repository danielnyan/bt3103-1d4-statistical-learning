let fuee = new Vue({
    el: '#app',
    data: {
        q6a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
        q6b: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit6a: async function() {
            let entered = parseCode("answer6a");
            this.q6a.status = "checking";

            let errorMessage = null;
            let result = await submitToLambda("6a", JSON.stringify(entered))
                .catch((err) => {
                    errorMessage = err || "Network request failed";
                });

            if (errorMessage !== null) {
                this.q6a.status = "incorrect";
                this.q6a.incorrect = "There appears to be a network error. Message: " + errorMessage;
            }

            let resultInfo = JSON.parse(result);
            console.log(resultInfo);
            if (resultInfo.correct) {
                this.q6a.status = "correct";
                this.q6a.solved = true;
            } else {
                this.q6a.status = "incorrect";
                this.q6a.incorrect = "Incorrect!";
                this.q6a.wrong_attempts += 1;
            }
            if (resultInfo.gotten.error) {
                this.q6a.incorrect += " It appears that there is an error. The message is as follows: ";
                this.q6a.incorrect += resultInfo.gotten.output;
            } else if (!resultInfo.correct) {
                if (resultInfo.gotten.output.cabin) {
                    this.q6a.incorrect += " Have you dropped the Cabin column?";
                } else if (resultInfo.gotten.output.cabin) {
                    this.q6a.incorrect += " Did you drop the nan column? If you dropped another cabin category, please go back and change your code to drop nan instead.";
                }
            }
        },
        submit6b: async function() {
            let entered = parseCode("answer6b");
            this.q6b.status = "checking";

            let errorMessage = null;
            let result = await submitToLambda("6b", JSON.stringify(entered))
                .catch((err) => {
                    errorMessage = err || "Network request failed";
                });

            if (errorMessage !== null) {
                this.q6b.status = "incorrect";
                this.q6b.incorrect = "There appears to be a network error. Message: " + errorMessage;
            }

            let resultInfo = JSON.parse(result);
            console.log(resultInfo);
            if (resultInfo.correct) {
                this.q6b.status = "correct";
                this.q6b.solved = true;
            } else {
                this.q6b.status = "incorrect";
                this.q6b.incorrect = "Incorrect!";
                this.q6b.wrong_attempts += 1;
            }
            if (resultInfo.gotten.error) {
                this.q6b.incorrect += " It appears that there is an error. The message is as follows: ";
                this.q6b.incorrect += resultInfo.gotten.output;
            } else if (!resultInfo.correct) {
                if (resultInfo.gotten.output.model) {
                    this.q6b.incorrect += " You are regressing " + resultInfo.gotten.output.response + " against these variables: " +
                        resultInfo.gotten.output.predictors;
                } else {
                    this.q6b.incorrect += " Are you sure you are using the correct model?";
                }
            }
        },
        nextPage() {
            if ((this.q6a.solved && this.q6b.solved) || $("#prompt").css("display") !== "none") {
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
        initializeCodeblocks(["answer6a"]);
        initializeCodeblocks(["answer6b"]);
        retrieveProgress().then((result) => {
            if (result.includes("6a")) {
                this.q6a.solved = true;
            }
            if (result.includes("6b")) {
                this.q6b.solved = true;
            }
        });
    }
})