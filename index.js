const EmailService = require('./EmailService');
const EmailProvider1 = require('./EmailProvider1');
const EmailProvider2 = require('./EmailProvider2');
const RateLimiter = require('./RateLimiter');
const IdempotencyService = require('./IdempotencyService');
const CircuitBreaker = require('./CircuitBreaker');

const providers = [new EmailProvider1(), new EmailProvider2()];
const rateLimiter = new RateLimiter(5, 60000); // 5 emails per minute
const idempotencyService = new IdempotencyService();
const circuitBreaker = new CircuitBreaker();

const emailService = new EmailService(providers, { rateLimiter, idempotencyService, circuitBreaker });

(async () => {
    const emailId = 'unique-email-id-123';
    const emailData = { to: 'test@example.com', subject: 'Hello!', body: 'This is a test email.' };
    const result = await emailService.sendEmail(emailId, emailData);
    console.log(result);
})();
