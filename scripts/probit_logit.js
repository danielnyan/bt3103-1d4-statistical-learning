let fuee = new Vue({
    el: '#app',
    data: {
        q5a: {
            correct: "You can check your answer by opening up the hint provided. I'm lazy to port the test cases from Python over to GitHub Pages.",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit5a: async function() {
            this.q5a.status = "correct";
            this.q5a.solved = true;
            this.q5a.wrong_attempts += 10;
            setProgress("5a");
        },
        nextPage() {
            if ((this.q5a.solved) || $("#prompt").css("display") !== "none") {
                window.location.href = "categorical.html"
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