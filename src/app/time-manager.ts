class TimeManager {
    private elapsedTime: number = 0;
    private interval: NodeJS.Timeout | undefined;

    private tick = () => {
        this.elapsedTime++;
        console.log("tick", this.elapsedTime)
    };

    getElapsedTime = () => {
        return this.elapsedTime;
    };

    startNewInterval = () => {
        // if (this.interval) {
        //     this.clearManagerInterval();
        // }
        console.log(timeManagerInstance)
        setInterval(this.tick, 1000);
        // const interval = setInterval(() => this.tick, 1000);
        // this.interval = interval
    };

    clearManagerInterval = () => {
        console.log("clearIntervals called");
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
}

const timeManagerInstance = new TimeManager();

export default timeManagerInstance;
