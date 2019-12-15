let fuee = new Vue({
    el: '#app',
    data: {
        q2a: {
            correct: "I'm not sure if your answer is correct or not, but heck it. FYI, the formula used is ols_result = smf.ols(formula='mpg ~ cylinders + displacement + horsepower + weight + acceleration + year + origin', data=df).fit()",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit2a: async function() {
            this.q2a.status = "correct";
            this.q2a.solved = true;
            setProgress("2a");
        },
        nextPage() {
            if (this.q2a.solved || $("#prompt").css("display") !== "none") {
                window.location.href = "multiple_regression2.html"
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
        initializeCodeblocks(["answer2a"]);
        retrieveProgress().then((result) => {
            if (result.includes("2a")) {
                this.q2a.solved = true;
            }
        });
    }
});