let fuee = new Vue({
    el: '#app',
    data: {
        q6a: {
            correct: "Close enough.",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
        q6b: {
            correct: "Meh.",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit6a: async function() {
            this.q6a.status = "correct";
            this.q6a.solved = true;
            this.q6a.wrong_attempts += 10;
            setProgress("6a");
        },
        submit6b: async function() {
            this.q6b.status = "correct";
            this.q6b.solved = true;
            this.q6b.wrong_attempts += 10;
            setProgress("6b");
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