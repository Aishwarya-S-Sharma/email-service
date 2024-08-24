class RateLimiter {
    constructor(limit, interval) {
        this.limit = limit;
        this.interval = interval;
        this.requests = [];
    }

    async checkRateLimit() {
        const now = Date.now();
        this.requests = this.requests.filter((time) => now - time < this.interval);

        if (this.requests.length >= this.limit) {
            throw new Error('Rate limit exceeded');
        }

        this.requests.push(now);
    }
}

module.exports = RateLimiter;
