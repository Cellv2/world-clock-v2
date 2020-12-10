class TimeManager {
    private elapsedTime: number = 0;
    private interval: NodeJS.Timeout | undefined;

    private tick = () => {
        this.elapsedTime++;
    };

    private clearManagerInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.elapsedTime = 0;
        }
    };

    getElapsedTime = () => {
        return this.elapsedTime;
    };

    startNewInterval = () => {
        this.clearManagerInterval();

        const interval = setInterval(() => this.tick(), 1000);
        this.interval = interval;
    };
}

const timeManagerInstance = new TimeManager();

export default timeManagerInstance;
