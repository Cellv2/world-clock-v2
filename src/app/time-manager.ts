class TimeManager {
    private elapsedTime: number = 0;
    private interval: NodeJS.Timeout | undefined;

    private tick = () => {
        this.elapsedTime++;
    };

    getElapsedTime = () => {
        return this.elapsedTime;
    };

    startNewInterval = () => {
        this.clearManagerInterval();

        const interval = setInterval(() => this.tick(), 1000);
        this.interval = interval;
    };

    clearManagerInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.elapsedTime = 0;
        }
    }
}

const timeManagerInstance = new TimeManager();

export default timeManagerInstance;
