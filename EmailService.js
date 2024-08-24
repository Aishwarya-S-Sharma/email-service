class EmailService {
    constructor(providers, options = {}) {
        this.providers = providers;
        this.options = {
            maxRetries: options.maxRetries || 3,
            backoffFactor: options.backoffFactor || 1000, // 1 second
            rateLimit: options.rateLimit || 5, // max 5 emails per minute
        };
        this.rateLimiter = options.rateLimiter;
        this.idempotencyService = options.idempotencyService;
        this.circuitBreaker = options.circuitBreaker;
        this.status = {};
    }

    async sendEmail(emailId, emailData) {
        if (this.idempotencyService.isDuplicate(emailId)) {
            return this.status[emailId] || { status: 'duplicate', message: 'Email already sent.' };
        }

        for (let attempt = 1; attempt <= this.options.maxRetries; attempt++) {
            for (let provider of this.providers) {
                try {
                    if (this.circuitBreaker.isOpen(provider)) {
                        console.log(`Circuit breaker open for ${provider.name}, skipping...`);
                        continue;
                    }

                    await this.rateLimiter.checkRateLimit();
                    await provider.sendEmail(emailData);
                    this.idempotencyService.markAsSent(emailId);
                    this.status[emailId] = { status: 'success', provider: provider.name, attempts: attempt };
                    return this.status[emailId];
                } catch (error) {
                    console.log(`Error with ${provider.name}: ${error.message}`);
                    this.circuitBreaker.recordFailure(provider);

                    if (attempt < this.options.maxRetries) {
                        const backoffTime = this.options.backoffFactor * 2 ** (attempt - 1);
                        console.log(`Retrying in ${backoffTime / 1000} seconds...`);
                        await new Promise((resolve) => setTimeout(resolve, backoffTime));
                    }
                }
            }
        }

        this.status[emailId] = { status: 'failed', message: 'All providers failed after retries.' };
        return this.status[emailId];
    }
}

module.exports = EmailService;
