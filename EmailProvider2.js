class EmailProvider2 {
    constructor() {
        this.name = 'Provider2';
    }

    async sendEmail(emailData) {
        // Simulate email sending (could fail randomly)
        if (Math.random() < 0.3) throw new Error('Provider2 failed');
        console.log(`Email sent via ${this.name}`);
    }
}

module.exports = EmailProvider2;
