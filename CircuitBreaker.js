class CircuitBreaker {
    constructor(options = {}) {
        this.failures = {};
        this.threshold = options.threshold || 3;
        this.timeout = options.timeout || 60000; // 1 minute
    }

    isOpen(provider) {
        const failureData = this.failures[provider.name] || { count: 0, lastFailure: 0 };
        if (failureData.count >= this.threshold) {
            const timeSinceLastFailure = Date.now() - failureData.lastFailure;
            if (timeSinceLastFailure < this.timeout) {
                return true;
            }
            this.reset(provider);
        }
        return false;
    }

    recordFailure(provider) {
        const failureData = this.failures[provider.name] || { count: 0, lastFailure: 0 };
        failureData.count += 1;
        failureData.lastFailure = Date.now();
        this.failures[provider.name] = failureData;
    }

    reset(provider) {
        delete this.failures[provider.name];
    }
}

module.exports = CircuitBreaker;
