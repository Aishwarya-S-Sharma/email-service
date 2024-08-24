class EmailProvider1 {
    constructor() {
        this.name = 'Provider1';
    }

    async sendEmail(emailData) {
        // Simulate email sending (could fail randomly)
        if (Math.random() < 0.3) throw new Error('Provider1 failed');
        console.log(`Email sent via ${this.name}`);
    }
}

module.exports = EmailProvider1;
