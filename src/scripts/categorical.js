let fuee = new Vue({
    el: '#app',
    data: {
        q6a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false
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
        nextPage() {
            if ((this.q6a.solved) || $("#prompt").css("display") !== "none") {
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
        retrieveProgress().then((result) => {
            if (result.includes("6a")) {
                this.q6a.solved = true;
            }
        });
    }
})